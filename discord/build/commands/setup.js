"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = __importDefault(require(".."));
const command = {
    name: "setup_bot",
    execute: (message, args) => {
        const idk = require('../handlers/Command');
        idk(__1.default);
        message.channel.send("application command re-applied to to all server");
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: ["Administrator", discord_js_1.PermissionFlagsBits.ManageEmojisAndStickers]
};
exports.default = command;
