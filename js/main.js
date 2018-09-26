fetch('http://api.citybik.es/v2/networks/bicloo').then(function(res) {
	return res.json().then(function(data) {
		console.log(data);

    var listeStations = document.querySelector('ul');
    var stations = data.network.stations;
    // entre ici
    for (var i = 0; i < stations.length; i++) {
      var currentLi = document.createElement('li');
      var detailStation = stations[i].name + '//' + stations[i].empty_slots + '//' + stations[i].free_bikes;
      currentLi.textContent = detailStation;
      listeStations.appendChild(currentLi);
    }
    // et là


	});
});
