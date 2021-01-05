window.alert('ok');

var stat = document.getElementById('status');
var uid = JSON.parse(document.getElementById('uid').textContent);
var fp_res = firebase.database().ref().child(uid).child('elock').child('response');

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

