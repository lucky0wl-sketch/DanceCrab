"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Embed(did) {
    const discord = await prisma.discord.findUnique({ where: { discord_id: did }, select: { gacha: true, bounty: true, latest_bounty: true, latest_bounty_time: true } });
    if (discord == null)
        return false;
    await prisma.$disconnect();
    const now = Math.floor(new Date().getTime() / 1000);
    const clear = discord.latest_bounty_time !== 0 ? `<t:${discord.latest_bounty_time}:R>` : 'Not Cleared';
    const different = discord.latest_bounty_time + 20 * 60 * 60 > now ? `<t:${discord.latest_bounty_time + 20 * 60 * 60}:R>` : 'you can do it now';
    const same = discord.latest_bounty_time + 40 * 60 * 60 > now ? `<t:${discord.latest_bounty_time + 40 * 60 * 60}:R>` : 'you can do it now';
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle('my event status')
        .setColor('Random')
        .setDescription(` 🪙 Bounty Coin : ${discord?.bounty}\n 🎫 Gacha Ticket : ${discord?.gacha}\n ⚔️ Latest Bounty : ${discord?.latest_bounty}\n ⏲️ Time Completed: ${clear}\n 👨‍🌾 Different Bounty CD : ${different} \n 👩‍🌾 Same Bounty CD : ${same}`);
    return embed;
}
exports.default = Embed;
