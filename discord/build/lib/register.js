"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const hash_1 = __importDefault(require("./crypto/hash"));
const prisma = new client_1.PrismaClient();
async function Regis(username, password) {
    const user = await prisma.users.findFirst({ where: { username: username }, select: { id: true } });
    if (user !== null) {
        await prisma.$disconnect();
        return false;
    }
    const hash = await (0, hash_1.default)(password);
    const date = new Date(new Date().getTime() - 30 * 60 * 60);
    const res = await prisma.users.create({ data: { username: username, password: hash, return_expires: date } });
    await prisma.$disconnect();
    return res.id;
}
exports.default = Regis;
