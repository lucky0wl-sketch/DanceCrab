"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = __importDefault(require("../index"));
const urlbuf_1 = __importDefault(require("../lib/urlbuf"));
const button = new discord_js_1.ActionRowBuilder()
    .addComponents(new discord_js_1.ButtonBuilder()
    .setURL(process.env.RULE_URL)
    .setLabel("Proceed")
    .setStyle(discord_js_1.ButtonStyle.Link));
const event = {
    name: 'guildMemberAdd',
    execute: async (member) => {
        if (member.guild.id !== "937230168223789066")
            return;
        const jch = await index_1.default.channels.fetch(process.env.JOIN_CHANNEL);
        if (!jch?.isTextBased())
            return;
        const url = JSON.stringify({ url: member.displayAvatarURL({ extension: 'png' }), name: member.user.username });
        const wtf = await (0, urlbuf_1.default)(`${process.env.NEXTAUTH_URL}/api/og/join?url=${url}`);
        const att = new discord_js_1.AttachmentBuilder(wtf, { name: "welcome.jpg" });
        await jch.send({ components: [button], files: [att], content: `Welcome ${member} to **RAIN SERVER** as ${member.guild.memberCount}th Member` });
    }
};
exports.default = event;
