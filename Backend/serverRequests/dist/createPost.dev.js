"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = void 0;

var _express = _interopRequireDefault(require("express"));

var _index = require("../index.js");

var _server = require("../server.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createPost = _express["default"].Router(); //res.json({ token: req.session.csrfToken });


exports.createPost = createPost;
createPost.post('/', _server.validateCsrf, function _callee(req, res) {
  var _req$body, name, message, color, email, query, result, newId, insertQuery, values;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, message = _req$body.message, color = _req$body.color, email = _req$body.email;
          _context.prev = 1;
          query = "SELECT id FROM users ORDER BY id DESC LIMIT 1";
          _context.next = 5;
          return regeneratorRuntime.awrap(_index.pool.query(query));

        case 5:
          result = _context.sent;
          newId = result.rows[0].id + 1;
          insertQuery = 'INSERT INTO users(id, name, message, color, email) VALUES ($1, $2, $3, $4, $5) RETURNING *';
          values = [newId, name, message, color, email];
          _context.next = 11;
          return regeneratorRuntime.awrap(_index.pool.query(insertQuery, values));

        case 11:
          return _context.abrupt("return", res.status(201).send({
            message: 'Recieved!'
          }));

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.status(500).json({
            error: 'Internal Server Error \n 500'
          }));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 14]]);
});