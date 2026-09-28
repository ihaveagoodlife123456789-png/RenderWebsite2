"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripePayment = void 0;

var _stripe = _interopRequireDefault(require("stripe"));

var _express = _interopRequireDefault(require("express"));

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
          if (paymentMethodDomain) {
            _context.next = 3;
            break;
          }

          console.log('Cannot connect :(');
          return _context.abrupt("return");

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(stripe.paymentIntents.create({
            amount: 100,
            currency: 'cad'
          }));

        case 5:
          paymentIntent = _context.sent;
          console.log(paymentIntent);
          res.json({
            id: paymentIntent.id,
            client_secret: paymentIntent.client_secret
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
stripePayment.post('/update', function _callee2(req, res) {
  var _req$body, paymentIntentId, newAmount, paymentUpdate;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, paymentIntentId = _req$body.paymentIntentId, newAmount = _req$body.newAmount;
          _context2.next = 4;
          return regeneratorRuntime.awrap(stripe.paymentIntents.update(paymentIntentId, {
            amount: newAmount
          }));

        case 4:
          paymentUpdate = _context2.sent;
          console.log(paymentUpdate);
          res.json({
            client_amount: paymentUpdate.amount
          });
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json({
            error: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
stripePayment.post('/retrieve', function _callee3(req, res) {
  var paymentIntentId, paymentRetrieve;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          paymentIntentId = req.body.paymentIntentId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(stripe.paymentIntents.retrieve(paymentIntentId));

        case 4:
          paymentRetrieve = _context3.sent;
          res.json({
            client_amount: paymentRetrieve.amount
          });
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            error: _context3.t0.message
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // 4. Cancel a Payment Intent

stripePayment.post('/cancel', function _callee4(req, res) {
  var paymentIntentId;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          paymentIntentId = req.body.paymentIntentId;
          _context4.next = 4;
          return regeneratorRuntime.awrap(stripe.paymentIntents.cancel(paymentIntentId));

        case 4:
          res.json({
            client_status: 'Cancelled'
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            error: _context4.t0.message
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 5. Confirm a Payment Intent

stripePayment.post('/confirm', function _callee5(req, res) {
  var _req$body2, paymentIntentId, paymentMethodId, paymentConfirm;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body2 = req.body, paymentIntentId = _req$body2.paymentIntentId, paymentMethodId = _req$body2.paymentMethodId;
          _context5.next = 4;
          return regeneratorRuntime.awrap(stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId
          }));

        case 4:
          paymentConfirm = _context5.sent;
          res.json({
            client_status: paymentConfirm.status,
            client_payment_method: paymentConfirm.payment_method
          });
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            error: _context5.t0.message
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); //Payment Elements