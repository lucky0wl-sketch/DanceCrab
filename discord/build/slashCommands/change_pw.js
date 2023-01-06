"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const changepw_1 = __importDefault(require("../lib/changepw"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("change_password")
        .setDMPermission(false)
        .setDescription("register new user to database")
        .addStringOption(option => option.setName('password').setDescription('Your new password').setRequired(true)),
    execute: async (interaction) => {
        const password = String(interaction.options.get("password")?.value);
        const data = await (0, changepw_1.default)(interaction.user.id, password);
        if (data) {
            interaction.reply({ content: "Password Successfully Changed", ephemeral: true });
        }
        else {
            interaction.reply({ content: "Error Changing Pasword Make Sure Youare Registered", ephemeral: true });
        }
    },
    cooldown: 10
};
exports.default = command;
