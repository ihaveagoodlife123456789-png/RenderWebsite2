"use strict";

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mail["default"].setApiKey(process.env.SENDGRID_SECRET);

var transporter = _nodemailer["default"].createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_SECRET
  }
});

var message = {
  from: "ihaveagoodlife123456789@gmail.com",
  to: "ihaveagoodlife123456789@gmail.com",
  subject: "Hello World",
  text: "This is the plaintext version of the email.",
  html: "<p>This is the <strong>HTML version</strong> of the email.</p>"
};

function sendEmail() {
  var send;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(transporter.sendMail(message));

        case 3:
          send = _context.sent;
          send ? console.log('Sent!') : console.log('Somthing went wrong...');
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log('Somthing went wrong', _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

sendEmail();