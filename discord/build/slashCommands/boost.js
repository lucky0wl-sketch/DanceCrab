"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const registercheck_1 = __importDefault(require("../lib/registercheck"));
const boost_1 = __importDefault(require("../lib/boost"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("boost")
        .setDMPermission(false)
        .setDescription("show boost status"),
    execute: async (interaction) => {
        const disc = await (0, registercheck_1.default)(interaction.user.id);
        if (!disc)
            return interaction.reply("you are not registered");
        let embed = await (0, boost_1.default)(disc);
        embed.setFooter({ text: `owned by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.reply({ embeds: [embed] });
    },
    cooldown: 10
};
exports.default = command;
