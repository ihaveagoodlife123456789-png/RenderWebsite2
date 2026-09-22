"use strict";

var _stripe = _interopRequireDefault(require("stripe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var stripe = new _stripe["default"](STRIPE_SECRET_KEY);