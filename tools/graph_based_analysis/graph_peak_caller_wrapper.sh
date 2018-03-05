source activate py36



echo "Running."

genome=$1
sample=$2
read_length=$3
fragment_length=$4
control=$5
out_fasta_file=$6
out_json_file=$7
out_linear_peaks_file=$8

echo "Running with sample $sample."

has_control="True"
if [ $control = "None" ]; then
    has_control="False"
    control=$sample
    echo "Will not use control (meaning sample will be used as control)"
else
    echo "Will use separate control track $control"
fi

# Get hardcoded genome size
if [ $genome = "drosophila_melanogaster" ]; then
    genome_size="98000000"
    chromosomes="chr3R,chr3L,chr2R,chr2L,chrX,chr4"
    chromosomes="chrX,chr4"
elif [ $genome = "arabidopsis_thaliana" ] ; then
    genome_size="135000000"
else
    >&2 echo "Error: Invalid genome."
    exit 1
fi

echo "Will use genome size $genome_size"

graph_dir="/data/galaxy/galaxy-graph-peak-caller/static/graph_peak_caller_data/$genome/"
unique_reads=$(pcregrep -o1 '"sequence": "([ACGTNacgtn]{20,})"' $control | sort | uniq | wc -l)

echo "Found $unique_reads unique control reads."
echo "Has control $has_control"

echo "Splitting reads"
/usit/abel/u1/ivargry/.conda/envs/py36/bin/python3.6 /usit/abel/u1/ivargry/graph_peak_caller/graph_peak_caller/command_line_interface.py split_vg_json_reads_into_chromosomes $chromosomes $sample $graph_dir > split_log.txt 2>& 1

if [ $sample != $control ]; then
    /usit/abel/u1/ivargry/.conda/envs/py36/bin/python3.6 /usit/abel/u1/ivargry/graph_peak_caller/graph_peak_caller/command_line_interface.py split_vg_json_reads_into_chromosomes $chromosomes $control $graph_dir > split_log_control.txt 2>& 1
fi


if [[ $(wc -l <$control) -ge 2 ]]; then
    echo "Control is not empty"
else
    echo "Error: Control track is empty."
    exit 1
fi

sample_base_name=$(echo $sample | cut -f 1 -d '.')
control_base_name=$(echo $control | cut -f 1 -d '.')

for chromosome in $(echo $chromosomes | tr "," "\n")
do
    /usit/abel/u1/ivargry/.conda/envs/py36/bin/python3.6 /usit/abel/u1/ivargry/graph_peak_caller/graph_peak_caller/command_line_interface.py callpeaks_whole_genome $chromosome $graph_dir/ $graph_dir/ \
            $graph_dir/linear_map_ "${sample_base_name}_" "${control_base_name}_" "" $has_control \
            $fragment_length $read_length True $unique_reads $genome_size  > log_before_pvalues_chr$chromosome.txt 2>&1 &
done

wait

for chromosome in $(echo $chromosomes | tr "," "\n")
do
	/usit/abel/u1/ivargry/.conda/envs/py36/bin/python3.6 /usit/abel/u1/ivargry/graph_peak_caller/graph_peak_caller/command_line_interface.py callpeaks_whole_genome_from_p_values \
                $chromosome $graph_dir/ "" $has_control $fragment_length $read_length > log_after_pvalues_chr$chromosome.txt 2>&1&
done

wait

/usit/abel/u1/ivargry/.conda/envs/py36/bin/python3.6 /usit/abel/u1/ivargry/graph_peak_caller/graph_peak_caller/command_line_interface.py concatenate_sequence_files $chromosomes $out_fasta_file  > log_concatenating.txt 2>&1
cat *_max_paths.intervalcollection >> $out_json_file

# Get linear peaks
> linear_peaks.bed
for chromosome in $(echo $chromosomes | tr "," "\n")
do
    /usit/abel/u1/ivargry/.conda/envs/py36/bin/python3.6 /usit/abel/u1/ivargry/graph_peak_caller/graph_peak_caller/command_line_interface.py peaks_to_linear $chromosome_max_paths.intervalcollection $graph_dir/$chromosome_linear_pathv2.interval $chromosome linear_peaks_$chromosome.bed
done

cat linear_peaks_*.bed >> $out_linear_peaks_file