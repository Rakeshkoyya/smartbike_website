

var uid = JSON.parse(document.getElementById('uid').textContent);
var fp_prof = firebase.database().ref().child(uid).child('profile');
fp_prof.on('value', function (datasnap) {
	datasnap.forEach((childSnapshot) => {
		if (childSnapshot.key == 'address') {
			document.getElementById('addr').innerText = childSnapshot.val();
		}
		else if (childSnapshot.key == 'email') {
			document.getElementById('email').innerText = childSnapshot.val();
		}
		else if (childSnapshot.key == 'ph_num') {
			document.getElementById('ph_num').innerText = childSnapshot.val();
		}
		else if (childSnapshot.key == 'uniqueID') {
			document.getElementById('uniqueid').innerText = childSnapshot.val();
		}
		else if (childSnapshot.key == 'uname') {
			document.getElementById('uname').innerText = childSnapshot.val();
		}
		else if (childSnapshot.key == 'v_num') {
			document.getElementById('vechile number').innerText = childSnapshot.val();
		}

	});
});

function updateit(val) {
	document.getElementById("hidden-val").value = val;
	document.querySelector('.modal')
		.classList.toggle('hide-this');
	document.getElementById("modalren").classList.remove("hide-this");
}

document.querySelector('#updatein')
	.addEventListener('submit', (e) => {
		e.preventDefault();
		var nameValue = document.getElementById("rname").value;
		var keyValue = document.getElementById("hidden-val").value;
		var updates = {}
		updates[keyValue] = nameValue;
		fp_prof.update(updates);
		document.getElementById("modalren").classList.add("hide-this")
		document.getElementById("modalok").classList.remove("hide-this");
		document.getElementById("ok_mesg").innerText = "success";
	});

document.querySelector('.modalren-close')
	.addEventListener('click', (func) => {
		document.getElementById("modalren").classList.add("hide-this");
		document.getElementById("modalok").classList.add("hide-this");

		document.querySelector('.modal')
			.classList.toggle('hide-this');
	});

function modalok() {
	document.getElementById("modalren").classList.add("hide-this");
	document.getElementById("modalok").classList.add("hide-this");
	document.querySelector('.modal')
		.classList.toggle('hide-this');
}