"use strict";
// Entry point of my application A  Book sharing application
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
let PORT = process.env.PORT || 5000;
// Basic route to handle root request 
app.get("/", (req, res) => {
    return res.status(200).send(Buffer.from("Hello welcome to scholib How was your day going "));
});
app.listen(PORT, () => {
    console.log(`scholib is listening on port ${PORT}`);
});
