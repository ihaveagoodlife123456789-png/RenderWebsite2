"use strict";

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

var _authLogin = require("./serverRequests/authLogin.js");

var _authLogout = require("./serverRequests/authLogout.js");

var _profile = require("./serverRequests/profile.js");

var _display = require("./serverRequests/display.js");

var _createPost = require("./serverRequests/createPost.js");

var _authSignIn = require("./serverRequests/authSignIn.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: 'https://ascendedhorizons.com',
  credentials: true
}));
app.use(_express["default"].json()); //Frontend paths
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
//Cookies

var PostgresStore = (0, _connectPgSimple["default"])(_expressSession["default"]);
app.use((0, _expressSession["default"])({
  store: new PostgresStore({
    pool: _index.pool,
    tableName: 'session',
    createTableIfMissing: true
  }),
  secret: 'AXoawusxaqw',
  resave: false,
  saveUninitialized: false,
  name: 'some_cookies',
  cookie: {
    domain: 'ascendedhorizons.com',
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 15
  }
})); //Authentication

app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
});

_passport["default"].deserializeUser(function _callee(id, done) {
  var searchUser, _ref, rows;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          searchUser = "SELECT * FROM authenticate WHERE id = $1";
          _context.next = 4;
          return regeneratorRuntime.awrap(_index.pool.query(searchUser, [id]));

        case 4:
          _ref = _context.sent;
          rows = _ref.rows;

          if (!(rows.length === 0)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", done(null, false));

        case 8:
          done(null, rows[0]);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          done(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
});

_passport["default"].use(new _passportGoogleOauth.Strategy({
  clientID: '363158928557-hj2h07a0gk7t8mo1j9dsrl1tsj222oek.apps.googleusercontent.com',
  clientSecret: '363158928557-hj2h07a0gk7t8mo1j9dsrl1tsj222oek.apps.googleusercontent.com',
  callbackURL: 'https://ascendedhorizons.com'
}));

_passport["default"].use(new _passportLocal.Strategy(function _callee2(username, password, done) {
  var searchUser, _ref2, rows, isValid;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          searchUser = "SELECT * FROM authenticate WHERE username = $1";
          _context2.next = 4;
          return regeneratorRuntime.awrap(_index.pool.query(searchUser, [username.toLowerCase()]));

        case 4:
          _ref2 = _context2.sent;
          rows = _ref2.rows;

          if (!(rows.length === 0)) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", done(null, false, {
            message: 'Incorrect username.'
          }));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, rows[0].password));

        case 10:
          isValid = _context2.sent;

          if (isValid) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", done(null, false, {
            message: 'Incorrect password.'
          }));

        case 13:
          return _context2.abrupt("return", done(null, rows[0]));

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", done(_context2.t0));

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
})); //Module paths


app.use('/api/auth/login', _authLogin.authLoginRouter);
app.use('/api/auth/logout', _authLogout.authLogoutRouter);
app.use('/api/auth/signIn', _authSignIn.authSignIn);
app.use('/api/profile', _profile.AuthProfile);
app.use('/api/users', _display.display);
app.use('/api/create', _createPost.createPost); //Frontend renders

var distPath = _path["default"].join(__dirname, '../Frontend/dist');

app.use(_express["default"]["static"](distPath));
app.get(/.*/, function (req, res) {
  res.sendFile(_path["default"].join(distPath, 'index.html'));
});
var PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', function () {
  console.log("Server is running on port ".concat(PORT));
});
app.get('/api/profile', function (req, res) {
  console.log(req.session);
}); //npm install passport-google-oauth20 jsonwebtoken bcrypt cookie-parser express-session express-rate-limit dotenv
//363158928557-hj2h07a0gk7t8mo1j9dsrl1tsj222oek.apps.googleusercontent.com
//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