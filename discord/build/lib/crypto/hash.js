"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
async function Hash(pass) {
    const hash = await bcrypt_1.default.hash(pass, saltRounds);
    return hash;
}
exports.default = Hash;
