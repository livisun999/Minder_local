var signinPanel = document.getElementById('sigin-panel');

var app = angular.module("minder_home", ["firebase"]);

app.controller("home", function($scope, $firebaseArray, $firebaseAuth, signinWithFacebook, signinWithGoogle) {
    //authebticate with firebase
    var auth = $firebaseAuth();
    $scope.signinWithFacebook = function(){
    	signinWithFacebook.login();
    };
    $scope.signinWithGoogle = function(){
    	signinWithGoogle.login();
    };
});

app.factory("signinWithFacebook", function() {
    var service = [];
    function writeUserData(userId, name, email) {
        firebase.database().ref('users/' + userId).set({
            username: name,
            email: email
        });
    }

    service.login = function() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider);
        firebase.auth().onAuthStateChanged(function(user) {
            var user = firebase.auth().currentUser;
            if (user) {
                // signinPanel.style.display = 'none';
                writeUserData(user.uid, user.displayName, user.email);
                console.log(firebase.auth().currentUser.displayName);
            } else {
                signinPanel.style.display = '';
            }
        });
    };
    return service;
});

app.factory("signinWithGoogle", function() {
    var service = [];
    function writeUserData(userId, name, email) {
        firebase.database().ref('users/' + userId).set({
            username: name,
            email: email
        });
    }

    service.login = function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
        firebase.auth().onAuthStateChanged(function(user) {
            var user = firebase.auth().currentUser;
            if (user) {
                // signinPanel.style.display = 'none';
                writeUserData(user.uid, user.displayName, user.email);
                console.log(firebase.auth().currentUser.displayName);
            } else {
                signinPanel.style.display = '';
            }
        });
    };
    return service;
});