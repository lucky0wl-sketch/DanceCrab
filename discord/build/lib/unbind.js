"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Unbind(did) {
    await prisma.discord.delete({ where: { discord_id: did } });
    await prisma.$disconnect();
}
exports.default = Unbind;
