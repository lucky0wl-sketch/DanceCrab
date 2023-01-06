"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const embed_1 = __importDefault(require("../lib/gacha/embed"));
const command = {
    command: new discord_js_1.ContextMenuCommandBuilder()
        .setName("Event")
        .setType(discord_js_1.ApplicationCommandType.User),
    execute: async (interaction) => {
        if (!interaction.isUserContextMenuCommand())
            return;
        const uid = interaction.targetUser;
        const disc = await (0, embed_1.default)(uid.id);
        if (!disc) {
            return interaction.reply({ content: `${uid} arent registered yet\nright-click on your profile if what you mean is your own information`, allowedMentions: { parse: [] } });
        }
        disc.setFooter({ text: `owned by ${uid.username}`, iconURL: `${uid.displayAvatarURL()}` });
        interaction.reply({ embeds: [disc] });
    }
};
exports.default = command;
