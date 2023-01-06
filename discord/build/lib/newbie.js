"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const prisma = new client_1.PrismaClient();
async function Newbie(name, did) {
    const discord = await prisma.discord.findUnique({ where: { discord_id: did }, select: { newbie: true, char_id: true } });
    if (discord == null)
        return false;
    const char = await prisma.characters.findUnique({ where: { id: discord?.char_id }, select: { gr: true } });
    if (Number(char?.gr) > 200 && Number(char?.gr) <= 500 && discord.newbie) {
        await prisma.discord.update({ where: { discord_id: did }, data: { newbie: false } });
        const data = (0, fs_1.readFileSync)(`./bounty_b/${name}.bin`);
        await prisma.distribution.create({ data: { character_id: discord?.char_id, data: data, type: 1, bot: true, event_name: "Newbie Gift", description: `~C05${name} Newbie Reward` } });
        return true;
    }
    return false;
}
exports.default = Newbie;
