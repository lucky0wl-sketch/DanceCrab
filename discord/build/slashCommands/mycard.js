"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const char_embbed_1 = __importDefault(require("../lib/char_embbed"));
const registercheck_1 = __importDefault(require("../lib/registercheck"));
const row1 = new discord_js_2.ActionRowBuilder()
    .addComponents(new discord_js_2.ButtonBuilder()
    .setCustomId('save')
    .setLabel('DM Save Data')
    .setStyle(discord_js_2.ButtonStyle.Primary));
row1.addComponents(new discord_js_2.ButtonBuilder()
    .setCustomId('transmog')
    .setLabel('Apply Transmog')
    .setStyle(discord_js_2.ButtonStyle.Primary));
const row2 = new discord_js_2.ActionRowBuilder()
    .addComponents(new discord_js_2.ButtonBuilder()
    .setCustomId('boost_on')
    .setLabel('Turn Login Boost On')
    .setStyle(discord_js_2.ButtonStyle.Secondary));
row2.addComponents(new discord_js_2.ButtonBuilder()
    .setCustomId('boost_off')
    .setLabel('Turn Login Boost Off')
    .setStyle(discord_js_2.ButtonStyle.Secondary));
const row3 = new discord_js_2.ActionRowBuilder()
    .addComponents(new discord_js_2.ButtonBuilder()
    .setCustomId('nothing')
    .setLabel('Do Nothing')
    .setStyle(discord_js_2.ButtonStyle.Danger));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("mycard")
        .setDMPermission(false)
        .setDescription("show your hunter status"),
    execute: async (interaction) => {
        const char = await (0, registercheck_1.default)(interaction.user.id);
        if (!char) {
            return interaction.reply("youare not registered");
        }
        let lib = await (0, char_embbed_1.default)(char);
        if (!lib)
            return interaction.reply({ content: "error on connecting to server database", ephemeral: true });
        lib[0].setFooter({ text: `owned by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.reply({
            embeds: [lib[0]], components: [row1, row2, row3], files: [lib[1]]
        }).catch((e) => console.log(e));
        await new Promise(() => setTimeout(() => interaction.editReply({ components: [] }), 90000));
    },
    cooldown: 10
};
exports.default = command;
