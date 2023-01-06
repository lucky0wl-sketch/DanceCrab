"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const gachach_1 = __importDefault(require("../lib/gachach"));
const urlbuf_1 = __importDefault(require("../lib/urlbuf"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("ch_gacha")
        .setDMPermission(false)
        .setDescription("change gacha's event file")
        .addAttachmentOption(o => o.setName('json').setDescription('send gacha.json file').setRequired(true))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        if (interaction.guild?.id !== "937230168223789066")
            return interaction.reply({ content: "you can only use this on rain server as admin there", ephemeral: true });
        const json = String(interaction.options.get('json')?.attachment?.url);
        const data = await (0, urlbuf_1.default)(json);
        (0, fs_1.writeFileSync)('gacha/gacha.json', data);
        await interaction.reply({ content: "success adding config", ephemeral: true });
        let res = await (0, gachach_1.default)();
        if (!res)
            return interaction.followUp({ content: 'fail while parsing the config, either connection problem or wrong data', ephemeral: true });
        interaction.followUp({ content: 'success on implementing config', ephemeral: true });
    },
    cooldown: 10
};
exports.default = command;
