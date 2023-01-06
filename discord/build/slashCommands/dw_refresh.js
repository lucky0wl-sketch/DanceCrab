"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("dw_refresh")
        .setDMPermission(false)
        .setDescription("download refresh's .json")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: interaction => {
        const data = new discord_js_1.AttachmentBuilder('./prerender_data/refresh.json');
        interaction.reply({ ephemeral: true, files: [data] });
    },
    cooldown: 10
};
exports.default = command;
