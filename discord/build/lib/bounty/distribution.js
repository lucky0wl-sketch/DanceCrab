"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const prisma = new client_1.PrismaClient();
async function Distribution(ids, bbq, type) {
    const bounty = await prisma.bounty.findFirst({ where: { title: bbq } });
    const clear = type === 1 ? 'S' : 'M';
    const data = type === 1 ? 'Solo Reward' : 'Multiplayer Reward';
    const file = (0, fs_1.readFileSync)(`./bounty_b/${bbq}${clear}.bin`);
    let res = true;
    await Promise.all(ids.map(async (e) => {
        const disc = await prisma.discord.findUnique({ where: { discord_id: e } });
        if (type === 1) {
            await prisma.discord.update({ where: { discord_id: e }, data: { bounty: Number(disc?.bounty) + Number(bounty?.solo_point), gacha: Number(disc?.gacha) + Number(bounty?.solo_ticket) } });
        }
        else {
            await prisma.discord.update({ where: { discord_id: e }, data: { bounty: Number(disc?.bounty) + Number(bounty?.multi_point), gacha: Number(disc?.gacha) + Number(bounty?.multi_ticket) } });
        }
        await prisma.distribution.create({ data: { character_id: disc?.char_id, data: file, type: 1, bot: true, event_name: "Bounty Gift", description: `~C05${bbq} ${data}` } });
    })).catch(e => res = false);
    return res;
}
exports.default = Distribution;
