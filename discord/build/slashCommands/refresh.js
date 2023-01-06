"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const refresh_1 = __importDefault(require("../lib/bounty/refresh"));
const cooldown_1 = __importDefault(require("../lib/bounty/cooldown"));
const __1 = __importDefault(require(".."));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("refresh")
        .setDMPermission(false)
        .setDescription("refresh bounty cd")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        if (interaction.guild?.id !== "937230168223789066")
            return interaction.reply({ content: "you can only use this on rain server as admin there", ephemeral: true });
        const res = await (0, refresh_1.default)();
        if (!res)
            return interaction.reply({ ephemeral: true, content: "error while connecting to server, try again after few minutes" });
        const cd = await __1.default.channels.fetch(process.env.COOLDOWN_CHANNEL);
        if (!cd?.isTextBased())
            return;
        interaction.reply({ ephemeral: true, content: "successfully refreshed" });
        const msg1 = await cd.messages.fetch(process.env.COOLDOWN_MSG);
        msg1?.edit({ embeds: [await (0, cooldown_1.default)()] });
    },
    cooldown: 10
};
exports.default = command;
