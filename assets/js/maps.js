
mapboxgl.accessToken = 'pk.eyJ1Ijoic21hcnRiaWtlMjQiLCJhIjoiY2tlcmFhMTA2MTA5cjJ0b2VqY3dlYmEwNiJ9.BplkQ_EZ6jBPsmEukHEO9Q';
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	zoom: 5
});

var url = 'https://wanderdrone.appspot.com/';
map.on('load', function () {
	var request = new XMLHttpRequest();
	window.setInterval(function () {
		// make a GET request to parse the GeoJSON at the url
		request.open('GET', url, true);
		request.onload = function () {
			if (this.status >= 200 && this.status < 400) {
				// retrieve the JSON from the response
				var json = JSON.parse(this.response);

				// update the drone symbol's location on the map
				map.getSource('drone').setData(json);

				// fly the map to the drone's current location
				map.flyTo({
					center: json.geometry.coordinates,
					speed: 1
				});
			}
		};
		request.send();
	}, 500);

	map.addSource('drone', { type: 'geojson', data: url });
	map.addLayer({
		'id': 'drone',
		'type': 'symbol',
		'source': 'drone',
		'layout': {
			'icon-image': 'marker-11'
		}
	});
});
