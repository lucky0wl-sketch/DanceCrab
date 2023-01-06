"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
async function Decrypt(pass, hash) {
    return await bcrypt_1.default.compare(pass, hash);
}
exports.default = Decrypt;
