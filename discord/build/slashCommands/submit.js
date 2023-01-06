"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const check_1 = require("../lib/bounty/check");
const embed_1 = require("../lib/bounty/embed");
const index_1 = __importDefault(require("../index"));
const queried_1 = __importDefault(require("../lib/bounty/queried"));
const cooldown_1 = __importDefault(require("../lib/bounty/cooldown"));
function B_build(id) {
    return new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId(`approve${id}`)
        .setLabel("approve")
        .setStyle(discord_js_1.ButtonStyle.Success)
        .setEmoji("👍")).addComponents(new discord_js_1.ButtonBuilder()
        .setCustomId(`nope${id}`)
        .setLabel('nope')
        .setStyle(discord_js_1.ButtonStyle.Danger)
        .setEmoji("👎"));
}
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("submit")
        .setDMPermission(false)
        .setDescription("submit your bounty for evaluation")
        .addStringOption(o => o.setName('bounty').setDescription('pick category').setRequired(true).addChoices({ name: 'BBQ01', value: 'BBQ01' }, { name: 'BBQ02', value: 'BBQ02' }, { name: 'BBQ03', value: 'BBQ03' }, { name: 'BBQ04', value: 'BBQ04' }, { name: 'BBQ05', value: 'BBQ05' }, { name: 'BBQ06', value: 'BBQ06' }, { name: 'BBQ07', value: 'BBQ07' }, { name: 'BBQ08', value: 'BBQ08' }, { name: 'BBQ09', value: 'BBQ09' }, { name: 'BBQ10', value: 'BBQ10' }, { name: 'BBQ11', value: 'BBQ11' }, { name: 'BBQ12', value: 'BBQ12' }, { name: 'BBQ13', value: 'BBQ13' }, { name: 'BBQ14', value: 'BBQ14' }, { name: 'BBQ15', value: 'BBQ15' }, { name: 'BBQ16', value: 'BBQ16' }, { name: 'BBQ17', value: 'BBQ17' }, { name: 'BBQ18', value: 'BBQ18' }, { name: 'BBQ19', value: 'BBQ19' }, { name: 'BBQ20', value: 'BBQ20' }, { name: 'BBQ21', value: 'BBQ21' }, { name: 'BBQ22', value: 'BBQ22' }, { name: 'BBQ23', value: 'BBQ23' }, { name: 'SP', value: 'SP' }))
        .addBooleanOption(o => o.setName('npc').setDescription('select true if youare with npc').setRequired(true))
        .addAttachmentOption(option => option.setName('prove').setDescription('send proove of your quest').setRequired(true))
        .addStringOption(o => o.setName('mentions').setDescription('dont fill this if youare solo, fill with mentions if multi')),
    execute: async (interaction) => {
        const guild = await index_1.default.guilds.fetch("937230168223789066");
        try {
            await guild.members.fetch(interaction.user.id);
        }
        catch (e) {
            return interaction.reply("you need to become member of rain server to participate bounty");
        }
        const attachment = String(interaction.options.get('prove', true).attachment?.url);
        const bbq = String(interaction.options.get('bounty', true).value);
        const mentions = interaction.options.get('mentions')?.value;
        const npc = Boolean(interaction.options.get('npc', true).value);
        const ch = await index_1.default.channels.fetch(process.env.SUBMIT_CHANNEL);
        if (mentions == null) {
            const checked = await (0, check_1.Scheck)(interaction.user.id, bbq).catch(e => {
                interaction.reply("There is some problem connecting to server, please try again after some minutes");
            });
            if (!checked) {
                return await interaction.reply({ content: "you are not registered yet", ephemeral: true });
            }
            if (checked === 'Cooldown') {
                return await interaction.reply({ content: "BBQ on Cooldown", ephemeral: true });
            }
            else if (checked === 'overheat') {
                return await interaction.reply({ content: "you are still on cooldown", ephemeral: true });
            }
            await interaction.deferReply();
            try {
                let embed;
                let button;
                if (npc) {
                    embed = (0, embed_1.Nembed)(checked.cname, interaction.user.username, attachment, bbq, interaction.user.displayAvatarURL());
                    button = B_build(await (0, queried_1.default)(1, checked.cname, interaction.user.username, checked.cid, 'none', interaction.user.displayAvatarURL(), attachment, bbq));
                }
                else {
                    embed = (0, embed_1.Sembed)(checked.cname, interaction.user.username, attachment, bbq, interaction.user.displayAvatarURL());
                    button = B_build(await (0, queried_1.default)(1, checked.cname, interaction.user.username, checked.cid, 'none', interaction.user.displayAvatarURL(), attachment, bbq));
                }
                if (!ch?.isTextBased())
                    return;
                await ch.send({ embeds: [embed.embed], files: [embed.attach], components: [button] });
                await new Promise(r => setTimeout(r, 3000));
                interaction.editReply("Bounty Submitted");
                const cd = await index_1.default.channels.fetch(process.env.COOLDOWN_CHANNEL);
                if (!cd?.isTextBased())
                    return;
                const msg1 = await cd.messages.fetch(process.env.COOLDOWN_MSG);
                msg1?.edit({ embeds: [await (0, cooldown_1.default)()] });
            }
            catch (e) {
                await new Promise(r => setTimeout(r, 3000));
                interaction.editReply("There is some problem connecting to server, please try again after some minutes");
            }
        }
        else {
            const data = String(mentions).match(/<@!?([0-9]+)>/g);
            if (data === null) {
                return interaction.reply({ content: "No mentions Detected", ephemeral: true });
            }
            const ids = data.map(e => e.match(/([0-9]+)/g));
            const checked = await (0, check_1.Mcheck)(interaction.user.id, ids, bbq).catch(e => {
                interaction.reply("There is some problem connecting to server, please try again after some minutes");
            });
            if (!checked) {
                return await interaction.reply("there is member thats not registered yet");
            }
            else if (checked === 'Cooldown') {
                return await interaction.reply({ content: "BBQ on Cooldown", ephemeral: true });
            }
            else if (checked === 'overheat') {
                return await interaction.reply({ content: "there is member on bounty cooldown", ephemeral: false });
            }
            await interaction.deferReply();
            try {
                let uname = checked.data;
                let chname = uname.map(e => {
                    const name = index_1.default.users.cache.get(e);
                    if (name == null) {
                        return 'none';
                    }
                    else {
                        return name.username;
                    }
                });
                let embed = (0, embed_1.Membed)(checked.cname, chname, attachment, bbq, interaction.user.displayAvatarURL());
                let button = B_build(await (0, queried_1.default)(3, JSON.stringify(checked.cname), JSON.stringify(chname), 0, JSON.stringify(checked.cid), interaction.user.displayAvatarURL(), attachment, bbq));
                if (!ch?.isTextBased())
                    return;
                await ch.send({ embeds: [embed.embed], files: [embed.attach], components: [button] });
                await new Promise(r => setTimeout(r, 3000));
                await interaction.editReply("Bounty Submitted");
                const cd = await index_1.default.channels.fetch(process.env.COOLDOWN_CHANNEL);
                if (!cd?.isTextBased())
                    return;
                const msg1 = await cd.messages.fetch(process.env.COOLDOWN_MSG);
                msg1?.edit({ embeds: [await (0, cooldown_1.default)()] });
            }
            catch {
                await new Promise(r => setTimeout(r, 3000));
                interaction.editReply("There is some problem connecting to server, please try again after some minutes");
            }
        }
    },
    cooldown: 10
};
exports.default = command;
