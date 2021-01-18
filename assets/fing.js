var uid = JSON.parse(document.getElementById('uid').textContent);

var fp_ref = firebase.database().ref().child(uid).child('fingerprint');

var fp_data = fp_ref.child('data');
var fp_action = fp_ref.child('action');
var person;
var a_com, a_id;
var data_list = [0]

var isgps = firebase.database().ref().child(uid).child('isgpsconnected');

isgps.on('value', (snap) => {

	var val = snap.val();
	if (val == 'true') {
		document.getElementById("gpsmesg").innerText = "GPS connected showing live location";
	}
	else {
		document.getElementById("gpsmesg").innerText = "GPS offline, showing last seen";
	}

})


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

var flg = false;
fp_res.on('value', function (datasnap) {
	if (datasnap.val() == 'f-d') {
		var keyValue = document.getElementById("hide-key").value;
		fp_data.child(keyValue).remove();
		hideall();
		hidegifs();
		document.getElementById("modalok").classList.remove("hide-this");
		document.getElementById("ok-gif").classList.remove("hide-this");

		// document.getElementById("modaltemp").classList.add("hide-this");
		document.getElementById("ok_mesg").innerText = "successfully deleted!";
		fp_ref.update({ 'action': { 'com': 6, 'id': 2 } });
	}
	else if (datasnap.val() == '2-3') {
		fp_ref.update({ 'action': { 'com': 0, 'id': 0 } });
		hideall();
		hidegifs();
		document.getElementById("modaltemp").classList.remove("hide-this");
		// document.getElementById("respimg").src = 'img/placefinger.gif';
		document.getElementById("place-gif").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "Place your finger on scanner.";
	}
	else if (datasnap.val() == 'r-f') {
		hideall();
		hidegifs();
		document.getElementById("modaltemp").classList.remove("hide-this");
		document.getElementById("rem-gif").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "Remove Your finger";
	}
	else if (datasnap.val() == '2-3.') {
		hideall();
		hidegifs();
		document.getElementById("modaltemp").classList.remove("hide-this");
		document.getElementById("place-gif").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "Again place your finger";
	}
	else if (datasnap.val() == '2-7') {
		hideall();
		hidegifs();
		document.getElementById("modaltemp").classList.remove("hide-this");
		document.getElementById("ok-gif").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "Fingerprints matched.";
	}
	else if (datasnap.val() == '2-8') {
		hideall();
		hidegifs();
		document.getElementById("modaltemp").classList.remove("hide-this");
		document.getElementById("rem-gif").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "Did not scan properly. Try Again";
	}

	else if (datasnap.val() == 'e-0') {
		document.getElementById("modaltemp").classList.add("hide-this");
		document.getElementById("modalok").classList.remove("hide-this");
		document.getElementById("ok_mesg").innerText = "error occured! try later.";
	}
	if (flg) {

		if (datasnap.val() == '2-9') {
			flg = false;
			hideall();
			hidegifs();
			// document.getElementById("modaltemp").classList.add("hide-this");
			var keyVal = document.getElementById("hide-val").value;
			var key = document.getElementById("hide-key").value;
			var update = {}
			update[key] = keyVal;

			fp_ref.child('data').update(update);
			document.getElementById("modalok").classList.remove("hide-this");
			document.getElementById("fingerok-gif").classList.remove("hide-this");
			document.getElementById("ok_mesg").innerText = "successfully registered.";
			fp_ref.update({ 'action': { 'com': 6, 'id': 2 } });

		}
	}

});



function rename(key) {
	hideall();
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
		hideall();
		hidegifs();
		// document.getElementById("modalfm").classList.add("hide-this")
		document.getElementById("modalok").classList.remove("hide-this");
		document.getElementById("ok-gif").classList.remove("hide-this");
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
	hideall();
	// document.getElementById("modalfm").classList.add("hide-this");
	// document.getElementById("modalfm2").classList.add("hide-this");
	// document.getElementById("modalok").classList.add("hide-this");
	// document.getElementById("modalrem").classList.add("hide-this");
	// document.getElementById("modaltemp").classList.add("hide-this");
	document.querySelector('.modal')
		.classList.toggle('hide-this');
}

function remove(key) {
	document.getElementById("hide-key").value = key;
	hideall();
	// document.getElementById("terbtn").classList.add("hide-this");
	document.getElementById("modalrem").classList.remove("hide-this");
	document.getElementById("modal").classList.remove("hide-this");

}

function deletefp() {
	var keyValue = document.getElementById("hide-key").value;
	var updates = {}
	updates['action'] = { 'com': 5, 'id': keyValue };
	fp_ref.update(updates);
	hideall();
	// document.getElementById("modalrem").classList.add("hide-this");
	document.getElementById("modaltemp").classList.remove("hide-this");
	hidegifs();
	document.getElementById("load-gif").classList.remove("hide-this");
	document.getElementById("resp_mesg").innerText = "processing please wait";

}

function addFinger() {
	flg = true;
	hideall();
	document.getElementById("terbtn").classList.remove("hide-this");
	document.querySelector('.modal')
		.classList.toggle('hide-this');
	document.getElementById("modalfm2").classList.remove("hide-this");

}

document.querySelector('#adding')
	.addEventListener('submit', (e) => {
		e.preventDefault();
		document.getElementById("hide-val").value = document.getElementById("aname").value;

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
		hidegifs();
		document.getElementById("load-gif").classList.remove("hide-this");
		document.getElementById("resp_mesg").innerText = "processing please wait";
	});

function terminate() {
	fp_ref.update({ 'action': { 'com': 6, 'id': 1 } });
	modalok();
	hidegifs();
}


function hideall() {
	document.getElementById("modalok").classList.add("hide-this");
	document.getElementById("modaltemp").classList.add("hide-this");
	document.getElementById("modalfm").classList.add("hide-this");
	document.getElementById("modalfm2").classList.add("hide-this");
	document.getElementById("modalrem").classList.add("hide-this");

}


function hidegifs() {
	document.getElementById("load-gif").classList.add("hide-this");
	document.getElementById("place-gif").classList.add("hide-this");
	document.getElementById("rem-gif").classList.add("hide-this");
	document.getElementById("ok-gif").classList.add("hide-this");
	document.getElementById("fingerok-gif").classList.add("hide-this");

}

