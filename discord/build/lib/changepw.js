"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const hash_1 = __importDefault(require("./crypto/hash"));
const prisma = new client_1.PrismaClient();
async function Adpw(did, password) {
    const discord = await prisma.discord.findFirst({ where: { discord_id: did }, select: { char_id: true } });
    if (discord === null) {
        await prisma.$disconnect();
        return false;
    }
    const char = await prisma.characters.findFirst({ where: { id: discord?.char_id }, select: { user_id: true } });
    const hash = await (0, hash_1.default)(password);
    await prisma.users.update({ where: { id: char?.user_id }, data: { password: hash } });
    await prisma.$disconnect();
    return true;
}
exports.default = Adpw;
