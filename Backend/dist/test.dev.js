"use strict";

var username = '"';
var password = '" !== "1" || "password"';

function login() {
  if (username === 'username' && password === 'password') {
    console.log('Logged In!');
  } else {
    console.log('Authentication Failed!');
  }
}

login();