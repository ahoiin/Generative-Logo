/*
   
Copyright 2013, Sebastian Sadowski

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
   
*/


var RadarChart = {
  draw: function(id, d, options){
  	var chart = this;
    this.cfg = {
     radius: 5,
     w: 400,
     h: 400,
     factor: 1,
     factorLegend: .85,
     levels: 3,
     maxValue: 0,
     radians: 2 * Math.PI,
     opacityArea: 0.5,
     color: d3.scale.category10()
    };
    if('undefined' !== typeof options){
      for(var i in options){
        if('undefined' !== typeof options[i]){
          cfg[i] = options[i];
        }
      }
    }
    chart.cfg.maxValue = Math.max(chart.cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
    var allAxis = (d[0].map(function(i, j){return i.axis}));
    this.total = allAxis.length;
    var radius = chart.cfg.factor*Math.min(chart.cfg.w/2, chart.cfg.h/2);
    d3.select(id).select("svg").remove();
    this.g = d3.select(id).append("svg").attr("id","svgchart").attr("width", chart.cfg.w).attr("height", chart.cfg.h).append("g");


    for(var j=0; j<chart.cfg.levels; j++){
      var levelFactor = chart.cfg.factor*radius*((j+1)/chart.cfg.levels);
      chart.g.selectAll(".levels").data(allAxis).enter().append("svg:line")
       .attr("x1", function(d, i){return levelFactor*(1-chart.cfg.factor*Math.sin(i*chart.cfg.radians/chart.total));})
       .attr("y1", function(d, i){return levelFactor*(1-chart.cfg.factor*Math.cos(i*chart.cfg.radians/chart.total));})
       .attr("x2", function(d, i){return levelFactor*(1-chart.cfg.factor*Math.sin((i+1)*chart.cfg.radians/chart.total));})
       .attr("y2", function(d, i){return levelFactor*(1-chart.cfg.factor*Math.cos((i+1)*chart.cfg.radians/chart.total));})
       .attr("class", "line").style("stroke", "grey").style("stroke-width", "0.5px").attr("transform", "translate(" + (chart.cfg.w/2-levelFactor) + ", " + (chart.cfg.h/2-levelFactor) + ")");;

    }

    series = 0;

    var axis = chart.g.selectAll(".axis").data(allAxis).enter().append("g").attr("class", "axis");

    axis.append("line")
        .attr("x1", chart.cfg.w/2)
        .attr("y1", chart.cfg.h/2)
        .attr("x2", function(j, i){return chart.cfg.w/2*(1-chart.cfg.factor*Math.sin(i*chart.cfg.radians/chart.total));})
        .attr("y2", function(j, i){return chart.cfg.h/2*(1-chart.cfg.factor*Math.cos(i*chart.cfg.radians/chart.total));})
        .attr("class", "line").style("stroke", "grey").style("stroke-width", "1px");

    /*axis.append("text").attr("class", "legend")
        .text(function(d){return d}).style("font-family", "sans-serif").style("font-size", "10px").attr("transform", function(d, i){return "translate(0, -10)"})
        .attr("x", function(d, i){return chart.cfg.w/2*(1-chart.cfg.factorLegend*Math.sin(i*chart.cfg.radians/chart.total))-20*Math.sin(i*chart.cfg.radians/chart.total);})
        .attr("y", function(d, i){return chart.cfg.h/2*(1-Math.cos(i*chart.cfg.radians/chart.total))+20*Math.cos(i*chart.cfg.radians/chart.total);});
	*/

    this.line = d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; });
        //.interpolate("basis");

	this.area = [];
 
    d.forEach(function(y, x){
      dataValues = [];
       
      chart.g.selectAll(".nodes")
        .data(y, function(j, i){
          dataValues.push([
            chart.cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/chart.cfg.maxValue)*chart.cfg.factor*Math.sin(i*chart.cfg.radians/chart.total)), 
            chart.cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/chart.cfg.maxValue)*chart.cfg.factor*Math.cos(i*chart.cfg.radians/chart.total))
          ]);
        });
      dataValues.push(dataValues[0]);
   
      chart.area[series] = chart.g.selectAll(".area")
                     .data([dataValues])
                     .enter()
                     .append("path") //polygon
                     .attr("id", "radar-chart-serie"+series)
                     .attr("class", "radar-chart-serie"+series+" radar-chart-serie")
                     //.style("stroke-width", "0px")
                     //.style("stroke", chart.cfg.color(series)) "M" + coordinates0.join("L") + "Z",
                         .attr("d", function(d) { 
                    	var arr = [];
                         for(var pti=0;pti<d.length;pti++){
                           //  str= str+ d[pti][0]+","+d[pti][1]+" ";
                             arr.push({x:d[pti][0],y:d[pti][1]});
                         }
                          return chart.line(arr) + "Z"; 
                      })
                     //.style("fill", function(j, i){return chart.cfg.color(series)})
                     //.style("fill-opacity", chart.cfg.opacityArea)
                     .on('mouseover', function (d){ 
                                        z = "path#"+d3.select(this).attr("id");
                                        chart.g.selectAll("path").transition(200).style("fill-opacity", 0.6); 
                                        chart.g.selectAll(z).transition(200).style("fill-opacity", 1);
                                      })
                     .on('mouseout', function(){
                                        chart.g.selectAll("path").transition(200).style("fill-opacity", 1); //chart.cfg.opacityArea
                     });
                 
      series++;
    });
    series=0;
	},
  
  update: function(id, d, options){

 	var chart = this;
    d.forEach(function(y, x){
      dataValues = [];
      chart.g.selectAll(".nodes")
        .data(y, function(j, i){
          dataValues.push([ 
            chart.cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/chart.cfg.maxValue)*chart.cfg.factor*Math.sin(i*chart.cfg.radians/chart.total)), 
            chart.cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/chart.cfg.maxValue)*chart.cfg.factor*Math.cos(i*chart.cfg.radians/chart.total))
          ]);
        }); 
      dataValues.push(dataValues[0]);
      chart.area[series].data([dataValues]).attr("d", function(d) {  
            var arr = [];
            for(var pti=0;pti<d.length;pti++){
              arr.push({x:d[pti][0],y:d[pti][1]});
            }
            return chart.line(arr) + "Z";   
          });
  
      series++;
    });
    series=0;
               
  }
};