"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../../functions");
const index_1 = __importDefault(require("../../index"));
const discord_js_1 = require("discord.js");
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const prisma = new client_1.PrismaClient();
async function Leaderboard() {
    let lead = await prisma.discord.findMany({ select: { bounty: true, discord_id: true, char_id: true }, orderBy: { bounty: 'desc' }, where: { NOT: [{ bounty: null }] } });
    lead.slice(0, 10);
    const firstid = await prisma.characters.findUnique({ where: { id: lead[0].char_id }, select: { name: true } });
    let first = await index_1.default.users.fetch(lead[0].discord_id);
    let user = [first.username];
    let bounty = [lead[0].bounty];
    let embed = new discord_js_1.EmbedBuilder()
        .setTitle("Leaderboard")
        .setColor((0, functions_1.getThemeColor)('variable'))
        .setThumbnail(first.displayAvatarURL())
        .addFields({ name: user[0], value: ` 🗂️ Ign: ${firstid?.name}\n 🪙 Coin: ${lead[0].bounty}` })
        .setColor('Random');
    for (let i = 1; i < 9; i++) {
        const uname = await index_1.default.users.fetch(lead[i].discord_id);
        const char = await prisma.characters.findUnique({ where: { id: lead[i].char_id }, select: { name: true } });
        user.push(uname.username);
        bounty.push(lead[i].bounty);
        embed.addFields({ name: user[i], value: ` 🗂️ Ign: ${char?.name}\n 🪙 Coin: ${lead[i].bounty}` });
    }
    const data = String((0, fs_1.readFileSync)("./guild/guild.json"));
    const json = JSON.parse(data);
    for (let i = 0; i < json.partner.length; i++) {
        const ch = await index_1.default.channels.fetch(json.partner[i].leaderboard_ch);
        if (ch?.isTextBased()) {
            const msg = await ch.messages.fetch(json.partner[i].leaderboard_msg);
            msg.edit({ embeds: [embed] });
        }
    }
    await prisma.$disconnect();
    return { embed: embed };
}
exports.default = Leaderboard;
