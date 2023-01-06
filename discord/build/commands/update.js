"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const update_1 = __importDefault(require("../lib/update"));
const command = {
    name: "update",
    execute: async (message, args) => {
        message.channel.send('trying to update guild prerender data');
        await (0, update_1.default)().catch(async (e) => message.channel.send(`error occured\n${e}`));
        message.channel.send('succesfully update prerender data');
    },
    cooldown: 10,
    aliases: ["sayupdate"],
    permissions: ["Administrator", discord_js_1.PermissionFlagsBits.ManageEmojisAndStickers]
};
exports.default = command;
