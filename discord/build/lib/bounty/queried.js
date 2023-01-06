"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Submitted(type, cname, uname, cid, team, avatar, url, bbq) {
    const wtf = await prisma.submitted.create({ data: { type_b: type, cid: cid, team: team, cname: cname, uname: uname, t_submit: Math.floor(new Date().getTime() / 1000), avatar: avatar, url_i: url, bbq: bbq } });
    const cd = await prisma.bounty.findFirst({ where: { title: bbq }, select: { cooldown: true } });
    await prisma.bounty.updateMany({ where: { title: bbq }, data: { cooldown: Number(cd?.cooldown) - 1 } });
    await prisma.$disconnect();
    return wtf.id;
}
exports.default = Submitted;
