"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Rejected(id) {
    const bbq = await prisma.submitted.findUnique({ where: { id: id }, select: { bbq: true, cid: true, team: true, type_b: true } });
    const cd = await prisma.bounty.findFirst({ where: { title: bbq?.bbq }, select: { cooldown: true } });
    const disc = bbq?.type_b == 3 ? await prisma.discord.findFirst({ where: { char_id: JSON.parse(String(bbq.team))[0] }, select: { discord_id: true } }) : await prisma.discord.findFirst({ where: { char_id: bbq?.cid }, select: { discord_id: true } });
    await prisma.bounty.updateMany({ where: { title: bbq?.bbq }, data: { cooldown: Number(cd?.cooldown) + 1 } });
    await prisma.$disconnect();
    return disc?.discord_id;
}
exports.default = Rejected;
