"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const prisma = new client_1.PrismaClient();
async function Custom(ids, type) {
    const file = (0, fs_1.readFileSync)(`./gacha_b/custom.bin`);
    let res = true;
    if (type === 2) {
        await Promise.all(ids.map(async (e) => {
            const disc = await prisma.discord.findUnique({ where: { discord_id: e }, select: { char_id: true } });
            await prisma.distribution.create({ data: { character_id: disc?.char_id, data: file, type: 1, bot: true, event_name: "Custom Gift", description: '~C05Custom Distribution Reward' } });
        })).catch(e => res = false);
    }
    else {
        await prisma.distribution.create({ data: { data: file, type: 1, bot: true, event_name: "Custom Gift", description: '~C05Custom Distribution Reward' } }).catch(e => res = false);
    }
    return res;
}
exports.default = Custom;
