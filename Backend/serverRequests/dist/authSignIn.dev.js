"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authSignIn = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = require("../index.js");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _server = require("../server.js");

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var authSignIn = _express["default"].Router();

exports.authSignIn = authSignIn;
authSignIn.post('/', _server.createPostLimiter, function _callee(req, res) {
  var _req$body, username, password, email, isStrongPassword, saltRounds, hashedPassword, verify, verifyEmail, query, values, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password, email = _req$body.email;
          _context.prev = 1;
          username = (_readOnlyError("username"), _validator["default"].trim(username));
          email = (_readOnlyError("email"), _validator["default"].trim(email).toLowerCase());

          if (_validator["default"].isLength(username, {
            min: 5,
            max: 12
          })) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Password must be between 5 and 12 caracters'
          }));

        case 6:
          if (_validator["default"].matches(username, /^[A-Za-z0-9]+$/)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Username can only contain letters, numbers, underscore, hyphen'
          }));

        case 8:
          if (_validator["default"].isEmail(email)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid email'
          }));

        case 10:
          isStrongPassword = _validator["default"].isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          });

          if (isStrongPassword) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Password needs uppercase, lowercase, number, symbol'
          }));

        case 13:
          saltRounds = 12;
          _context.next = 16;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, saltRounds));

        case 16:
          hashedPassword = _context.sent;
          verify = "SELECT * FROM authenticate WHERE email = $1";
          _context.next = 20;
          return regeneratorRuntime.awrap(_index.pool.query(verify, [email.toLowerCase()]));

        case 20:
          verifyEmail = _context.sent;

          if (!(verifyEmail.rows.length === 1)) {
            _context.next = 23;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'A user with this email already exists.'
          }));

        case 23:
          query = "INSERT INTO authenticate (username, password, email) VALUES ($1, $2, $3)";
          values = [username.toLowerCase(), hashedPassword, email.toLowerCase()];
          _context.next = 27;
          return regeneratorRuntime.awrap(_index.pool.query(query, values));

        case 27:
          result = _context.sent;
          return _context.abrupt("return", res.status(201).json(result));

        case 31:
          _context.prev = 31;
          _context.t0 = _context["catch"](1);
          res.status(201).json({
            message: 'Server error'
          });

        case 34:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 31]]);
});