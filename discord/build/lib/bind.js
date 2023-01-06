"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Bind(did, cid, gender) {
    await prisma.discord.create({ data: { discord_id: did, char_id: cid, is_male: gender, gacha: 100 } });
    await prisma.$disconnect();
}
exports.default = Bind;
