"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Write = exports.CheckAcc = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function CheckAcc(did) {
    let res = true;
    const checked = await prisma.discord_register.findUnique({ where: { discord_id: did } }).catch(e => { res = false; });
    if (checked == null)
        return false;
    await prisma.$disconnect();
    return checked;
}
exports.CheckAcc = CheckAcc;
async function Write(did, user) {
    let res = true;
    await prisma.discord_register.create({ data: { discord_id: did, user_id: user } }).catch(e => { res = false; });
    await prisma.$disconnect();
    return res;
}
exports.Write = Write;
