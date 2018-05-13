var map;
var markers=[];
var park_markers=[];
var school_markers=[];
var position=[
 {lat:  22.610354, lng: 120.299564},
 {lat:  22.615147, lng: 120.286689},
 {lat:  22.615797, lng: 120.301141},
 {lat:  22.615432, lng: 120.299999}
];

var park_position=[
  {lat:22.618480, lng:120.287005},
  {lat:22.608853, lng:120.297476},
  {lat:22.616317, lng:120.299617}
]

var school_position=[
  {lat:22.623224,lng:120.287833},
  {lat:22.623083,lng:120.297790},
  {lat:22.606087,lng:120.302081},
  {lat:22.586989,lng:120.312037}
]

var Target_area=[
	"6400900-023",//"鎮北里",
	"6400900-021",//"興邦里",
	"6400900-025",//"忠誠里",
	"6400800-006",//"苓東里",
	"6400800-005",//"苓雅里",
	"6400800-004",//"苓中里",
	"6400800-003",//"苓昇里",
	"6400800-002",//"苓洲里",
	"6400800-001",//"博仁里",
	"6400100-012",//"沙地里",
	"6400100-013",//"南端里",
	"6400100-020",//"新化里",
	"6400200-031",//"麗興里",
	"6400100-016",//"新豐里",
	"6400900-046",//"瑞竹里",
	"6400900-042",//"竹南里",
	"6400900-044",//"竹西里",
	"6400900-037",//"興東里",
	"6400900-029"//"民權里",
]

function initMap(){
  map=new google.maps.Map(document.getElementById('map'),{
	center:{lat:22.608111,lng:120.302475},
	zoom:14
  });

  map.data.loadGeoJson("https://d3hu5rc2ze6fj6.cloudfront.net/wms?Request=GetGeoJSON&Layers=ronnywang/%E6%9D%91%E9%87%8C%E7%95%8C%E5%9C%96%28TWD97_121%E5%88%86%E5%B8%B6%29_%E5%9C%B0%E5%9C%96&sql=SELECT+%2A+FROM+this+WHERE+COUNTY_ID+%3D+%2764%27+ORDER+BY+_id_+ASC");


  map.data.setStyle(function(feature){
	  for(var i=0;i<Target_area.length;i++){
		  if(feature.getProperty("VILLAGE_ID")==Target_area[i]){
			  return({
				  fillColor:"red",
				  fillOpacity:.1,
				  strokeWeight:1.5,
				  strokeColor:"gray"
			  });
		  }
	  }
	  return {
	   strokeWeight:.1,
	   strokeColor:"white",
	   fillColor:"white",
	   fillOpacity:.1
	 }
  });

  /*var marker=new google.maps.Marker({
	position:{lat:  22.610354, lng: 120.299564},
	map:map,
	animation: google.maps.Animation.DROP,
   // icon:'http://www.oxxostudio.tw/img/articles/201801/google-maps-3-marker-icon.png'
  });

   for(var i=0;i<position.length;i++){
	 addMarker(i,position,markers);
   }
   */

   var infowindow=new google.maps.InfoWindow({
	 content: "<h2>皮卡 皮卡</h2>"
   });

   var a=-1;
   marker.addListener("click",function(){
	 a=a*-1;
	 if(a>0){
	   infowindow.open(map,marker);
	 }else{
	   infowindow.close();
	 }
   });
}
function addMarker(e,position,markers){
  markers[e]=new google.maps.Marker({
	position: {
	  lat: position[e].lat,
	  lng: position[e].lng
	},
	map:map,
	animation:google.maps.Animation.DROP
  });

  markers[e].addListener("click",function(){
	$.insertInformation(position[e].lat,position[e].lng);
	markers[e].setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function(){
	  markers[e].setAnimation(null)
	},3000);
  });
}

function changeColor(area,opacity){
	map.data.forEach(function(feature){
		if(area==feature.getProperty("VILLAGE_ID")){
			map.data.overrideStyle(feature,{
				fillOpacity:opacity
			});
		}
	});
}

function cleanMarker(markers){
  for(var i=0;i<markers.length;i++){
	if(markers[i]){
	  markers[i].setMap(null);
	}
  }
  markers=[];
}

$(function(){
   $("#park").change(function(){
	 if(this.checked){
	   cleanMarker(park_markers);
	   for(var i=0;i<park_position.length;i++){
		 addMarker(i,park_position,park_markers);
	   }
	 }else{
	   cleanMarker(park_markers);
	 }
   });

   $("#school").change(function(){
	 if(this.checked){
	   cleanMarker(school_markers);
	   for(var i=0;i<school_position.length;i++){
		 addMarker(i,school_position,school_markers);
	   }
	 }else{
	   cleanMarker(school_markers);
	 }
   });


   $("#bar").change(function(){
	   var opacity=$(this).val()/10;
   /*  map.data.setStyle(function(feature){
	   for(var i=0;i<Target_area.length;i++){
		  if(feature.getProperty("V_Name")==Target_area[i]){
			  return({
				  fillOpacity:opacity,
				  fillColor:"red"
			   });
			   }
		   }
	   });
   */

	   for(var i=0;i<Target_area.length;i++){
		   changeColor(Target_area[i],opacity);
	   }
   });
   $.insertInformation=function(lat,lng){
	 $(".information #firstp").html("<p>lat:"+lat+"</p>");
	 $(".information #secondp").html("<p>lng:"+lng+"</p>");
   };

   $("#test").click(function(){
	   changeColor("6400100-020",0.5);
   });
});
