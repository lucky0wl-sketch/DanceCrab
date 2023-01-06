"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
let trans = async (did) => {
    const discord = await prisma.discord.findFirst({ where: { discord_id: did }, select: { char_id: true } }).catch(e => console.log(e));
    const buf = fs_1.default.readFileSync('./misc/skin_hist.bin');
    await prisma.characters.update({ where: { id: discord.char_id }, data: { skin_hist: buf } });
    await prisma.$disconnect();
};
exports.default = trans;
