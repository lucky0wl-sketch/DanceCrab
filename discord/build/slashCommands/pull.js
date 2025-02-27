"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const pull_1 = __importDefault(require("../lib/gacha/pull"));
const urlbuf_1 = __importDefault(require("../lib/urlbuf"));
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("pull")
        .setDMPermission(false)
        .setDescription("change persons password if theyare unregistered")
        .addNumberOption(option => option.setName('pull').setDescription('Pull Methode').setRequired(true).addChoices({ name: "Single Pull", value: 1 }, { name: "Multi Pull", value: 10 })),
    execute: async (interaction) => {
        const pull = Number(interaction.options.get("pull")?.value);
        await interaction.deferReply();
        const result = await (0, pull_1.default)(interaction.user.id, pull);
        if (!result) {
            return await new Promise(() => setTimeout(() => interaction.editReply("Youare Not Registerd"), 2000));
        }
        else if (result === "not enough") {
            return await new Promise(() => setTimeout(() => interaction.editReply(result), 2000));
        }
        let wtf;
        if (pull == 1) {
            wtf = `${process.env.NEXTAUTH_URL}/api/og/single?avatar=${interaction.user.displayAvatarURL({ extension: 'png' })}&&rarity=${result.rarity}&&item=${result.item}`;
        }
        else {
            wtf = `${process.env.NEXTAUTH_URL}/api/og/multi?avatar=${interaction.user.displayAvatarURL({ extension: 'jpg' })}&&param=${JSON.stringify(result.query)}`;
        }
        const att = new discord_js_1.AttachmentBuilder(await (0, urlbuf_1.default)(wtf), { name: 'og.png' });
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("Congrats You got")
            .setDescription(` 🎰 Pity Count: ${result.pity}\n 🪙 Ticket : ${result.ticket}`)
            .setImage("attachment://og.png")
            .setColor('Random')
            .setFooter({ text: `Pulled by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
        await new Promise(r => setTimeout(r, 3000));
        interaction.editReply({ files: [att], embeds: [embed] });
    },
    cooldown: 10
};
exports.default = command;
