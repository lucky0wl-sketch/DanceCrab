"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const embed_1 = __importDefault(require("../lib/gacha/embed"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("event")
        .setDMPermission(false)
        .setDMPermission(false)
        .setDescription("show event status"),
    execute: async (interaction) => {
        const disc = await (0, embed_1.default)(interaction.user.id);
        if (!disc)
            return interaction.reply('you are not registered ');
        disc.setFooter({ text: `owned by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.reply({ embeds: [disc] });
    },
    cooldown: 10
};
exports.default = command;
