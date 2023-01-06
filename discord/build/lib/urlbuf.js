"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
async function getBuff(url) {
    return new Promise((resolve) => {
        url.startsWith('https') ? https_1.default.get(url, (response) => {
            const body = [];
            response
                .on('data', (chunk) => {
                body.push(chunk);
            })
                .on('end', () => {
                resolve(Buffer.concat(body));
            });
        }) : http_1.default.get(url, (response) => {
            const body = [];
            response
                .on('data', (chunk) => {
                body.push(chunk);
            })
                .on('end', () => {
                resolve(Buffer.concat(body));
            });
        });
    });
}
exports.default = getBuff;
