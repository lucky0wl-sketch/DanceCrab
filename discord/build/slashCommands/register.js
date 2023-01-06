"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const register_1 = __importDefault(require("../lib/register"));
const registercheck_1 = __importDefault(require("../lib/registercheck"));
const reg_1 = require("../lib/reg_server/reg");
const __1 = __importDefault(require(".."));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("create")
        .setDMPermission(false)
        .setDescription("register new user to database")
        .addStringOption(option => option.setName('username').setDescription('Your username').setRequired(true))
        .addStringOption(option => option.setName('password').setDescription('Your password').setRequired(true)),
    execute: async (interaction) => {
        const res = await (0, registercheck_1.default)(interaction.user.id);
        if (res)
            return interaction.reply({ content: `you already have an account with charachter id ${res}`, ephemeral: true });
        const res2 = await (0, reg_1.CheckAcc)(interaction.user.id);
        if (res2)
            return interaction.reply({ content: `you already have an account with user id ${res2.user_id}`, ephemeral: true });
        const username = String(interaction.options.get("username")?.value);
        const password = String(interaction.options.get("password")?.value);
        const data = await (0, register_1.default)(username, password);
        if (!data)
            return interaction.reply({ content: `failed to interact with server try again after some minutes`, ephemeral: true });
        const ch = await __1.default.channels.fetch(process.env.USER_CREATE_LOG_CHANNEL);
        if (data) {
            interaction.reply({ content: "New Account Succesfully Created", ephemeral: true });
            if (ch?.isTextBased()) {
                ch.send(`${interaction.user.username}#${interaction.user.discriminator} created new account`);
            }
            await (0, reg_1.Write)(interaction.user.id, data);
        }
        else {
            interaction.reply({ content: "Username Already Exist", ephemeral: true });
        }
    },
    cooldown: 10
};
exports.default = command;
