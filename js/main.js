// Librairie OpenLayers
// On centre la map sur Nantes
var map;
var mapLat = 47.216694;
var mapLng = -1.553809;
var mapDefaultZoom = 12;

// On initialise la map
function initialize_map() {
	map = new ol.Map({
	 	target: "map",
	 	layers: [new ol.layer.Tile({source: new ol.source.OSM({url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"})})],
	 	view: new ol.View({center: ol.proj.fromLonLat([mapLng, mapLat]),
	 										 zoom: mapDefaultZoom})
 	});
 }

// Fonction point sur la map
 function add_map_point(lat, lng) {
 	var vectorLayer = new ol.layer.Vector({source:new ol.source.Vector({
																						features: [new ol.Feature({
																							geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857'))
																						})]
																					}),
 																				style: new ol.style.Style({
 																					image: new ol.style.Icon({anchor: [0.5, 0.5],
 																																		anchorXUnits: "fraction",
 																																		anchorYUnits: "fraction",
 																																		src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
 																																	})
 																																})
 																				});
	// on affiche la map
	map.addLayer(vectorLayer);
}
// on lance la fonction
initialize_map();

fetch('https://api.citybik.es/v2/networks/bicloo').then(function(res) {
	return res.json().then(function(data) {
		console.log(data);

    var listeStations = document.querySelector('.listes_stations');
    var stations = data.network.stations;

    for (var i = 0; i < stations.length; i++) {

			add_map_point(stations[i].latitude, stations[i].longitude);

			// ajout li pour chaque station : nom  + places libres + nb velos
    	var currentLi = document.createElement('li');
			var currentSpan = document.createElement('span');
      var detailStation = stations[i].name + ' Vélos disponibles : ' + stations[i].free_bikes;
      currentSpan.textContent = detailStation;
			currentLi.appendChild(currentSpan);
      listeStations.appendChild(currentLi);

			// code couleur en fonction du nombre de velo dispo
			var total_velo = stations[i].empty_slots + stations[i].free_bikes;
			var currentDiv = document.createElement('div');
			currentLi.appendChild(currentDiv);

			if (total_velo === stations[i].free_bikes){
				//console.log('complet');
				var newClassComplet = document.createAttribute("class");
				newClassComplet.value = "complet";
				currentDiv.setAttributeNode(newClassComplet);
				//currentDiv.textContent = 'Tous les vélos sont dispo!';
			}
			else if (stations[i].free_bikes >= total_velo / 2){
				//console.log('plus de la moitie');
				var newClassPlus = document.createAttribute("class");
				newClassPlus.value = "plus_moitie";
				currentDiv.setAttributeNode(newClassPlus);
			}
			else if (stations[i].free_bikes < total_velo / 2 && stations[i].empty_slots !== total_velo){
				//console.log('moins de la moitie');
				var newClassMoins = document.createAttribute("class");
				newClassMoins.value = "moins_moitie";
				currentDiv.setAttributeNode(newClassMoins);
			}
			else if (total_velo === stations[i].empty_slots){
				//console.log('vide');
				var newClassVide = document.createAttribute("class");
				newClassVide.value = "vide";
				currentDiv.setAttributeNode(newClassVide);
			}

    }

	});
});
