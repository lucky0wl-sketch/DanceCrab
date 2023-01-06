"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client_1 = require("@prisma/client");
const index_1 = __importDefault(require("../../index"));
const fs_1 = require("fs");
const prisma = new client_1.PrismaClient();
async function Cooldown() {
    const bounty = await prisma.bounty.findMany({ select: { title: true, cooldown: true, explain: true }, orderBy: { title: 'asc' } });
    await prisma.$disconnect();
    let embed = new discord_js_1.EmbedBuilder()
        .setTitle("Cooldown Info")
        .setThumbnail(String(index_1.default.user?.displayAvatarURL()))
        .setColor('Random');
    bounty.map(e => {
        embed.addFields({ name: e.title, value: `${e.explain}\n available : ${e.cooldown}`, inline: true });
    });
    const data = String((0, fs_1.readFileSync)("./guild/guild.json"));
    const json = JSON.parse(data);
    for (let i = 0; i < json.partner.length; i++) {
        const ch = await index_1.default.channels.fetch(json.partner[i].cooldown_ch);
        if (ch?.isTextBased()) {
            const msg = await ch.messages.fetch(json.partner[i].cooldown_msg);
            msg.edit({ embeds: [embed] });
        }
    }
    return embed;
}
exports.default = Cooldown;
