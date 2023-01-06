"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const registercheck_1 = __importDefault(require("../lib/registercheck"));
const boost_1 = __importDefault(require("../lib/boost"));
const command = {
    command: new discord_js_1.ContextMenuCommandBuilder()
        .setName("Boost")
        .setType(discord_js_1.ApplicationCommandType.User),
    execute: async (interaction) => {
        if (!interaction.isUserContextMenuCommand())
            return;
        const uid = interaction.targetUser;
        const disc = await (0, registercheck_1.default)(uid.id);
        if (!disc) {
            return interaction.reply({ content: `${uid} arent registered yet\nright-click on your profile if what you mean is your own information`, allowedMentions: { parse: [] } });
        }
        let embed = await (0, boost_1.default)(disc);
        embed.setFooter({ text: `owned by ${uid.username}`, iconURL: `${uid.displayAvatarURL()}` });
        interaction.reply({ embeds: [embed] });
    }
};
exports.default = command;
