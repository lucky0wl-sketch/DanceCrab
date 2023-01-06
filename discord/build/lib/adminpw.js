"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const hash_1 = __importDefault(require("./crypto/hash"));
const prisma = new client_1.PrismaClient();
async function Chpw(username, password) {
    const user = await prisma.users.findFirst({ where: { username: username }, select: { username: true } });
    if (user === null) {
        await prisma.$disconnect();
        return false;
    }
    const hash = await (0, hash_1.default)(password);
    await prisma.users.update({ where: { username: username }, data: { password: hash } });
    await prisma.$disconnect();
    return true;
}
exports.default = Chpw;
