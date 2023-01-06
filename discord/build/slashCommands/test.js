"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const discord_js_1 = require("discord.js");
const joinguild_1 = require("../lib/joinguild");
const prisma = new client_1.PrismaClient();
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("test")
        .setDMPermission(false)
        .setDescription("dont use it")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        await interaction.reply("ok");
        const fix = await (0, joinguild_1.fixOrder)();
        if (!fix)
            return interaction.followUp("error");
        interaction.followUp("success");
    },
    cooldown: 10
};
exports.default = command;
