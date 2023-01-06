"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const urlbuf_1 = __importDefault(require("../lib/urlbuf"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("ch_refresh")
        .setDMPermission(false)
        .setDescription("change refresh behavior file")
        .addAttachmentOption(o => o.setName('json').setDescription('send gacha.json file').setRequired(true))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        if (interaction.guild?.id !== "937230168223789066")
            return interaction.reply({ content: "you can only use this on rain server as admin there", ephemeral: true });
        const json = String(interaction.options.get('json')?.attachment?.url);
        const data = await (0, urlbuf_1.default)(json);
        (0, fs_1.writeFileSync)('prerender_data/refresh.json', data);
        interaction.reply({ content: "success adding config", ephemeral: true });
    },
    cooldown: 10
};
exports.default = command;
