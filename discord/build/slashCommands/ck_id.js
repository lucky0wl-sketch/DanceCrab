"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const discord_js_1 = require("discord.js");
const __1 = __importDefault(require(".."));
const prisma = new client_1.PrismaClient();
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("ck_id")
        .setDMPermission(false)
        .setDescription("show your hunter status")
        .addIntegerOption(o => o.setName('cid').setDescription('Charachter id').setRequired(true)),
    execute: async (interaction) => {
        if (interaction.guild?.id !== "937230168223789066")
            return interaction.reply({ content: "you can only use this on rain server as admin there", ephemeral: true });
        const id = Number(interaction.options.get('cid')?.value);
        const lib = await prisma.discord.findFirst({ where: { char_id: id }, select: { discord_id: true } }) ?? "not registered";
        const user = lib === "not registered" ? lib : await __1.default.users.fetch(lib.discord_id);
        interaction.reply({ content: `Its belong to ${user}` }).catch((e) => console.log(e));
        await prisma.$disconnect();
    },
    cooldown: 10
};
exports.default = command;
