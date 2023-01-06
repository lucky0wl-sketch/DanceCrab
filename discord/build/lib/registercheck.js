"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Dcheck(discord_id) {
    const discord = await prisma.discord.findFirst({ where: { discord_id: discord_id }, select: { char_id: true } });
    if (discord === null) {
        await prisma.$disconnect();
        return false;
    }
    await prisma.$disconnect();
    return discord.char_id;
}
exports.default = Dcheck;
