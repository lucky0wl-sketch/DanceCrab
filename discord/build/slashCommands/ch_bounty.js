"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const bountych_1 = __importDefault(require("../lib/bountych"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("ch_bounty")
        .setDMPermission(false)
        .setDescription("Change Bounty Reward")
        .addStringOption(o => o.setName('bounty').setDescription('pick category').setRequired(true).addChoices({ name: 'BBQ01', value: 'BBQ01' }, { name: 'BBQ02', value: 'BBQ02' }, { name: 'BBQ03', value: 'BBQ03' }, { name: 'BBQ04', value: 'BBQ04' }, { name: 'BBQ05', value: 'BBQ05' }, { name: 'BBQ06', value: 'BBQ06' }, { name: 'BBQ07', value: 'BBQ07' }, { name: 'BBQ08', value: 'BBQ08' }, { name: 'BBQ09', value: 'BBQ09' }, { name: 'BBQ10', value: 'BBQ10' }, { name: 'BBQ11', value: 'BBQ11' }, { name: 'BBQ12', value: 'BBQ12' }, { name: 'BBQ13', value: 'BBQ13' }, { name: 'BBQ14', value: 'BBQ14' }, { name: 'BBQ15', value: 'BBQ15' }, { name: 'BBQ16', value: 'BBQ16' }, { name: 'BBQ17', value: 'BBQ17' }, { name: 'BBQ18', value: 'BBQ18' }, { name: 'BBQ19', value: 'BBQ19' }, { name: 'BBQ20', value: 'BBQ20' }, { name: 'BBQ21', value: 'BBQ21' }, { name: 'BBQ22', value: 'BBQ22' }, { name: 'BBQ23', value: 'BBQ23' }, { name: 'SP', value: 'SP' }))
        .addNumberOption(o => o.setName('type').setDescription('type of bounty need to change').setRequired(true).addChoices({ name: 'Solo', value: 1 }, { name: 'Multi', value: 2 }, { name: 'Both', value: 3 }))
        .addNumberOption(o => o.setName('distribution').setDescription('insert didtribution id as data input').setRequired(true))
        .addNumberOption(o => o.setName('gacha').setDescription('set gacha ticket need to be added'))
        .addNumberOption(o => o.setName('bountyc').setDescription('set bounty coin need to be added'))
        .addStringOption(o => o.setName('description').setDescription('set description'))
        .addAttachmentOption(option => option.setName('icon').setDescription('change bounty icon')),
    execute: async (interaction) => {
        if (interaction.guild?.id !== "937230168223789066")
            return interaction.reply({ content: "you can only use this on rain server as admin there", ephemeral: true });
        interaction.deferReply({ ephemeral: true });
        const attachment = interaction.options.get('icon')?.attachment?.url;
        const desccription = interaction.options.get('description')?.value;
        const gacha = interaction.options.get('gacha')?.value;
        const bounty = interaction.options.get('bountyc')?.value;
        const bbq = String(interaction.options.get('bounty')?.value);
        const type = Number(interaction.options.get('type')?.value);
        const distribution = Number(interaction.options.get('distribution')?.value);
        const res = (0, bountych_1.default)(type, bbq, bounty, gacha, distribution, attachment, desccription);
        if (!res)
            return interaction.editReply('There is error connection to server');
        interaction.editReply('success');
    },
    cooldown: 10
};
exports.default = command;
