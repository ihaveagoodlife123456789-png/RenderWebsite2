"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authGoogle = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _url = require("url");

var _index = require("./index.js");

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectPgSimple = _interopRequireDefault(require("connect-pg-simple"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _passportGoogleOauth = require("passport-google-oauth20");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());

var authGoogle = _express["default"].Router();

exports.authGoogle = authGoogle;
authGoogle.get('/', _passport["default"].authenticate('google', {
  failureRedirect: '/login-failed'
}, function (req, res) {
  console.log('User logged in:', req.user);

  var token = _jsonwebtoken["default"].sign({
    userId: req.user.id,
    email: req.user.email
  }, 'qweuaiwuy398q1', {
    expiresIn: '1d'
  });

  res.redirect("https://ascendedhorizons.com/profile?token=".concat(token));
}));