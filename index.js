var map;
var markers = [];
var park_markers = [];
var school_markers = [];
var public_markers=[];
var medical_markers=[];
var infowindow;
var population=[];
var test={};

var park_position = [
	{ 
		lat:22.618942, 
		lng:120.288217,
		"名稱":"真愛碼頭公園",
		"地址":"803高雄市鹽埕區公園二路62號"
	},
	{ 
		lat:22.623000, 
		lng:120.275953,
		"名稱":"哈瑪星鐵道文化園區",
		"地址":"804高雄市鼓山區鼓山一路32號"
	},
	{ 
		lat:22.624921, 
		lng:120.287991,
		"名稱":"228和平紀念公園",
		"地址":"803高雄市鹽埕區中正四路"
	},
	{
		lat:22.624554, 
		lng:120.300082,
		"名稱":"中央公園",
		"地址":"801高雄市前金區中山路五福路"
	},
	{
		lat:22.608826, 
		lng:120.296777,
		"名稱":"星光水岸公園",
		"地址":"806高雄市前鎮區"
	},
	{
		lat:22.607587, 
		lng:120.309308,
		"名稱":"勞工公園",
		"地址":"806高雄市前鎮區中山三路"
	},
	{
		lat:22.612162, 
		lng:120.319114,
		"名稱":"中正足球場",
		"地址":"806高雄市前鎮區二聖一路290號"
	},
	{
		lat:22.592590, 
		lng:120.307055,
		"名稱":"獅子公園",
		"地址":"806高雄市前鎮區擴建一路43號"
	}
]

var school_position = [
	{
		lat:22.606128, 
		lng:120.302050,
		"名稱":"高雄市立成功啟智學校",
		"地址":"806高雄市前鎮區復興三路3號",
		"電話":"07 330 4624"
	},
	{
		lat:22.626608, 
		lng:120.265803,
		"名稱":"國立中山大學",
		"地址":"804高雄市鼓山區蓮海路70號",
		"電話":"07 525 2000"
	},
	{
		lat:22.622648, 
		lng:120.288190, 
		"名稱":"高雄市立鹽埕國民中學",
		"地址":"803高雄市鹽埕區新樂街46號",
		"電話":"07 521 1283"
	},
	{
		lat:22.623831, 
		lng:120.286919,
		"名稱":"光榮國小",
		"地址":"803高雄市鹽埕區大智路150號",
		"電話":"07 551 4549"
	},
	{
		lat:22.613313, 
		lng:120.297219,
		"名稱":"高雄市立成功國民小學",
		"地址":"802高雄市苓雅區華新街59號",
		"電話":"07 334 1882"
	},
	{
		lat:22.610935, 
		lng:120.323011,
		"名稱":"光華國中",
		"地址":"806高雄市前鎮區和平二路170號",
		"電話":"07 722 2622"
	},
	{
		lat:22.604714, 
		lng:120.308034,
		"名稱":"獅甲國中",
		"地址":"806高雄市前鎮區中山三路43號",
		"電話":"07 333 1522"
	},
]

var public_position=[
	{
		lat:22.619926, 
		lng:120.281695,
		"名稱":"駁二藝術特區",
		"地址":"803高雄市鹽埕區大勇路1號"
	},
	{
		lat:22.615998, 
		lng:120.292408,
		"名稱":"海洋文化及流行音樂中心",
		"地址":"802高雄市苓雅區海邊路"
	},
	{
		lat:22.611714, 
		lng:120.293320,
		"名稱":"高雄港港埠旅運中心",
		"地址":"802高雄市苓雅區"
	},
	{
		lat:22.609871, 
		lng:120.301946,
		"名稱":"高雄市立圖書館總館",
		"地址":"80661高雄市前鎮區新光路61號"
	},
	{
		lat:22.608048, 
		lng:120.299071,
		"名稱":"高雄展覽館",
		"地址":"806高雄市前鎮區成功二路39號"
	},
	{
		lat:22.604303, 
		lng:120.300594,
		"名稱":"高雄展軟體園區",
		"地址":"806高雄市前鎮區成功二路復興四路"
	}
]

var medical_position=[
	{
		lat:22.615400, 
		lng:120.297802,
		"名稱":"阮綜合醫療社團法人阮綜合醫院",
		"地址":"802高雄市苓雅區成功一路162號",
		"電話":"07 335 1121"
	},
	{
		lat:22.607803, 
		lng:120.317709,
		"名稱":"新正薪醫院",
		"地址":"806高雄市前鎮區一心一路233號",
		"電話":"07 970 5335"
	},
	{
		lat:22.626850, 
		lng:120.297367,
		"名稱":"高雄市立大同醫院",
		"地址":"801高雄市前金區中華三路68號",
		"電話":"07 291 1101"
	}
]

var Target_area = [
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

var json_name = [
	"鎮北里",
	"興邦里",
	"忠誠里",
	"苓東里",
	"苓雅里",
	"苓中里",
	"苓昇里",
	"苓洲里",
	"博仁里",
	"沙地里",
	"南端里",
	"新化里",
	"麗興里",
	"新豐里",
	"瑞竹里",
	"竹南里",
	"竹西里",
	"興東里",
	"民權里",
]

var village_area=[
	1.8390,
	0.8240,
	0.3720,
	1.61225,
	0.0731,
	0.333,
	0.422375,
	2.013,
	0.042,
	0.098,
	0.2447,
	0.061,
	0.4179,
	0.05,
	0.309133,
	0.2846,
	0.4425,
	0.161,
	0.1559
]


function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 22.608111, lng: 120.302475 },
		zoom: 14
	})

	map.data.loadGeoJson("https://d3hu5rc2ze6fj6.cloudfront.net/wms?Request=GetGeoJSON&Layers=ronnywang/%E6%9D%91%E9%87%8C%E7%95%8C%E5%9C%96%28TWD97_121%E5%88%86%E5%B8%B6%29_%E5%9C%B0%E5%9C%96&sql=SELECT+%2A+FROM+this+WHERE+COUNTY_ID+%3D+%2764%27+ORDER+BY+_id_+ASC");

	map.data.setStyle(function (feature) {
		for (var i = 0; i < Target_area.length; i++) {
			if (feature.getProperty("VILLAGE_ID") == Target_area[i]) {
				return ({
					fillColor: "red",
					fillOpacity: 0,
					strokeWeight: 1.5,
					strokeColor: "gray"
				});
			}
		}
		return {
			strokeWeight: .1,
			strokeColor: "white",
			fillColor: "white",
			fillOpacity: .1
		}
	});

	/* ========== load population JSON ==========  */
	for (var i = 0; i < json_name.length; i++) {
		$.getJSON('./data/' + json_name[i] + '.json', function (data) {
			population.push(data);
			//想用成字典，但不知道為什麼一直出錯，只好用成陣列
			//求在這裡如何使用字典? 還是要在另外一個for中轉成字典?
		});
	}
	/* ==========================================  */
	
}
function addMarker(e, position, markers,markerpic) {
	markers[e] = new google.maps.Marker({
		position: {
			lat: position[e].lat,
			lng: position[e].lng
		},
		map: map,
		icon:markerpic,
		animation: google.maps.Animation.DROP
	});

	markers[e].addListener("click", function () {
		//$.insertInformation(position[e].lat,position[e].lng);
		if (infowindow) {
			infowindow.close();
		}
		infowindow = new google.maps.InfoWindow();
		infowindow.setContent(InfoContent(position[e]));
		infowindow.open(map, markers[e]);
		markers[e].setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function () {
			markers[e].setAnimation(null)
		}, 3000);
	});
}

function InfoContent(marker_position){
	var html="<div>";
	for(var key in marker_position){
		if(key=="lat"){
			html+="<p>"+"經度"+" : "+marker_position[key]+"</p>";
		}else if(key=="lng"){
			html+="<p>"+"緯度"+" : "+marker_position[key]+"</p>";
		}else{
			html+="<p>"+key+" : "+marker_position[key]+"</p>";
		}
	}
	html+="</div>";
	return html;
}

function changeColor(area, opacity) {
	map.data.forEach(function (feature) {
		if (area == feature.getProperty("VILLAGE_ID")) {
			map.data.overrideStyle(feature, {
				fillOpacity: opacity
			});
		}
	});
}

function cleanMarker(markers) {
	for (var i = 0; i < markers.length; i++) {
		if (markers[i]) {
			markers[i].setMap(null);
		}
	}
	markers = [];
}

function finddata(area,time){
	console.log(area);
	console.log(time);
	for(var i=0;i<population[area].length;i++){
		if(time[0]==population[area][i].年 && time[1]==population[area][i].月)
			return population[area][i];
	}
	return "找不到";
}

$(function () {
	$("#park").change(function () {
		var markerpic="http://maps.google.com/mapfiles/ms/icons/green-dot.png";
		if (this.checked) {
			cleanMarker(park_markers);
			for (var i = 0; i < park_position.length; i++) {
				addMarker(i, park_position, park_markers,markerpic);
			}
		} else {
			cleanMarker(park_markers);
		}
	});

	$("#school").change(function () {
		var markerpic="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
		if (this.checked) {
			cleanMarker(school_markers);
			for (var i = 0; i < school_position.length; i++) {
				addMarker(i, school_position, school_markers,markerpic);
			}
		} else {
			cleanMarker(school_markers);
		}
	});

	$("#public").change(function () {
		var markerpic="http://maps.google.com/mapfiles/ms/icons/purple-dot.png";
		if (this.checked) {
			cleanMarker(public_markers);
			for (var i = 0; i < public_position.length; i++) {
				addMarker(i, public_position, public_markers,markerpic);
			}
		} else {
			cleanMarker(public_markers);
		}
	});

	$("#medical").change(function () {
		var markerpic="http://maps.google.com/mapfiles/ms/icons/red-dot.png";
		if (this.checked) {
			cleanMarker(medical_markers);
			for (var i = 0; i < medical_position.length; i++) {
				addMarker(i, medical_position, medical_markers,markerpic);
			}
		} else {
			cleanMarker(medical_markers);
		}
	});

	$("#confirmtime").click(function(){
		var startdate=$("#startdate").val().split("-");
		var enddate=$("#enddate").val().split("-");
		time=(enddate[0]-startdate[0])*12+(enddate[1]-startdate[1]);
		if(time>0){
			$("#bar").attr("max",String(time));
		}
	});

	$("#bar").change(function () {
		var startdate=$("#startdate").val().split("-");
		var startdate_year=parseInt(startdate[0]);
		var startdate_month=parseInt(startdate[1]);
		var nowdate=[];
		var temp=(startdate_month+parseInt($(this).val()))/12;	//年
		if(Number.isInteger(temp))
			nowdate.push(startdate_year-1911+temp-1);
		else
			nowdate.push(startdate_year-1911+Math.floor(temp));

		var temp2=(startdate_month+parseInt($(this).val()))%12;	 //月
		if(temp2==0)	
			nowdate.push(12);
		else
			nowdate.push(temp2);
		var population=[];
		var population_density=[];
		for(var i=0;i<Target_area.length;i++){
			population.push(finddata(i,nowdate));
			population_density.push((population[i].人口數/village_area[i])*0.00008);
			console.log(population_density[i]);
			changeColor(Target_area[i],population_density[i]*0.8);
		}
	});
});	
