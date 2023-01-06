"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const joinguild_1 = __importDefault(require("../lib/joinguild"));
const registercheck_1 = __importDefault(require("../lib/registercheck"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("join_guild")
        .setDMPermission(false)
        .setDescription("register your account to guild")
        .addStringOption(option => option.setName('guild').setDescription('select guild you want to join').setRequired(true).setAutocomplete(true)),
    execute: async (interaction) => {
        const check = await (0, registercheck_1.default)(interaction.user.id);
        if (!check)
            return await interaction.reply("you are not registered");
        interaction.deferReply();
        const name = String(interaction.options.get("guild")?.value);
        const bool = await (0, joinguild_1.default)(name, check);
        bool ? await new Promise(() => setTimeout(() => interaction.editReply(`you have joined guild ${name}`), 3000)) : await new Promise(() => setTimeout(() => interaction.editReply('join failed, make sure youre not in any guild'), 2000));
    },
    cooldown: 10
};
exports.default = command;
