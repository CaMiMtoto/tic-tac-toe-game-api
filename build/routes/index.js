"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GameService_1 = __importDefault(require("../services/GameService"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    let board = req.query.board;
    let results = (0, GameService_1.default)(board);
    return res.status(results.code).json(results.message);
});
exports.default = router;
