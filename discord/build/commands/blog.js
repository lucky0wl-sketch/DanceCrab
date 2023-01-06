"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const prerender_1 = __importDefault(require("../lib/blog/prerender"));
const command = {
    name: "render",
    execute: async (message, args) => {
        await (0, prerender_1.default)();
        message.channel.send('successfully updated to server and optimized');
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: ["Administrator", discord_js_1.PermissionFlagsBits.ManageEmojisAndStickers]
};
exports.default = command;
