"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command = {
    name: "tes",
    execute: async (message, args) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('tested');
        message.channel.send({ embeds: [embed] });
    },
    cooldown: 10,
    aliases: ["sayupdate"],
    permissions: ["Administrator", discord_js_1.PermissionFlagsBits.ManageEmojisAndStickers]
};
exports.default = command;
