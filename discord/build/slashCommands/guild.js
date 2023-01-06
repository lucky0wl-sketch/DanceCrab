"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const functions_1 = require("../functions");
const index_1 = __importDefault(require("../index"));
const fs_1 = require("fs");
function jsondata() {
    const raw = (0, fs_1.readFileSync)('./prerender_data/guild_data.json');
    return JSON.parse(String(raw));
}
function build_button(data, state, user) {
    let row2 = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId(`p${user}`)
        .setStyle(discord_js_1.ButtonStyle.Primary)
        .setEmoji('⬅️'));
    row2.addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId('gnum')
        .setLabel(`${state}/${data}`)
        .setStyle(discord_js_1.ButtonStyle.Secondary)
        .setDisabled(true));
    row2.addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId(`n${user}`)
        .setStyle(discord_js_1.ButtonStyle.Primary)
        .setEmoji('➡️'));
    return row2;
}
async function build_embed(data) {
    const disc = data.lead_discord === "Leader Not Registered" ? data.lead_discord : await index_1.default.users.fetch(data.lead_discord);
    let embed = new discord_js_1.EmbedBuilder()
        .setAuthor({ name: `${data.name}` })
        .setColor((0, functions_1.getThemeColor)("text"))
        .addFields({ name: "General Details", value: ` 🆔 Guild_id: ${data.id}\n 🏛️ Created: <t:${data.created}:R> \n 🧑‍🤝‍🧑 Member Count: ${data.member}/60 \n 🎖️ Rank Point : ${data.rp} \n 🏰 Level : ${data.level}` }, { name: "Leader Details", value: ` 🆔 Leader_id: ${data.lead_id}\n 🏷️ Leader Name: ${data.lead} \n 🎮 Leader Discord: ${String(disc)}` });
    if (disc !== "Leader Not Registered") {
        embed.setFooter({ text: `lead by ${disc.username}`, iconURL: `${disc.displayAvatarURL()}` });
    }
    return embed;
}
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("guild")
        .setDMPermission(false)
        .setDescription("Shows Server's Guild List"),
    execute: async (interaction) => {
        const data = jsondata().guild;
        let state = 1;
        let button = build_button(data.length, state, interaction.user.id);
        let embed = await build_embed(data[state - 1]);
        await interaction.reply({ embeds: [embed], components: [button] });
        if (!interaction.channel?.isTextBased())
            return;
        const collector = interaction.channel.createMessageComponentCollector({ componentType: discord_js_1.ComponentType.Button, time: 400000 });
        collector.on('collect', async (i) => {
            switch (i.customId) {
                case `p${interaction.user.id}`: {
                    state -= 1;
                    if (state == 0)
                        state = data.length;
                    button = build_button(data.length, state, interaction.user.id);
                    embed = await build_embed(data[state - 1]);
                    await interaction.editReply({ embeds: [embed], components: [button] });
                    await i.deferUpdate();
                    return;
                }
                case `n${interaction.user.id}`: {
                    state += 1;
                    if (state == data.length + 1)
                        state = 1;
                    button = build_button(data.length, state, interaction.user.id);
                    embed = await build_embed(data[state - 1]);
                    await interaction.editReply({ embeds: [embed], components: [button] });
                    await i.deferUpdate();
                    return;
                }
            }
        });
    },
    cooldown: 10
};
exports.default = command;
