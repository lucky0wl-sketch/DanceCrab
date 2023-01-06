"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client_1 = require("@prisma/client");
const decrypt_1 = __importDefault(require("../lib/crypto/decrypt"));
const char_embbed_1 = __importDefault(require("../lib/char_embbed"));
const bind_1 = __importDefault(require("../lib/bind"));
const prisma = new client_1.PrismaClient();
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("bind")
        .setDMPermission(false)
        .setDescription("register your account to the discord")
        .addStringOption(option => option.setName('username').setDescription('Your username').setRequired(true))
        .addStringOption(option => option.setName('password').setDescription('Your password').setRequired(true)),
    execute: async (interaction) => {
        const username = String(interaction.options.get("username")?.value);
        const password = String(interaction.options.get("password")?.value);
        const discord = await prisma.discord.findUnique({ where: { discord_id: interaction.user.id }, select: { char_id: true } }).catch(e => console.log(e));
        const user = await prisma.users.findUnique({ where: { username: username }, select: { id: true, password: true } }).catch(e => console.log(e));
        if (discord !== null) {
            await prisma.$disconnect();
            return interaction.reply({ content: "you are already registered", ephemeral: true });
        }
        ;
        if (user === null) {
            await prisma.$disconnect();
            return interaction.reply({ content: "cant find username", ephemeral: true });
        }
        ;
        if (await (0, decrypt_1.default)(password, String(user?.password))) {
            const character = await prisma.characters.findMany({ where: { user_id: user?.id }, select: { id: true } });
            if (character.length == 0)
                return interaction.reply({ content: "you dont have any character, please make one on launcher", ephemeral: true });
            const embed = await (0, char_embbed_1.default)(Number(character[0].id));
            if (!embed)
                return interaction.reply({ content: "you still have *READY TO HUNT* character, please login with that character untill safely enter mezeporta then logout to be able to bind\nor delete that charachter in launcher", ephemeral: true });
            const row1 = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId(`male${interaction.user.id}`)
                .setLabel('Register as Male')
                .setStyle(discord_js_1.ButtonStyle.Primary));
            row1.addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId(`female${interaction.user.id}`)
                .setLabel('Register as Female')
                .setStyle(discord_js_1.ButtonStyle.Secondary));
            if (character.length > 1) {
                row1.addComponents(new discord_js_1.ButtonBuilder()
                    .setCustomId(`next${interaction.user.id}`)
                    .setLabel('Get next Character')
                    .setStyle(discord_js_1.ButtonStyle.Success));
            }
            interaction.reply({ components: [row1], embeds: [embed[0]], files: [embed[1]], ephemeral: true });
            if (!interaction.channel?.isTextBased())
                return;
            const collector = interaction.channel.createMessageComponentCollector({ componentType: discord_js_1.ComponentType.Button, time: 400000 });
            const role = await interaction.guild?.roles.fetch(process.env.REGISTERED_ROLE);
            let order = 0;
            collector.on('collect', async (i) => {
                console.log('test');
                console.log(i.customId);
                switch (i.customId) {
                    case `male${interaction.user.id}`: {
                        if (interaction.guild == null)
                            return;
                        const checker = await prisma.discord.findFirst({ where: { char_id: character[order].id }, select: { char_id: true } }).catch(e => console.log(e));
                        if (checker !== null) {
                            i.reply({ ephemeral: true, content: "that character already owned" });
                            break;
                        }
                        (0, bind_1.default)(interaction.user.id, Number(character[order].id), true);
                        i.reply({ content: "congrats you have registered now", ephemeral: true });
                        interaction.editReply({ components: [] });
                        collector.stop();
                        await prisma.$disconnect();
                        if (role == null)
                            break;
                        await (await interaction.guild.members.fetch(interaction.user.id)).roles.add(role);
                        break;
                    }
                    case `female${interaction.user.id}`: {
                        if (interaction.guild == null)
                            return;
                        const checker = await prisma.discord.findFirst({ where: { char_id: character[order].id }, select: { char_id: true } }).catch(e => console.log(e));
                        if (checker !== null) {
                            i.reply({ ephemeral: true, content: "that character already owned" });
                            break;
                        }
                        (0, bind_1.default)(interaction.user.id, Number(character[order].id), false);
                        i.reply({ content: "congrats you have registered now", ephemeral: true });
                        interaction.editReply({ components: [] });
                        collector.stop();
                        await prisma.$disconnect();
                        if (role == null)
                            break;
                        await (await interaction.guild.members.fetch(interaction.user.id)).roles.add(role);
                        break;
                    }
                    case `next${interaction.user.id}`: {
                        order += 1;
                        if (order >= character.length) {
                            order = 0;
                        }
                        const wembed = await (0, char_embbed_1.default)(character[order].id);
                        if (wembed) {
                            interaction.editReply({ embeds: [wembed[0]], files: [wembed[1]] });
                        }
                        else {
                            i.reply({ content: "you still have *READY TO HUNT* character, please login with that character untill safely enter mezeporta then logout to be able to bind\nor delete that charachter in launcher", ephemeral: true });
                            break;
                        }
                        i.reply({ content: "getting other character", ephemeral: true });
                        break;
                    }
                    default: {
                        break;
                    }
                }
            });
        }
        else {
            await prisma.$disconnect();
            return interaction.reply({ content: "pasword not match", ephemeral: true });
        }
    },
    cooldown: 10
};
exports.default = command;
