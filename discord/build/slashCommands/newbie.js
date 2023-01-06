"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const functions_1 = require("../functions");
const newbie_1 = __importDefault(require("../lib/newbie"));
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
    const row3 = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId(`c${user}`)
        .setStyle(discord_js_1.ButtonStyle.Success)
        .setLabel('Select This Reward'));
    return [row2, row3];
}
async function build_embed(data) {
    let embed = new discord_js_1.EmbedBuilder()
        .setAuthor({ name: `${data.name}` })
        .setColor((0, functions_1.getThemeColor)('error'))
        .setDescription('Newbie reward, can only redeem **once** in lifetime\nwe only give you material to craft listed equipment except the weapon')
        .setImage(data.image);
    return embed;
}
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("newbie")
        .setDMPermission(false)
        .setDescription("reward for newbie player"),
    execute: async (interaction) => {
        let state = 1;
        const data = [
            { name: 'BGM01', image: 'https://media.discordapp.net/attachments/963379709050224680/963384013031112735/Donru_BM.png' },
            { name: 'BGM02', image: 'https://media.discordapp.net/attachments/963379709050224680/963384757482295316/Donru_Lance.png' },
            { name: 'BGM03', image: 'https://media.discordapp.net/attachments/963379709050224680/963385440021385246/Donru_GS.png' },
            { name: 'BGM04', image: 'https://media.discordapp.net/attachments/963379709050224680/963386086866960384/Donru_LBG_HBG.png' },
            { name: 'BGM05', image: 'https://media.discordapp.net/attachments/963379709050224680/963386248523821056/Donru_Bow.png' },
            { name: 'BGM06', image: 'https://media.discordapp.net/attachments/963379709050224680/963387216636309565/Donru_HH_Support.png' },
        ];
        let button = build_button(data.length, state, interaction.user.id);
        let embed = await build_embed(data[state - 1]);
        interaction.reply({ embeds: [embed], components: button });
        if (!interaction.channel?.isTextBased())
            return;
        const collector = interaction.channel.createMessageComponentCollector({ componentType: discord_js_1.ComponentType.Button, time: 400000 });
        collector.on('collect', async (i) => {
            switch (i.customId) {
                case `p${interaction.user.id}`: {
                    state -= 1;
                    if (state <= 0) {
                        state = data.length;
                    }
                    ;
                    button = build_button(data.length, state, interaction.user.id);
                    embed = await build_embed(data[state - 1]);
                    await interaction.editReply({ embeds: [embed], components: button });
                    i.deferUpdate();
                    return;
                }
                case `n${interaction.user.id}`: {
                    state += 1;
                    if (state == data.length + 1) {
                        state = 1;
                    }
                    ;
                    button = build_button(data.length, state, interaction.user.id);
                    embed = await build_embed(data[state - 1]);
                    await interaction.editReply({ embeds: [embed], components: button });
                    i.deferUpdate();
                    return;
                }
                case `c${interaction.user.id}`: {
                    const res = await (0, newbie_1.default)(data[state - 1].name, interaction.user.id);
                    i.deferUpdate();
                    console.log(res);
                    await interaction.editReply({ components: [] });
                    if (!res) {
                        interaction.followUp({ ephemeral: true, content: 'command failed\n1. you might already claim once\n2. you need to be at range gr200-500\n3. connection to server timed out' });
                    }
                    else {
                        interaction.followUp('reward already distributed check it on game');
                    }
                    return;
                }
            }
        });
    },
    cooldown: 10
};
exports.default = command;
