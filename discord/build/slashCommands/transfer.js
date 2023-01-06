"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const registercheck_1 = __importDefault(require("../lib/registercheck"));
const savetransfer_1 = __importDefault(require("../lib/savetransfer"));
const __1 = __importDefault(require(".."));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("transfer")
        .setDMPermission(false)
        .setDescription("send your save data to server")
        .addAttachmentOption(option => option.setName('attachment1').setDescription('attach one of the formatted save data').setRequired(true))
        .addAttachmentOption(option => option.setName('attachment2').setDescription('attach one of the formatted save data').setRequired(false))
        .addAttachmentOption(option => option.setName('attachment3').setDescription('attach one of the formatted save data').setRequired(false))
        .addAttachmentOption(option => option.setName('attachment4').setDescription('attach one of the formatted save data').setRequired(false))
        .addAttachmentOption(option => option.setName('attachment5').setDescription('attach one of the formatted save data').setRequired(false))
        .addAttachmentOption(option => option.setName('attachment6').setDescription('attach one of the formatted save data').setRequired(false))
        .addAttachmentOption(option => option.setName('attachment7').setDescription('attach one of the formatted save data').setRequired(false))
        .addAttachmentOption(option => option.setName('attachment8').setDescription('attach one of the formatted save data').setRequired(false))
        .addAttachmentOption(option => option.setName('attachment9').setDescription('attach one of the formatted save data').setRequired(false))
        .addAttachmentOption(option => option.setName('attachment10').setDescription('attach one of the formatted save data').setRequired(false))
        .addAttachmentOption(option => option.setName('attachment11').setDescription('attach one of the formatted save data').setRequired(false)),
    execute: async (interaction) => {
        await interaction.reply({ content: "evaluating savefile you send\nmake sure youare loged out from game otherwise this will no effect", ephemeral: true });
        const listAttachment = [];
        const discord = await (0, registercheck_1.default)(interaction.user.id);
        if (!discord)
            return interaction.followUp({ content: "youare not registered", ephemeral: true });
        const channel = await __1.default.channels.fetch(process.env.TRANSVER_SAVE_LOG_CHANNEL);
        if (!channel?.isTextBased())
            return;
        for (let i = 1; i < 12; i++) {
            const attachment = interaction.options.get(`attachment${i}`)?.attachment;
            if (attachment !== undefined) {
                const res = await (0, savetransfer_1.default)(attachment.url, attachment.size, discord, attachment.name);
                if (res == "malicius") {
                    await interaction.followUp({ content: `${attachment.name} is malicius file`, ephemeral: true });
                }
                else if (res == "invalid") {
                    await interaction.followUp({ content: `${attachment.name} is invalid file format`, ephemeral: true });
                }
                else {
                    await interaction.followUp({ content: `${attachment.name} successfully transfered`, ephemeral: true });
                    await channel.send(`${interaction.user.username}#${interaction.user.discriminator} transfered ${attachment.name} to server`);
                }
            }
        }
    },
    cooldown: 5
};
exports.default = command;
