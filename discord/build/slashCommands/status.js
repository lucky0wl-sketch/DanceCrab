"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const functions_1 = require("../functions");
const serverstatus_1 = __importDefault(require("../lib/serverstatus"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("status")
        .setDMPermission(false)
        .setDescription("Show Server Status on database")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        const status = await (0, serverstatus_1.default)();
        const embed = new discord_js_1.EmbedBuilder()
            .setAuthor({ name: 'Server Status' })
            .setDescription(`🧑‍🦰 Users : ${status.user} \n ⚔️ Characters: ${status.channel} \n 💳 Registered: ${status.registered}`)
            .setColor((0, functions_1.getThemeColor)('variable'));
        interaction.reply({ embeds: [embed] });
    },
    cooldown: 10
};
exports.default = command;
