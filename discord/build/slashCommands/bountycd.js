"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const cooldown_1 = require("../lib/cooldown");
const cooldown_2 = __importDefault(require("../lib/bounty/cooldown"));
const index_1 = __importDefault(require("../index"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("cooldown")
        .setDMPermission(false)
        .setDescription("change bounty cd")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .addStringOption(o => o.setName('bounty').setDescription('pick category').setRequired(true).addChoices({ name: 'BBQ01', value: 'BBQ01' }, { name: 'BBQ02', value: 'BBQ02' }, { name: 'BBQ03', value: 'BBQ03' }, { name: 'BBQ04', value: 'BBQ04' }, { name: 'BBQ05', value: 'BBQ05' }, { name: 'BBQ06', value: 'BBQ06' }, { name: 'BBQ07', value: 'BBQ07' }, { name: 'BBQ08', value: 'BBQ08' }, { name: 'BBQ09', value: 'BBQ09' }, { name: 'BBQ10', value: 'BBQ10' }, { name: 'BBQ11', value: 'BBQ11' }, { name: 'BBQ12', value: 'BBQ12' }, { name: 'BBQ13', value: 'BBQ13' }, { name: 'BBQ14', value: 'BBQ14' }, { name: 'BBQ15', value: 'BBQ15' }, { name: 'BBQ16', value: 'BBQ16' }, { name: 'BBQ17', value: 'BBQ17' }, { name: 'BBQ18', value: 'BBQ18' }, { name: 'BBQ19', value: 'BBQ19' }, { name: 'BBQ20', value: 'BBQ20' }, { name: 'BBQ21', value: 'BBQ21' }, { name: 'BBQ22', value: 'BBQ22' }, { name: 'BBQ23', value: 'BBQ23' }, { name: 'SP', value: 'SP' }))
        .addNumberOption(o => o.setName('value').setDescription('value of cd need to be changed').setRequired(true)),
    execute: async (interaction) => {
        if (interaction.guild?.id !== "937230168223789066")
            return interaction.reply({ content: "you can only use this on rain server as admin there", ephemeral: true });
        const bbq = String(interaction.options.get("bounty")?.value);
        const type = Number(interaction.options.get("value")?.value);
        const res = await (0, cooldown_1.Bcd)(bbq, type);
        if (!res) {
            return interaction.reply({ content: 'error while connecting to server', ephemeral: true });
        }
        interaction.reply('success');
        const cd = await index_1.default.channels.fetch(process.env.COOLDOWN_CHANNEL);
        if (!cd?.isTextBased())
            return;
        interaction.reply({ ephemeral: true, content: `${bbq}'s cooldown successfully changed to ${type}` });
        const msg1 = await cd.messages.fetch(process.env.COOLDOWN_MSG);
        msg1?.edit({ embeds: [await (0, cooldown_2.default)()] });
    },
    cooldown: 10
};
exports.default = command;
