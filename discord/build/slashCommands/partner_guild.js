"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("partner")
        .setDescription("Change Bounty Reward")
        .setDMPermission(false)
        .addStringOption(o => o.setName('cooldown').setDescription('Enter bot Coodlown message id').setRequired(true))
        .addStringOption(o => o.setName('leader').setDescription('Enter bot Leaderboard messageg id').setRequired(true))
        .addStringOption(o => o.setName('cd_channel').setDescription('Enter Coodlown channel id').setRequired(true))
        .addStringOption(o => o.setName('ld_channel').setDescription('Enter Leaderboard channel id').setRequired(true))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        const cooldown = String(interaction.options.get('cooldown')?.value);
        const leader = String(interaction.options.get('leader')?.value);
        const cd_ch = String(interaction.options.get('cd_channel')?.value);
        const ld_ch = String(interaction.options.get('ld_channel')?.value);
        const raw = String((0, fs_1.readFileSync)('./guild/guild.json'));
        let data = JSON.parse(raw);
        const res = data.partner.filter(e => e.guild_id == interaction.guild?.id);
        if (res.length === 1) {
            interaction.reply({ content: "editing your guild config", ephemeral: true });
            const json = data.partner.map(e => {
                if (e.guild_id == interaction.guildId) {
                    e.cooldown_msg = cooldown;
                    e.leaderboard_msg = leader;
                    e.cooldown_ch = cd_ch;
                    e.leaderboard_ch = ld_ch;
                    return e;
                }
                return e;
            });
            const json_data = JSON.stringify({ partner: json }, null, 2);
            (0, fs_1.writeFile)('./guild/guild.json', json_data, (err) => {
                if (err)
                    throw err;
            });
        }
        else if (res.length === 0) {
            interaction.reply({ content: "registering your guild as partner", ephemeral: true });
            const json = { guild_id: String(interaction.guildId), cooldown_msg: cooldown, leaderboard_msg: leader, cooldown_ch: cd_ch, leaderboard_ch: ld_ch };
            data.partner.push(json);
            const json_data = JSON.stringify(data, null, 2);
            (0, fs_1.writeFile)('./guild/guild.json', json_data, (err) => {
                if (err)
                    throw err;
            });
        }
        else {
            return interaction.reply({ content: "there is duplicate on your guild data, please contact rain server admin to solve it", ephemeral: true });
        }
    },
    cooldown: 10
};
exports.default = command;
