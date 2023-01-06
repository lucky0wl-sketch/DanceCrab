"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = __importDefault(require(".."));
const road_1 = __importDefault(require("../lib/road"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("road")
        .setDMPermission(false)
        .setDescription("see road leaderboard"),
    execute: async (interaction) => {
        const data = await (0, road_1.default)();
        if (!data)
            return interaction.reply({ content: 'there is a problem connecting to server', ephemeral: true });
        interaction.deferReply();
        const first = await __1.default.users.fetch(String(data[0].discord));
        let embed = new discord_js_1.EmbedBuilder()
            .setTitle('Road Leaderboar')
            .setFooter({ text: `I m the number one`, iconURL: first.displayAvatarURL() })
            .setColor('Aqua')
            .setThumbnail(String(__1.default.user?.displayAvatarURL()));
        for (let i = 0; i < data.length; i++) {
            const dc = await __1.default.users.fetch(String(data[i].discord));
            embed.addFields({ name: dc.username, value: `name : ${data[i].name}\nstage : ${data[i].stage}` });
        }
        interaction.editReply({ embeds: [embed] });
    },
    cooldown: 10
};
exports.default = command;
