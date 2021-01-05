
window.alert('OfK');

var uid = JSON.parse(document.getElementById('uid').textContent);

var fp_ref = firebase.database().ref().child(uid).child('fingerprint');

var fp_data = fp_ref.child('data');
var fp_action = fp_ref.child('action');
var person;
var a_com, a_id;
var data_list = [0]


fp_data.on('value', (snapshot) => {
	// window.alert('ok');
	// $("#f_table tr").remove();
	var table = document.getElementById("f_table");
	var a = snapshot.numChildren();
	if (a == 1) {

		document.getElementById("nodata").innerHTML = "<h3>You have no Fingerprints</h3>Please register your fingerprints.";
		return;
	}
	var i = 1;
	table.innerHTML = ` <thead class="thead-dark">
	    <tr>
	      <th scope="col">#</th>
	      <th scope="col">Name</th>
	      <th scope="col">Actions</th>
	    </tr>
	  </thead>`;


	snapshot.forEach((childSnapshot) => {
		var childKey = childSnapshot.key;
		if (childKey == 0) { return; }
		data_list.push(childKey);
		var childData = childSnapshot.val();
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		cell1.innerHTML = i;
		cell2.innerHTML = childData;
		cell3.innerHTML = "<button class=\"btn btn-outline-dark btn-md\" id=\"rename\" onclick=\"rename(" + childKey + ")\">rename</button>\t<button class=\"btn btn-danger btn-md\" onclick=\"remove(" + childKey + ")\">delete</button>";

		i++;

	});
});

// new response------------------
var fp_res = fp_ref.child("response");

fp_res.on('value', function (datasnap) {
	if (datasnap.val() == 'f-d') {
		var keyValue = document.getElementById("hide-key").value;
		fp_data.child(keyValue).remove();

		document.getElementById("modalok").classList.remove("hide-this");
		document.getElementById("modaltemp").classList.add("hide-this");
		document.getElementById("ok_mesg").innerText = "successfully deleted!";
		fp_ref.update({ 'action': { 'com': 0, 'id': 0 } });
	}
	else if (datasnap.val() == '2-3') {
		fp_ref.update({ 'action': { 'com': 0, 'id': 0 } });
		document.getElementById("modaltemp").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "Place your finger on scanner.";
	}
	else if (datasnap.val() == 'r-f') {
		document.getElementById("modaltemp").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "Remove Your finger";
	}
	else if (datasnap.val() == '2-3.') {
		document.getElementById("modaltemp").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "Again place your finger";
	}
	else if (datasnap.val() == '2-7') {
		document.getElementById("modaltemp").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "Fingerprints matched.";
	}
	else if (datasnap.val() == '2-8') {
		document.getElementById("modaltemp").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "Fingerprints did not matched. Try Again";
	}
	else if (datasnap.val() == '2-9') {
		document.getElementById("modaltemp").classList.add("hide-this");
		document.getElementById("modalok").classList.remove("hide-this");
		document.getElementById("ok_mesg").innerText = "successfully registered.";
	}
	else if (datasnap.val() == 'e-0') {
		document.getElementById("modaltemp").classList.add("hide-this");
		document.getElementById("modalok").classList.remove("hide-this");
		document.getElementById("ok_mesg").innerText = "error occured! try later.";
	}
});


// fp_ref.on('value', function (datasnap) {
// 	datasnap.forEach((childSnapshot) => {
// 		if (childSnapshot.key == 'data') { return; }
// 		// window.alert(childSnapshot.key);
// 		if (childSnapshot.key == 'action') {
// 			a_com = childSnapshot.child('com').val();
// 			a_id = childSnapshot.child('id').val();
// 		}
// 		if (childSnapshot.key == 'response') {
// 			if (childSnapshot.val() == '0-0') {
// 				document.getElementById("opera").innerHTML = "";
// 			}
// 			if (a_com == 5) {
// 				if (childSnapshot.val() == 'f-d') {
// 					fp_data.child(a_id).remove();
// 					document.getElementById("opera").innerHTML = "fingerprint removed";
// 					fp_ref.update({ 'action': { 'com': 6, 'id': 2 } });
// 				}
// 				if (childSnapshot.val() == 'e-5') {
// 					fp_data.child(a_id).remove();
// 					document.getElementById("opera").innerHTML = "error while deleting";
// 					fp_ref.update({ 'action': { 'com': 0, 'id': 0 } });
// 				}
// 			}
// 			if (a_com == 4) {
// 				if (childSnapshot.val() == '2-9') {
// 					fp_data.child(a_id).set(person);
// 					document.getElementById("opera").innerHTML = "fingerprint registered successfully";
// 					fp_ref.update({ 'action': { 'com': 6, 'id': 1 } });
// 					person = "";
// 					a_id = 0;
// 					dic = {};
// 				}
// 				if (childSnapshot.val() == '2-3') {
// 					document.getElementById("opera").innerHTML = "place your finger on scanner";
// 				}
// 				if (childSnapshot.val() == '2-4') {
// 					document.getElementById("opera").innerHTML = "scanned successfully";
// 				}
// 				if (childSnapshot.val() == '2-5') {
// 					document.getElementById("opera").innerHTML = "scan converted";
// 				}
// 				if (childSnapshot.val() == '2-6') {
// 					document.getElementById("opera").innerHTML = "scan is too messy,clean your scanner and Try Again";
// 				}
// 				if (childSnapshot.val() == 'r-f') {
// 					document.getElementById("opera").innerHTML = "remove your finger";
// 				}
// 				if (childSnapshot.val() == '2-3.') {
// 					document.getElementById("opera").innerHTML = "place your finger(2)";
// 				}
// 				if (childSnapshot.val() == '2-7') {
// 					document.getElementById("opera").innerHTML = "prints matched";
// 				}
// 				if (childSnapshot.val() == '2-8') {
// 					document.getElementById("opera").innerHTML = "prints not matched. Try Again";
// 				}
// 				if (childSnapshot.val() == 'e-1') {
// 					document.getElementById("opera").innerHTML = "error in imaging or communication";
// 				}
// 				if (childSnapshot.val() == 'e-2') {
// 					document.getElementById("opera").innerHTML = "error in converting";
// 				}
// 				if (childSnapshot.val() == 'e-3') {
// 					document.getElementById("opera").innerHTML = "error in  modelling";
// 				}
// 				if (childSnapshot.val() == 'e-4') {
// 					document.getElementById("opera").innerHTML = "error in storing";
// 				}
// 				if (childSnapshot.val() == 'e-5') {
// 					document.getElementById("opera").innerHTML = "error while deletion";
// 				}
// 			}
// 		}
// 	});
// });




function rename(key) {
	window.alert(key);

	document.getElementById("hide-key").value = key
	document.querySelector('.modal')
		.classList.toggle('hide-this');
	document.getElementById("modalfm").classList.remove("hide-this");


}


document.querySelector('#change')
	.addEventListener('submit', (e) => {
		e.preventDefault();
		var nameValue = document.getElementById("cname").value;
		var keyValue = document.getElementById("hide-key").value;
		var updates = {}
		updates[keyValue] = nameValue;
		fp_data.update(updates);
		document.getElementById("modalfm").classList.add("hide-this")
		document.getElementById("modalok").classList.remove("hide-this");
		document.getElementById("ok_mesg").innerText = "Renamed as \"" + nameValue + "\"";
	});

document.querySelector('.modalrename-close')
	.addEventListener('click', (func) => {
		document.getElementById("modalfm").classList.add("hide-this");
		document.getElementById("modalfm2").classList.add("hide-this");
		document.getElementById("modalok").classList.add("hide-this");
		document.getElementById("modalrem").classList.add("hide-this");
		document.getElementById("modaltemp").classList.add("hide-this");
		document.querySelector('.modal')
			.classList.toggle('hide-this');
	});

function modalok() {
	document.getElementById("modalfm").classList.add("hide-this");
	document.getElementById("modalfm2").classList.add("hide-this");
	document.getElementById("modalok").classList.add("hide-this");
	document.getElementById("modalrem").classList.add("hide-this");
	document.getElementById("modaltemp").classList.add("hide-this");
	document.querySelector('.modal')
		.classList.toggle('hide-this');
}

function remove(key) {
	window.alert(key);
	document.getElementById("hide-key").value = key
	document.getElementById("terbtn").classList.add("hide-this");
	document.getElementById("modalrem").classList.remove("hide-this");
	document.getElementById("modal").classList.remove("hide-this");

}

function deletefp() {
	var keyValue = document.getElementById("hide-key").value;
	var updates = {}
	updates['action'] = { 'com': 5, 'id': keyValue };
	fp_ref.update(updates);
	document.getElementById("modalrem").classList.add("hide-this");
	document.getElementById("modaltemp").classList.remove("hide-this");
	document.getElementById("resp_mesg").innerText = "processing please wait";



}

function addFinger() {
	document.getElementById("terbtn").classList.remove("hide-this");
	document.querySelector('.modal')
		.classList.toggle('hide-this');
	document.getElementById("modalfm2").classList.remove("hide-this");

}

document.querySelector('#adding')
	.addEventListener('submit', (e) => {
		e.preventDefault();
		var nameValue = document.getElementById("aname").value;

		// this is O(n) solution for finding the next smallest item, 
		// got an idea for O(1) implement it later...
		var id;
		var dic = {};
		for (var i = 0; i < data_list.length; i++) {
			if (data_list[i] - 1 in dic) {
				dic[data_list[i] - 1] = data_list[i]
				dic[data_list[i]] = "";
			}
			else {
				dic[data_list[i]] = "";
			}

		}
		id = 0;
		while (dic[id] != "") {
			id = dic[id];
		}
		a_id = parseInt(id) + 1;
		document.getElementById("hide-key").value = a_id;

		fp_ref.update({ 'action': { 'com': 4, 'id': a_id } });

		document.getElementById("modalfm2").classList.add("hide-this");
		document.getElementById("modaltemp").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "processing please wait";
	});

function terminate() {
	fp_ref.update({ 'action': { 'com': 6, 'id': 1 } });
	modalok();
}