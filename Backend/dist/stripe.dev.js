"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripe = void 0;

var _stripe = _interopRequireDefault(require("stripe"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var stripe = _express["default"].Router();

exports.stripe = stripe;
var stripeKEY = new _stripe["default"](STRIPE_SECRET_KEY);
stripe.get('/', function _callee(req, res) {
  var paymentMethod;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(stripeKEY.paymentMethods.create({
            amount: 250,
            currency: 'cad'
          }));

        case 2:
          paymentMethod = _context.sent;
          res.json({
            client_secret: paymentMethod.client_secret
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});