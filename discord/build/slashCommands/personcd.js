"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const cooldown_1 = __importDefault(require("../lib/cooldown"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("resetcd")
        .setDMPermission(false)
        .setDescription("Reset persons cd to 0")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .addStringOption(option => option.setName('mentions').setDescription('Mention One Or more Person').setRequired(true)),
    execute: async (interaction) => {
        if (interaction.guild?.id !== "937230168223789066")
            return interaction.reply({ content: "you can only use this on rain server as admin there", ephemeral: true });
        const mentions = String(interaction.options.get("mentions")?.value);
        const data = mentions.match(/<@!?([0-9]+)>/g);
        if (data === null) {
            interaction.reply({ content: "No mentions Detected", ephemeral: true });
            return;
        }
        const ids = data?.map(e => String(e.match(/([0-9]+)/g)));
        const res = (0, cooldown_1.default)(ids);
        if (!res)
            return interaction.reply('error on server connection');
        interaction.reply(`${mentions}'cd succesfully reseted`);
    },
    cooldown: 10
};
exports.default = command;
