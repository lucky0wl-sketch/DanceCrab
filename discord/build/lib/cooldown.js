"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bcd = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Cooldown(ids) {
    let res = true;
    await Promise.all(ids.map(async (e) => {
        await prisma.discord.update({ where: { discord_id: e }, data: { latest_bounty_time: 0 } });
    })).catch(e => res = false);
    await prisma.$disconnect();
    return res;
}
exports.default = Cooldown;
const Bcd = async (bbq, value) => {
    let res = true;
    await prisma.bounty.updateMany({ where: { title: bbq }, data: { cooldown: value } }).catch(e => res = false);
    return res;
};
exports.Bcd = Bcd;
