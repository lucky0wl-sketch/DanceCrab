"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const functions_1 = require("../functions");
const index_1 = __importDefault(require("../index"));
const event = {
    name: 'guildMemberRemove',
    execute: async (member) => {
        if (member.guild.id !== "937230168223789066")
            return;
        const role = member.roles.cache;
        const embed = new discord_js_1.EmbedBuilder().setThumbnail(member.displayAvatarURL()).setTitle("Member Leave").setDescription(member.toString()).setColor((0, functions_1.getThemeColor)('data')).addFields({ name: "Joined Since", value: `<t:${Math.floor(Number(member.joinedTimestamp) / 1000)}:R>` }, { name: "Roles", value: `${role?.map(e => e.toString() + "\n")}` }, { name: "Member Count", value: `${member.guild.memberCount}` });
        const chan = await index_1.default.channels.fetch(process.env.LEAVE_CHANNEL);
        chan?.isTextBased() ? chan.send({ embeds: [embed] }) : null;
    }
};
exports.default = event;
