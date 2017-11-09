define("reports_webapp/run_stats",["exports","../libs/d3"],function(t,e){"use strict";function r(t,e){return new Date(t.getFullYear(),t.getMonth(),t.getDate()-e,t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds())}function a(t,e){return new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours()-e,t.getMinutes(),t.getSeconds(),t.getMilliseconds())}function n(){var t=new Date;return new Date(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours(),0,0)}Object.defineProperty(t,"__esModule",{value:!0}),t.create_chart=function(t,i,s,l){var c,p=t,u=[],h=n();for(c=0;c<24;c++)u.push(a(h,c));var g=[];for(c=0;c<30;c++)g.push(r(h,c));var f={top:60,right:30,bottom:50,left:60},d=0;"hours"==s?d=12.5:"days"==s&&(d=10);var x=300+f.left+f.right,v=1.75;if(0!=o.max(p))m=150/o.max(p);else var m=1;var b=150+f.top+f.bottom;$(".charts").css("height",b*v);var y=o.select("#"+i).attr("width",x).attr("height",b).attr("preserveAspectRatio","xMidYMin").attr("viewBox","0 0 "+x+" "+b).on("click",function(){var t=o.select(this).attr("class");t=t.split(" "),o.selectAll("."+t[0]).filter("."+t[1]).style("cursor","zoom-in").transition().duration(750).attr("height",b).attr("width",x),o.select(this).style("cursor","default").transition().duration(750).attr("height",b*v).attr("width",x*v)}),_=y.selectAll("g").data(p).enter().append("g").attr("transform",function(t,e){var r=+f.left;return"translate("+(r+=+e*d)+","+f.top+")"}).on("mouseenter",function(t){for(var r=1,a=t;a>=10;)a/=10,r++;var n=4*r+10;o.select(e.event.path[1]).select(".tool_tip").select("text").attr("transform","translate( "+(f.left-5)+", "+(150-t*m+ +f.top+10)+" )").attr("visibility","visible").text(t),o.select(e.event.path[1]).select(".tool_tip").attr("width",n+"px").attr("height","15px").select("rect").attr("transform","translate( "+(+f.left-n)+", "+(150-t*m+ +f.top)+" )").attr("width",n+"px").attr("height","15px").attr("fill","#ebd9b2")}).on("mouseleave",function(t){o.select(e.event.path[1]).select(".tool_tip").select("text").attr("visibility","hidden"),o.select(e.event.path[1]).select(".tool_tip").select("rect").attr("width","0").attr("height","0").attr("fill","").text(t)});y.append("g").append("text").attr("class","title").attr("text-anchor","end").attr("transform",function(t){return"translate( 300,15 )"}).text(l),y.append("g").attr("class","axis").append("path").attr("class","x").attr("d",function(t){var e=f.left,r=+f.top+150;return"M"+e+" "+r+" L "+(e+300)+" "+r});var w=o.scale.linear().range([150,0]),M=o.svg.axis().scale(w).orient("left").tickFormat(function(t){return o.round(t*o.max(p),0)});if(y.append("g").attr("class","y axis").attr("id","y_"+i).attr("text-anchor","end").attr("transform","translate( "+f.left+","+f.top+")").call(M).select(".domain"),y.append("g").append("text").attr("class","ax_title").attr("transform",function(t){var e=o.select("#y_"+i).node();return"translate("+(+f.left-e.getBoundingClientRect().width-5)+","+(+f.top+e.getBoundingClientRect().height/2-30)+")rotate(-90)"}).text("Number of Jobs"),_.append("rect").attr("y",function(t){return 150-t*m}).attr("height",function(t){return t*m}).attr("width",d-1),"hours"==s){_.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",3).attr("stroke","black").attr("stroke-width",1).attr("pointer-events","none").attr("transform",function(t,e){return"translate( "+d/2+", 150)"}),_.append("text").attr("fill","rgb(0,0,0)").attr("transform","translate( 10, 160 )").text(function(t,e){return u[e].getHours()<10?"0"+String(u[e].getHours()):u[e].getHours()});var k="",D=!1;_.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",function(t,e){var r=0;return u[e].getDate()!=k&&(D?r=20:(r=27,D=!0),k=u[e].getDate()),r}).attr("stroke","black").attr("stroke-width",1).attr("pointer-events","none").attr("transform",function(t,e){return"translate( 0, 150)"}),k="";var B="";D=!1,_.append("text").attr("fill","rgb(0,0,0)").attr("pointer-events","none").text(function(t,e){var r="";return u[e].getDate()!=B&&(r=String(u[e].toLocaleString("en-us",{month:"long"})),r+=" "+String(u[e].getDate()),B=u[e].getDate()),r}).attr("transform",function(t,e){var r=150,a=o.select(this).node().getBBox().width;return u[e].getDate()!=k&&(D?r+=18:(r+=26,D=!0),k=u[e].getDate()),"translate( "+(a+2)+", "+r+" )"})}else if("days"==s){_.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",3).attr("stroke","black").attr("stroke-width",1).attr("pointer-events","none").attr("transform",function(t,e){return"translate( "+d/2+", 150)"}),_.append("text").attr("fill","rgb(0,0,0)").attr("transform","translate( 9, 160 )").text(function(t,e){return g[e].getDate()<10?"0"+String(g[e].getDate()):g[e].getDate()});var C="",D=!1;_.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",function(t,e){var r=0;return g[e].getMonth()!=C&&(D?r=20:(r=27,D=!0),C=g[e].getMonth()),r}).attr("stroke","black").attr("stroke-width",1).attr("pointer-events","none").attr("transform",function(t,e){return"translate( 0, 150)"}),C="";var S="";D=!1,_.append("text").attr("fill","rgb(0,100,0)").attr("pointer-events","none").text(function(t,e){var r="";return g[e].getMonth()!=S&&(r=String(g[e].toLocaleString("en-us",{month:"long"})),r+=" "+String(g[e].getFullYear()),S=g[e].getMonth()),r}).attr("transform",function(t,e){var r=150,a=o.select(this).node().getBBox().width;return g[e].getMonth()!=C&&(D?r+=18:(r+=26,D=!0),C=g[e].getMonth()),"translate( "+(a+2)+", "+r+" )"})}y.append("g").attr("class","tool_tip").append("rect"),y.select(".tool_tip").append("text"),"jc_dy_chart"!=i&&"jc_hr_chart"!=i||o.select("#"+i).attr("height",b*v).attr("width",x*v).style("cursor","default")},t.create_histogram=function(t,r,a){for(var n=t,i=1.75,s={top:60,right:30,bottom:50,left:60},l=150+s.top+s.bottom,c=300+s.left+s.right,p=o.scale.linear().domain([0,o.max(n)]).range([0,300]),n=o.layout.histogram().bins(p.ticks(20))(n),u=[],h=0;h<n.length;h++)u.push(n[h].length);if(0!=o.max(n))g=150/o.max(u);else var g=1;var f=o.scale.linear().domain([0,o.max(n,function(t){return t.y})]).range([150,0]),d=o.select("#"+r).attr("viewBox","0 0 "+c+" "+l).attr("width",c).attr("height",l).attr("preserveAspectRatio","xMidYMin").on("click",function(){var t=o.select(this).attr("class");t=t.split(" "),o.selectAll("."+t[0]).filter("."+t[1]).style("cursor","zoom-in").transition().duration(750).attr("height",l).attr("width",c),o.select(this).style("cursor","default").transition().duration(750).attr("height",l*i).attr("width",c*i)});d.append("g").append("text").attr("class","title").attr("transform",function(t){return"translate( 300,15 )"}).text(a);var x,v=d.selectAll(".bar").data(n).enter().append("g").attr("class","bar").attr("transform",function(t){return"translate("+(+p(t.x)+ +s.left)+","+(+f(t.y)+ +s.top)+")"}).on("mouseenter",function(t){for(var r=0,a=t.length;a>=1;)a/=10,r++;var n=4*r+10;o.select(e.event.path[1]).select(".tool_tip").select("text").attr("transform","translate( "+(s.left-5)+", "+(150-t.length*g+ +s.top+10)+" )").attr("visibility","visible").text(t.length),o.select(e.event.path[1]).select(".tool_tip").attr("width",n+"px").attr("height","15px").select("rect").attr("transform","translate( "+(+s.left-n)+", "+(150-t.length*g+ +s.top)+" )").attr("width",n+"px").attr("height","15px").attr("fill","#ebd9b2")}).on("mouseleave",function(t){o.select(e.event.path[1]).select(".tool_tip").select("text").attr("visibility","hidden"),o.select(e.event.path[1]).select(".tool_tip").select("rect").attr("width","0").attr("height","0").attr("fill","")});x=void 0==n[0]?1:p(n[0].dx),v.append("rect").attr("x",1).attr("width",x-1).attr("height",function(t){return 150-f(t.y)});var m=o.svg.axis().scale(p).orient("bottom").tickFormat(function(t){var e=Math.floor(t/60),r=Math.floor(t-60*e);return e<10&&(e="0"+e),r<10&&(r="0"+r),e+":"+r});d.append("g").attr("class","x axis").attr("id","x_"+r).attr("transform","translate( "+s.left+","+(+s.top+150)+")").call(m),d.append("g").append("text").attr("class","ax_title").attr("transform",function(t){var e=o.select("#x_"+r).node();return"translate("+(+s.left+e.getBoundingClientRect().width/2+30)+","+(+s.top+150+e.getBoundingClientRect().height+10)+")"}).text("ETA - hrs:mins");var b=o.svg.axis().scale(f).orient("left");d.append("g").attr("class","y axis").attr("id","y_"+r).attr("transform","translate( "+s.left+","+s.top+")").call(b),d.append("g").append("text").attr("class","ax_title").attr("transform",function(t){var e=o.select("#y_"+r).node();return"translate("+(+s.left-e.getBoundingClientRect().width-5)+","+(+s.top+e.getBoundingClientRect().height/2-30)+")rotate(-90)"}).text("Number of Jobs"),d.append("g").attr("class","tool_tip").append("rect"),d.select(".tool_tip").append("text")};var o=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}(e)});
//# sourceMappingURL=../../maps/reports_webapp/run_stats.js.map
