"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const prisma = new client_1.PrismaClient();
const command = {
    name: "refresh",
    execute: async (message, args) => {
        const data = await prisma.bounty.findMany({ select: { title: true, cooldown: true }, orderBy: { title: 'asc' } });
        if (data == null)
            return;
        const json = JSON.stringify(data, null, 2);
        (0, fs_1.writeFileSync)('./prerender_data/refresh.json', json);
        message.channel.send('successfully updated to server and optimized');
    },
    cooldown: 10,
    aliases: ["sayhello"],
    permissions: ["Administrator", discord_js_1.PermissionFlagsBits.ManageEmojisAndStickers]
};
exports.default = command;
