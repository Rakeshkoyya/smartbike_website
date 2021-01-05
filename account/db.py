import pyrebase

config = {
    'apiKey': "AIzaSyARWefawopDukiBR8bmuxJB-va46rhtOLI",
    'authDomain': "superbikey.firebaseapp.com",
    'databaseURL': "https://superbikey-default-rtdb.firebaseio.com",
    'projectId': "superbikey",
    'storageBucket': "superbikey.appspot.com",
    'messagingSenderId': "974718385501",
    'appId': "1:974718385501:web:f3e7d6d57ac778e8a77cb4",
    'measurementId': "G-N00J14WJ88"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()


def create_user_data(uid):
    data = {"geometry": {"type": "Point", "coordinates": [
        144.34052645975987, -42.59638923858063]}, "type": "Feature", "properties": {}}
    elock = {'command': '1-0', 'response': '1-0'}
    fp = {'data': {0: 'default'}, 'action': {
        'com': 0, 'id': 0}, 'response': '0-0'}
    db.child(uid).set({'bike': {'response': '3-0'},
                       'geodata': data, 'elock': elock, 'fingerprint': fp})


def update_user_data(uid):
    db.child(uid).child('geodata').child('geometry').child(
        'coordinates').update({0: 90.12, 1: 32.1})


def get_data(uid):
    return db.child(uid).child('elock').child('command').get().val()


# update_user_data('DT1234')
