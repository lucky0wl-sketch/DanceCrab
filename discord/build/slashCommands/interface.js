"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const buttonSave = new discord_js_1.ActionRowBuilder()
    .addComponents(new discord_js_1.ButtonBuilder()
    .setLabel("DM Save")
    .setCustomId("save2")
    .setStyle(discord_js_1.ButtonStyle.Primary)
    .setEmoji("💝")).addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId("import")
    .setLabel("Transfer Savefile")
    .setStyle(discord_js_1.ButtonStyle.Secondary)
    .setEmoji("👼"));
const buttonReg = new discord_js_1.ActionRowBuilder()
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId("create")
    .setLabel("Create New Account")
    .setStyle(discord_js_1.ButtonStyle.Success)
    .setEmoji("🆕")).addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId("bind")
    .setLabel("Bind Your Account")
    .setStyle(discord_js_1.ButtonStyle.Primary)
    .setEmoji("🎀"));
const buttonBoost = new discord_js_1.ActionRowBuilder()
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId("boost_on2")
    .setLabel("Turn on Login Boost")
    .setStyle(discord_js_1.ButtonStyle.Danger)
    .setEmoji("🤡")).addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId("boost_off2")
    .setLabel("Turn off Login Boost")
    .setStyle(discord_js_1.ButtonStyle.Primary)
    .setEmoji("💪"));
const buttonTransmog = new discord_js_1.ActionRowBuilder()
    .addComponents(new discord_js_1.ButtonBuilder()
    .setCustomId("transmog2")
    .setLabel("Get Transmog")
    .setStyle(discord_js_1.ButtonStyle.Success)
    .setEmoji("💸"));
const embed = new discord_js_1.EmbedBuilder()
    .setTitle("Rain Server MHFZ Game Interface")
    .setColor('Aqua')
    .setDescription("As alternatif to using command you can use this button bellow as sortcut");
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("interface")
        .setDMPermission(false)
        .setDescription("Show bot alternative interface")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: interaction => {
        interaction.reply({ embeds: [embed], components: [buttonReg, buttonSave, buttonBoost, buttonTransmog] });
    },
    cooldown: 10
};
exports.default = command;
