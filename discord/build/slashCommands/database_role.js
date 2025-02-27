"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const discord_js_1 = require("discord.js");
const prisma = new client_1.PrismaClient();
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("database_role")
        .setDMPermission(false)
        .setDescription("update player role based on database")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        if (interaction.guild?.id !== "937230168223789066")
            return interaction.reply({ content: "you can only use this on rain server as admin there", ephemeral: true });
        interaction.reply({ content: "ok begin to scan guild\nthis will take long time to iterate discord user and database data", ephemeral: true });
        const expert = await interaction.guild?.roles.fetch(process.env.EXPERT_ROLE);
        const master = await interaction.guild?.roles.fetch(process.env.MASTER_ROLE);
        const champion = await interaction.guild?.roles.fetch(process.env.CHAMPION_ROLE);
        const road = await interaction.guild?.roles.fetch(process.env.ROAD_ROLE);
        const demolizer = await interaction.guild?.roles.fetch(process.env.DEMOLIZER_ROLE);
        if (demolizer == null || road == null || champion == null || master == null || expert == null)
            return;
        try {
            const player = await prisma.discord.findMany({ select: { discord_id: true, rain_demolizer: true, road_champion: true, bounty_champion: true, bounty_master: true, bounty_expert: true } });
            prisma.$disconnect();
            await Promise.all(player.map(async (e) => {
                const member = await interaction.guild?.members.fetch(e.discord_id);
                if (!(member == null)) {
                    e.rain_demolizer && await member.roles.add(demolizer);
                    e.road_champion && await member.roles.add(road);
                    e.bounty_champion && await member.roles.add(champion);
                    e.bounty_master && await member.roles.add(master);
                    e.bounty_expert && await member.roles.add(expert);
                }
            }));
            interaction.followUp({ content: "success", ephemeral: true });
        }
        catch (e) {
            console.log(e);
            interaction.followUp({ content: "error on giving roles", ephemeral: true });
        }
    },
    cooldown: 10
};
exports.default = command;
