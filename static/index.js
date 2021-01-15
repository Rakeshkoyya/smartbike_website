

var stat = document.getElementById('status');
var uid = JSON.parse(document.getElementById('uid').textContent);
var fp_res = firebase.database().ref().child(uid).child('elock').child('response');
var fp_conn = firebase.database().ref().child(uid).child('connection');
var fp_bike = firebase.database().ref().child(uid).child('bike').child('response');

fp_bike.on('value', function (datasnap) {
	if (datasnap.val() == '3-0') {
		document.getElementById("bikestat").innerText = "Bike Status: off";
	}
	else if (datasnap.val() == '3-1') {
		document.getElementById("bikestat").innerText = "Bike Status: on";
	}
})

fp_conn.on('value', function (datasnap) {
	var d = new Date(datasnap.val());
	var d2 = new Date();

	if (d2 - d < 60000) {
		document.getElementById('devstat').innerText = "Device Status: connected!";
		document.getElementById("unkn").classList.add("hide-this");
		document.getElementById("bikestat").classList.remove("hide-this");

	}
	else {
		document.getElementById('devstat').innerText = "Device Status: not connected!";
		document.getElementById("unkn").classList.remove("hide-this");
		document.getElementById("bikestat").classList.add("hide-this");
	}
})


fp_res.on('value', function (datasnap) {

	if (datasnap.val() == '1-0') {
		stat.innerHTML = '<i class="fas fa-2x fa-lock-open"></i><h6>Your bike is not locked<h6>';
	}
	else if (datasnap.val() == '1-1') {
		stat.innerHTML = '<i class="fas fa-2x fa-lock"></i><h6>Your bike is locked</h6>';
	}
});



var fp_comd = firebase.database().ref().child(uid).child('elock').child('command');
var checkbox = document.querySelector('input[type="checkbox"]');
checkbox.addEventListener('change', function () {
	if (checkbox.checked) {
		fp_comd.set('1-1')

	} else {
		fp_comd.set('1-0')

	}
});
