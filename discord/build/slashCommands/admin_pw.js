"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const adminpw_1 = __importDefault(require("../lib/adminpw"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("mod_pass")
        .setDMPermission(false)
        .setDescription("change persons password if theyare unregistered")
        .addStringOption(option => option.setName('username').setDescription('Person Username').setRequired(true))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .addStringOption(option => option.setName('password').setDescription('Person New Pasword').setRequired(true)),
    execute: async (interaction) => {
        if (interaction.guild?.id !== "937230168223789066")
            return interaction.reply({ content: "you can only use this on rain server as admin there", ephemeral: true });
        const password = String(interaction.options.get("password")?.value);
        const username = String(interaction.options.get("username")?.value);
        const data = await (0, adminpw_1.default)(username, password);
        if (data) {
            interaction.reply({ content: "Password Successfully Changed", ephemeral: false });
        }
        else {
            interaction.reply({ content: "Error Changing Pasword Make Sure Username exist on database", ephemeral: true });
        }
    },
    cooldown: 10
};
exports.default = command;
