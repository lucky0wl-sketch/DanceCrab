"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const buy_1 = __importDefault(require("../lib/gacha/buy"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("buy_ticket")
        .setDMPermission(false)
        .setDescription("buy gacha ticket")
        .addNumberOption(o => o.setName('value').setDescription('value need of ticket buy').setRequired(true)),
    execute: async (interaction) => {
        const value = Number(interaction.options.get("value")?.value);
        const res = await (0, buy_1.default)(value, interaction.user.id);
        if (!res)
            return interaction.reply("youare not registered");
        if (res == "not enough")
            return interaction.reply("you dont have enough bounty coin to buy");
        interaction.reply("successfully bought ticket");
    },
    cooldown: 10
};
exports.default = command;
