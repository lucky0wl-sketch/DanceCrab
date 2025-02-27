"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const distribution_1 = __importDefault(require("../lib/bounty/distribution"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("distribution")
        .setDMPermission(false)
        .setDescription("distribute person their reward + bountycoin and ticket")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .addStringOption(o => o.setName('bounty').setDescription('pick category').setRequired(true).addChoices({ name: 'BBQ01', value: 'BBQ01' }, { name: 'BBQ02', value: 'BBQ02' }, { name: 'BBQ03', value: 'BBQ03' }, { name: 'BBQ04', value: 'BBQ04' }, { name: 'BBQ05', value: 'BBQ05' }, { name: 'BBQ06', value: 'BBQ06' }, { name: 'BBQ07', value: 'BBQ07' }, { name: 'BBQ08', value: 'BBQ08' }, { name: 'BBQ09', value: 'BBQ09' }, { name: 'BBQ10', value: 'BBQ10' }, { name: 'BBQ11', value: 'BBQ11' }, { name: 'BBQ12', value: 'BBQ12' }, { name: 'BBQ13', value: 'BBQ13' }, { name: 'BBQ14', value: 'BBQ14' }, { name: 'BBQ15', value: 'BBQ15' }, { name: 'BBQ16', value: 'BBQ16' }, { name: 'BBQ17', value: 'BBQ17' }, { name: 'BBQ18', value: 'BBQ18' }, { name: 'BBQ19', value: 'BBQ19' }, { name: 'BBQ20', value: 'BBQ20' }, { name: 'BBQ21', value: 'BBQ21' }, { name: 'BBQ22', value: 'BBQ22' }, { name: 'BBQ23', value: 'BBQ23' }, { name: 'SP', value: 'SP' }))
        .addNumberOption(o => o.setName('type').setDescription('type reward need to distribute').setRequired(true).addChoices({ name: 'Solo', value: 1 }, { name: 'Multiplayer', value: 2 }))
        .addStringOption(option => option.setName('mentions').setDescription('Mention One Or more Person').setRequired(true)),
    execute: async (interaction) => {
        const mentions = String(interaction.options.get("mentions")?.value);
        const bbq = String(interaction.options.get("bounty")?.value);
        const type = Number(interaction.options.get("type")?.value);
        const data = mentions.match(/<@!?([0-9]+)>/g);
        if (data === null) {
            interaction.reply({ content: "No mentions Detected", ephemeral: true });
            return;
        }
        interaction.reply({ content: 'task accepted, wait for a while', ephemeral: true });
        const ids = data?.map(e => String(e.match(/([0-9]+)/g)));
        console.log(data);
        const res = await (0, distribution_1.default)(ids, bbq, type);
        if (!res)
            await interaction.channel?.send('there is error connecting to server database');
        await Promise.all(ids.map(async (e) => {
            await interaction.channel?.send(`${bbq} distribution already sended <@${e}>`);
        }));
    },
    cooldown: 10
};
exports.default = command;
