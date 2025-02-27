"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Boost_off(did) {
    const char = await prisma.discord.findFirst({ where: { discord_id: did }, select: { char_id: true } });
    await prisma.login_boost_state.updateMany({ where: { char_id: char?.char_id }, data: { end_time: 1 } }).catch(e => console.log(e));
    await prisma.$disconnect();
}
exports.default = Boost_off;
