"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const addbounty_1 = __importDefault(require("../lib/gacha/addbounty"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("add_bounty")
        .setDMPermission(false)
        .setDescription("add ticket to player, use negative number to substact instead")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .addNumberOption(o => o.setName('value').setDescription('value need to distributed').setRequired(true))
        .addNumberOption(o => o.setName('methode').setDescription('methode to for the task').setRequired(true).addChoices({ name: 'All people', value: 1 }, { name: 'Mentions People', value: 2 }))
        .addStringOption(option => option.setName('mentions').setDescription('Mention One Or more Person').setRequired(false)),
    execute: async (interaction) => {
        if (interaction.guild?.id !== "937230168223789066")
            return interaction.reply({ content: "you can only use this on rain server as admin there", ephemeral: true });
        const mentions = String(interaction.options.get("mentions")?.value);
        const value = Number(interaction.options.get("value")?.value);
        const methode = Number(interaction.options.get("methode")?.value);
        let ids;
        if (methode === 2) {
            const data = mentions.match(/<@!?([0-9]+)>/g);
            if (data === null) {
                return interaction.reply({ content: "No mentions Detected", ephemeral: true });
            }
            ids = data.map(e => String(e.match(/([0-9]+)/g)));
        }
        else {
            ids = ['none'];
        }
        interaction.reply({ content: 'task accepted, wait for a while', ephemeral: true });
        const res = await (0, addbounty_1.default)(methode, ids, value);
        if (!res) {
            return interaction.channel?.send('failed to connect to server database');
        }
        interaction.channel?.send('success');
    },
    cooldown: 10
};
exports.default = command;
