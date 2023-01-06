"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Glist() {
    const user = await prisma.guilds.findMany({ orderBy: { name: 'asc' }, select: { name: true } }).catch(e => console.log(e));
    var guild = user?.map(e => e.name);
    await prisma.$disconnect();
    return guild;
}
exports.default = Glist;
