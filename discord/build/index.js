"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const { Guilds, MessageContent, GuildMessages, GuildMembers } = discord_js_1.GatewayIntentBits;
const client = new discord_js_1.Client({ intents: [Guilds, MessageContent, GuildMessages, GuildMembers] });
const dotenv_1 = require("dotenv");
const fs_1 = require("fs");
const path_1 = require("path");
const console_1 = __importDefault(require("console"));
(0, dotenv_1.config)();
client.slashCommands = new discord_js_1.Collection();
client.commands = new discord_js_1.Collection();
client.cooldowns = new discord_js_1.Collection();
const handlersDir = (0, path_1.join)(__dirname, "./handlers");
(0, fs_1.readdirSync)(handlersDir).forEach(handler => {
    require(`${handlersDir}/${handler}`)(client);
});
// Caught Unhandled Errors
process.on('unhandledRejection', async (error) => {
    const ch = client.channels.cache.get(String(process.env.EROR_LOG_CHANNEL));
    if (ch?.isTextBased()) {
        ch.send(String(error.stack));
    }
    console_1.default.log(error);
});
client.login(process.env.TOKEN);
exports.default = client;
