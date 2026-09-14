"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authLoginRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authLoginRouter = _express["default"].Router();

exports.authLoginRouter = authLoginRouter;
authLoginRouter.post('/', function (req, res, next) {
  _passport["default"].authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: info.message
      });
    }

    req.logIn(user, function (err) {
      if (err) {
        return err;
      }

      return res.json({
        message: 'Logged in Successfully',
        user: user
      });
    });
  })(req, res, next);
});