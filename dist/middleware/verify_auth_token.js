"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var verifyAuthToken = function (req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        var token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
        jsonwebtoken_1["default"].verify(token, TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json({
            error: "".concat(err)
        });
    }
};
exports["default"] = verifyAuthToken;
