"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const char_embbed_1 = __importDefault(require("../lib/char_embbed"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("id")
        .setDMPermission(false)
        .setDescription("show your hunter status")
        .addIntegerOption(o => o.setName('cid').setDescription('Charachter id').setRequired(true)),
    execute: async (interaction) => {
        const id = Number(interaction.options.get('cid')?.value);
        let lib = await (0, char_embbed_1.default)(id);
        if (!lib)
            return interaction.reply({ content: "failed to connect database", ephemeral: true });
        interaction.reply({
            embeds: [lib[0]], files: [lib[1]]
        }).catch((e) => console.log(e));
    },
    cooldown: 10
};
exports.default = command;
