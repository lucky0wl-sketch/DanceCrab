"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const update_1 = __importDefault(require("../lib/update"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("update")
        .setDMPermission(false)
        .setDescription("scaffold rule message")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        if (interaction.guild?.id !== "937230168223789066")
            return interaction.reply({ content: "you can only use this on rain server as admin there", ephemeral: true });
        interaction.reply({ ephemeral: true, content: 'ok' });
        await (0, update_1.default)();
        interaction.followUp('successfully updated to server and optimized');
    },
    cooldown: 10
};
exports.default = command;
