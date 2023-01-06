"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const functions_1 = require("../functions");
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("ping")
        .setDMPermission(false)
        .setDescription("Shows the bot's ping")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: interaction => {
        interaction.reply({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setAuthor({ name: `${interaction.client.user?.username}` })
                    .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`)
                    .setColor((0, functions_1.getThemeColor)("text"))
            ]
        });
    },
    cooldown: 10
};
exports.default = command;
