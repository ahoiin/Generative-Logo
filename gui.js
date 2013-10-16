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


var max = 15;
var min = 3;
var iteration = 0;
var start = 0;
var changePos = [];
var currentPos = [];
var newPos = [];
var animate = true;


var guiItem = function() {
  this.radar_chart_0 = max;
  this.radar_chart_1 = max;
  this.radar_chart_2 = max;
  this.radar_chart_3 = max;
  this.radar_chart_4 = max;
  this.radar_chart_5 = max;
  this.radar_chart_6 = max;
  this.radar_chart_7 = max;
  this.speed = 500;
  this.color_0 = "#c8fdff";
  this.color_1 = "#111111"; 
  this.color_2 = "#d2c878"; 
  this.color_3 = "#e03523";
  
  this.animate =  function() {  
  	if(animate) {
      	animate = false;
    } 
    else { 
    	animate = true;
        iteration = 0;
      	start = 0; 
        requestAnimationFrame(update); 
    	guiItem.update(); 
    }
  };
   
  
  this.updateColor =  function() {  
  	animate = false;
    $(".radar-chart-serie0").css("fill",this.color_0);
    $(".radar-chart-serie1").css("fill",this.color_0);
    $(".radar-chart-serie0").css("stroke",this.color_0);
    $(".radar-chart-serie1").css("stroke",this.color_0);
    
    $(".radar-chart-serie2").css("fill",this.color_1);
    $(".radar-chart-serie3").css("fill",this.color_1);
    $(".radar-chart-serie2").css("stroke",this.color_1);
    $(".radar-chart-serie3").css("stroke",this.color_1); 
    
    $(".radar-chart-serie4").css("fill",this.color_2);
    $(".radar-chart-serie5").css("fill",this.color_2);
    $(".radar-chart-serie4").css("stroke",this.color_2);
    $(".radar-chart-serie5").css("stroke",this.color_2); 
    
    $(".radar-chart-serie6").css("fill",this.color_3);
    $(".radar-chart-serie7").css("fill",this.color_3);
    $(".radar-chart-serie6").css("stroke",this.color_3);
    $(".radar-chart-serie7").css("stroke",this.color_3);  

    guiItem.update(); 
  };
  
  this.grid =  function() {  
  	$('.axis').toggle(); 
    $('.line').toggle();   
  };
  
  this.reset =  function() {  
  	animate = false;
    this.radar_chart_0 = max;
    this.radar_chart_1 = max;
    this.radar_chart_2 = max;
    this.radar_chart_3 = max;
    this.radar_chart_4 = max;
    this.radar_chart_5 = max;
    this.radar_chart_6 = max;
    this.radar_chart_7 = max;
    guiItem.update(); 
  };

  this.save =  function() {  
  	animate = false;
      
  	var currentdate = new Date(); 
 	  var datetime = "chart_" + currentdate.getDate() + "_"
                  + (currentdate.getMonth()+1)  + "_" 
                  + currentdate.getFullYear() + "-"  
                  + currentdate.getHours() + "_"  
                  + currentdate.getMinutes() + "_" 
                  + currentdate.getSeconds();
    
    svgenie.save( document.getElementById('svgchart'), { name:datetime + ".png" } );    
  };
  
  this.update =  function(status) { 
  
      var d = [
            [
             {axis: "radar_chart_0", value: this.radar_chart_0}, 
             {axis: "radar_chart_1", value: this.radar_chart_1}, 
             {axis: "radar_chart_2", value: 0},  
             {axis: "radar_chart_3", value: 0},  
             {axis: "radar_chart_4", value: 0},
             {axis: "radar_chart_5", value: 0},
             {axis: "radar_chart_6", value: 0},
             {axis: "radar_chart_7", value: 0}  
            ],[
             {axis: "radar_chart_0", value: 0}, 
             {axis: "radar_chart_1", value: this.radar_chart_1}, 
             {axis: "radar_chart_2", value: this.radar_chart_2}, 
             {axis: "radar_chart_3", value: 0},  
             {axis: "radar_chart_4", value: 0},
             {axis: "radar_chart_5", value: 0},
             {axis: "radar_chart_6", value: 0},
             {axis: "radar_chart_7", value: 0} 
            ],[
             {axis: "radar_chart_0", value: 0}, 
             {axis: "radar_chart_1", value: 0}, 
             {axis: "radar_chart_2", value: this.radar_chart_2}, 
             {axis: "radar_chart_3", value: this.radar_chart_3},  
             {axis: "radar_chart_4", value: 0},
             {axis: "radar_chart_5", value: 0},
             {axis: "radar_chart_6", value: 0},
             {axis: "radar_chart_7", value: 0} 
            ],[
             {axis: "radar_chart_0", value: 0}, 
             {axis: "radar_chart_1", value: 0}, 
             {axis: "radar_chart_2", value: 0}, 
             {axis: "radar_chart_3", value: this.radar_chart_3},  
             {axis: "radar_chart_4", value: this.radar_chart_4},
             {axis: "radar_chart_5", value: 0},
             {axis: "radar_chart_6", value: 0},
             {axis: "radar_chart_7", value: 0} 
            ],[
             {axis: "radar_chart_0", value: 0}, 
             {axis: "radar_chart_1", value: 0}, 
             {axis: "radar_chart_2", value: 0}, 
             {axis: "radar_chart_3", value: 0},  
             {axis: "radar_chart_4", value: this.radar_chart_4},
             {axis: "radar_chart_5", value: this.radar_chart_5},
             {axis: "radar_chart_6", value: 0},
             {axis: "radar_chart_7", value: 0} 
            ]
            ,[
             {axis: "radar_chart_0", value: 0}, 
             {axis: "radar_chart_1", value: 0}, 
             {axis: "radar_chart_2", value: 0}, 
             {axis: "radar_chart_3", value: 0},  
             {axis: "radar_chart_4", value: 0} ,
             {axis: "radar_chart_5", value: this.radar_chart_5},
             {axis: "radar_chart_6", value: this.radar_chart_6},
             {axis: "radar_chart_7", value: 0} 
            ]
            ,[
             {axis: "radar_chart_0", value: 0}, 
             {axis: "radar_chart_1", value: 0}, 
             {axis: "radar_chart_2", value: 0}, 
             {axis: "radar_chart_3", value: 0},  
             {axis: "radar_chart_4", value: 0},
             {axis: "radar_chart_5", value: 0},
             {axis: "radar_chart_6", value: this.radar_chart_6},
             {axis: "radar_chart_7", value: this.radar_chart_7}    
            ]
            ,[
             {axis: "radar_chart_0", value: this.radar_chart_0}, 
             {axis: "radar_chart_1", value: 0}, 
             {axis: "radar_chart_2", value: 0}, 
             {axis: "radar_chart_3", value: 0},  
             {axis: "radar_chart_4", value: 0},
             {axis: "radar_chart_5", value: 0},
             {axis: "radar_chart_6", value: 0},
             {axis: "radar_chart_7", value: this.radar_chart_7}    
            ]
  		];
		if(status == "start") RadarChart.draw("#chart", d);
  	else RadarChart.update("#chart", d); 
  
  };


};



var guiItem = new guiItem();
var gui = new dat.GUI(); 
gui.remember(guiItem);

var f0 = gui.addFolder('Colors');
f0.addColor(guiItem, 'color_0').onChange(function(value) { guiItem.color_0 = value; guiItem.updateColor(); }); 
f0.addColor(guiItem, 'color_1').onChange(function(value) { guiItem.color_1 = value;guiItem.updateColor(); }); 
f0.addColor(guiItem, 'color_2').onChange(function(value) { guiItem.color_2 = value;guiItem.updateColor(); }); 
f0.addColor(guiItem, 'color_3').onChange(function(value) { guiItem.color_3 = value;guiItem.updateColor(); }); 
 
var f1 = gui.addFolder('Single Values');
f1.add(guiItem, 'radar_chart_0', 0, max).listen().onChange(function(value) { animate = false; guiItem.update(); });
f1.add(guiItem, 'radar_chart_1', 0, max).listen().onChange(function(value) { animate = false; guiItem.update(); });
f1.add(guiItem, 'radar_chart_2', 0, max).listen().onChange(function(value) { animate = false; guiItem.update(); });
f1.add(guiItem, 'radar_chart_3', 0, max).listen().onChange(function(value) { animate = false; guiItem.update(); });
f1.add(guiItem, 'radar_chart_4', 0, max).listen().onChange(function(value) { animate = false; guiItem.update(); });
f1.add(guiItem, 'radar_chart_5', 0, max).listen().onChange(function(value) { animate = false; guiItem.update(); });
f1.add(guiItem, 'radar_chart_6', 0, max).listen().onChange(function(value) { animate = false; guiItem.update(); });    
f1.add(guiItem, 'radar_chart_7', 0, max).listen().onChange(function(value) { animate = false; guiItem.update(); }); 

var f2 = gui.addFolder('General');
f2.add(guiItem, 'speed', 200, 1500).name('Iterations'); 
f2.add(guiItem, 'animate').name('Start / Stop Animation');
f2.add(guiItem, 'grid').name('Show / Hide Grid');
f2.add(guiItem, 'save').name('Save as PNG');

f2.add(guiItem, 'reset').name('Reset');
f2.open();


        
function easeInOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
	}
	return changeInValue / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
}

function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

   
var update = function() {
	totalIterations= guiItem.speed;
    
    if(start == 0) {
    	for(i=0;i<8;i++) {
    		currentPos[i] = eval("guiItem.radar_chart_"+i);
        	changePos[i] = randomFromInterval(-currentPos[i] + min,max - currentPos[i]); 
        }
        start = 1; 
    }  
  
    for(i=0;i<8;i++) {
    	newPos[i] = easeInOutExpo(iteration, currentPos[i], changePos[i], totalIterations);
    	eval("guiItem.radar_chart_"+i+"= newPos["+i+"]");
    }
    
    if (iteration < totalIterations) {
      iteration++;
    } else {
      iteration = 0;
      start = 0;
    }
    if(animate) {
      if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = function(){
              return (
                  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function(/* function */ callback){
                      window.setTimeout(callback, 1000 / 60);
                  }
              );
          }(); 
        }
        requestAnimationFrame(update); 
    	guiItem.update(); 
    }

}; 

guiItem.update("start");
guiItem.grid(); 
guiItem.updateColor();
animate = true;
update();
