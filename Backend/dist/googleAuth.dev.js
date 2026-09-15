"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authGoogle = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _passport = _interopRequireDefault(require("passport"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());

var authGoogle = _express["default"].Router();

exports.authGoogle = authGoogle;
authGoogle.get('/login', _passport["default"].authenticate('google', {
  scope: ['profile', 'email']
}));
authGoogle.get('/callback', _passport["default"].authenticate('google', {
  failureRedirect: '/login-failed'
}), function (req, res) {
  console.log('User logged in:', req.user);

  var token = _jsonwebtoken["default"].sign({
    userId: req.user.id,
    email: req.user.email
  }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  res.redirect("https://ascendedhorizons.com/dashboard?token=".concat(token));
});