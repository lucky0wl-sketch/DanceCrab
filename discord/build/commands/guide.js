"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = __importDefault(require(".."));
const button = new discord_js_1.ActionRowBuilder()
    .addComponents(new discord_js_1.ButtonBuilder()
    .setLabel("Go to Guide Channel")
    .setURL(process.env.GAME_URL)
    .setStyle(discord_js_1.ButtonStyle.Link))
    .addComponents(new discord_js_1.ButtonBuilder()
    .setLabel("Go to Server News Channel")
    .setStyle(discord_js_1.ButtonStyle.Link)
    .setURL(process.env.NEWS_URL));
const command = {
    name: "guide",
    execute: async (message, args) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("Guide Channel")
            .setDescription("Is there something i could help?, we have prepared channel that might be help to you")
            .addFields({ name: "Bot Help Channel", value: `<#${process.env.NEWS_CHANNEL}> ` + "This channel have information on how to use bot and also have a list of bot command" }, { name: "Game Guide", value: `<#${process.env.GAME_CHANNEL}> ` + "This channel have general information about monster hunter frontier game provided by player, there might be guide that you seek" })
            .setColor('Random')
            .setFooter({ text: "I m sincerely sorry if this not what you after", iconURL: __1.default.user?.displayAvatarURL() });
        const oke = message.reference?.messageId;
        if (oke == null)
            return message.channel.send({ embeds: [embed], components: [button] });
        const msg = message.channel.messages.cache.get(oke);
        await msg?.reply({ embeds: [embed], components: [button] });
    },
    cooldown: 10,
    aliases: ["thisGuide"],
    permissions: []
};
exports.default = command;
