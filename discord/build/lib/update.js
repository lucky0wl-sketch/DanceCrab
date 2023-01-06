"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const guild_1 = __importDefault(require("./guild"));
const fs_1 = require("fs");
const functions_1 = require("../functions");
async function Update() {
    console.log((0, functions_1.color)("text", "🕛 wait data to be prerendered"));
    const data = await (0, guild_1.default)();
    const json = JSON.stringify({ guild: data }, null, 2);
    (0, fs_1.writeFile)('./prerender_data/guild_data.json', json, (err) => {
        if (err)
            throw err;
        console.log((0, functions_1.color)("text", "📁 successfully write prerender data"));
    });
}
exports.default = Update;
