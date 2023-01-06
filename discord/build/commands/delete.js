"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const rest = new discord_js_1.REST({ version: "10" }).setToken(process.env.TOKEN);
const command = {
    name: "delete",
    execute: (message, args) => {
        rest.put(discord_js_1.Routes.applicationGuildCommands(process.env.CLIENT_ID, String(message.guildId)), { body: [] })
            .catch(console.error);
        message.channel.send('Successfully deleted all application commands.');
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: ["Administrator", discord_js_1.PermissionFlagsBits.ManageEmojisAndStickers]
};
exports.default = command;
