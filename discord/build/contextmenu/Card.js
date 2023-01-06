"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = __importDefault(require("../index"));
const registercheck_1 = __importDefault(require("../lib/registercheck"));
const char_embbed_1 = __importDefault(require("../lib/char_embbed"));
const command = {
    command: new discord_js_1.ContextMenuCommandBuilder()
        .setName("Card")
        .setType(discord_js_1.ApplicationCommandType.User),
    execute: async (interaction) => {
        if (!interaction.isUserContextMenuCommand())
            return;
        const uid = interaction.targetId;
        const disc = await (0, registercheck_1.default)(uid);
        if (!disc) {
            return interaction.reply({ content: `<@${uid}> arent registered yet\nright-click on your profile if what you mean is your own information`, allowedMentions: { parse: [] } });
        }
        let embed = await (0, char_embbed_1.default)(disc);
        if (!embed)
            return interaction.reply({ content: "error while connecting on server", ephemeral: true });
        const user = await index_1.default.users.fetch(uid);
        embed[0].setFooter({ text: `owned by ${user.username}`, iconURL: `${user.displayAvatarURL()}` });
        interaction.reply({ embeds: [embed[0]], files: [embed[1]] });
    }
};
exports.default = command;
