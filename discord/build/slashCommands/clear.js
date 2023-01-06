"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ClearCommand = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("clear")
        .setDMPermission(false)
        .setDescription("Delets messages from the current channel.")
        .addIntegerOption(option => {
        return option
            .setMaxValue(1000)
            .setMinValue(1)
            .setName("messagecount")
            .setDescription("Message amount to be cleared")
            .setRequired(true);
    })
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ManageMessages),
    execute: interaction => {
        let messageCount = Number(interaction.options.get("messagecount")?.value);
        interaction.channel?.messages.fetch({ limit: messageCount })
            .then(async (msgs) => {
            if (interaction.channel?.type === discord_js_1.ChannelType.DM)
                return;
            const deletedMessages = await interaction.channel?.bulkDelete(msgs, true);
            if (deletedMessages?.size === 0)
                interaction.reply("No messages were deleted.");
            else
                interaction.reply(`Successfully deleted ${deletedMessages?.size} message(s)`);
            setTimeout(() => interaction.deleteReply(), 5000);
        });
    },
    cooldown: 10,
};
exports.default = ClearCommand;
