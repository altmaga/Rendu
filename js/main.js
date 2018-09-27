fetch('http://api.citybik.es/v2/networks/bicloo').then(function(res) {
	return res.json().then(function(data) {
		console.log(data);

    var listeStations = document.querySelector('.listes_stations');
    var stations = data.network.stations;

    for (var i = 0; i < stations.length; i++) {
			// ajout li pour chaque station : nom  + places libres + nb velos
    	var currentLi = document.createElement('li');
      var detailStation = stations[i].name + ' Places libres : ' + stations[i].empty_slots + ' Vélos disponibles : ' + stations[i].free_bikes;
      currentLi.textContent = detailStation;
      listeStations.appendChild(currentLi);

			// code couleur en fonction du nombre de velo dispo
			var total_velo = stations[i].empty_slots + stations[i].free_bikes;
			var currentDiv = document.createElement('div');
			currentLi.appendChild(currentDiv);

			if (total_velo === stations[i].free_bikes) {
				//console.log('complet');
				var newClassComplet = document.createAttribute("class");
				newClassComplet.value = "complet";
				currentDiv.setAttributeNode(newClassComplet);
				//currentDiv.textContent = 'Tous les vélos sont dispo!';

			} else if (stations[i].free_bikes > total_velo / 2) {
				//console.log('plus de la moitie');
				var newClassPlus = document.createAttribute("class");
				newClassPlus.value = "plus_moitie";
				currentDiv.setAttributeNode(newClassPlus);

			} else if (stations[i].free_bikes < total_velo / 2) {
				//console.log('moins de la moitie');
				var newClassMoins = document.createAttribute("class");
				newClassMoins.value = "moins_moitie";
				currentDiv.setAttributeNode(newClassMoins);

			} else if (total_velo === stations[i].empty_slots) {
				//console.log('vide');
				var newClassVide = document.createAttribute("class");
				newClassVide.value = "vide";
				currentDiv.setAttributeNode(newClassVide);
			}

    }



	});
});
