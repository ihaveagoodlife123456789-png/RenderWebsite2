"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripePayment = void 0;

var _stripe = _interopRequireDefault(require("stripe"));

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

require("../.env");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var stripePayment = _express["default"].Router();

exports.stripePayment = stripePayment;
var stripe = new _stripe["default"](process.env.STRIPE_SECRET_KEY);
stripePayment.get('/', function _callee(req, res) {
  var paymentIntent;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(stripe.paymentIntents.create({
            amount: 1,
            currency: 'cad'
          }));

        case 2:
          paymentIntent = _context.sent;
          console.log(paymentIntent);
          res.json({
            client_secret: paymentIntent.client_secret
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
stripePayment.post('/update', function _callee2(req, res) {
  var paymentUpdate;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(stripe.paymentIntents.update("{{".concat(stripe.paymentIntents.id, "}"), {
            amount: paymentIntents.amount + 100
          }));

        case 2:
          paymentUpdate = _context2.sent;
          console.log(paymentUpdate);
          res.json({
            client_amount: paymentUpdate.amount
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
stripePayment.get('/retrieve', function _callee3(req, res) {
  var paymentRetrieve;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(stripe.paymentIntents.retrieve("{{".concat(stripe.paymentIntents.id, "}")));

        case 2:
          paymentRetrieve = _context3.sent;
          res.json({
            client_amount: paymentRetrieve.amount
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
stripePayment.post('/cancel', function _callee4(req, res) {
  var paymentRetrieve;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(stripe.paymentIntents.cancel("{{".concat(stripe.paymentIntents.id, "}")));

        case 2:
          paymentRetrieve = _context4.sent;
          res.json({
            client_status: 'Cancelled'
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
stripePayment.post('/confirm', function _callee5(req, res) {
  var paymentConfirm;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(stripe.paymentIntents.confirm("{{".concat(stripe.paymentIntents.id, "}"), {
            payment_method: paymentMethod.id
          }));

        case 2:
          paymentConfirm = _context5.sent;
          res.json({
            client_status: paymentConfirm.status,
            client_payment_method: paymentConfirm.payment_method
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //PaymentMethod

stripePayment.post('/paymentMethod', function _callee6(req, res) {
  var paymentMethod;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(stripe.paymentMethods.create({
            type: 'card',
            card: null
          }));

        case 2:
          paymentMethod = _context6.sent;
          console.log(paymentMethod);
          res.json({
            client_status: 'Ready'
          });

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //Payment Elements