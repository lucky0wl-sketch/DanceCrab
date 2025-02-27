"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const blogcreate_1 = __importDefault(require("../lib/blog/blogcreate"));
const title = new discord_js_1.TextInputBuilder().setCustomId('title').setStyle(discord_js_1.TextInputStyle.Short).setRequired(true).setLabel("Blog's Title");
const desc = new discord_js_1.TextInputBuilder().setCustomId('description').setStyle(discord_js_1.TextInputStyle.Paragraph).setRequired(true).setLabel("Blog's Body");
const row1 = new discord_js_1.ActionRowBuilder().addComponents(title);
const row2 = new discord_js_1.ActionRowBuilder().addComponents(desc);
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("blog")
        .setDMPermission(false)
        .setDescription("experimental discord's web blog")
        .addStringOption(o => o.setName('category').setDescription('pick category').setRequired(true).addChoices({ name: 'wtf', value: 'wtf' }, { name: 'wtf1', value: 'wf1' }, { name: 'wtf2', value: 'wtf2' }, { name: 'wtf3', value: 'wtf3' }))
        .addAttachmentOption(option => option.setName('thumbnail').setDescription('set thumbnail for your blog')),
    execute: async (interaction) => {
        const attachment = String(interaction.options.get('thumbnail')?.attachment?.url);
        const category = String(interaction.options.get('category')?.value);
        let modal = new discord_js_1.ModalBuilder().setCustomId(`blog${interaction.user.id}`).setTitle('Create New Blog');
        modal.setComponents(row1, row2);
        interaction.showModal(modal);
        const submitted = await interaction.awaitModalSubmit({ time: 400000, filter: i => i.user.id === interaction.user.id });
        if (submitted) {
            const title1 = submitted.fields.getTextInputValue('title');
            const blog = submitted.fields.getTextInputValue('description');
            const id = await (0, blogcreate_1.default)(attachment, category, title1, blog, interaction.user.username, interaction.user.displayAvatarURL());
            submitted.reply(`blog saved on id ${id}`);
        }
    },
    cooldown: 10
};
exports.default = command;
