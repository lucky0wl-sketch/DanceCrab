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
    command: new discord_js_1.ContextMenuCommandBuilder()
        .setName("Submit")
        .setType(discord_js_1.ApplicationCommandType.Message),
    execute: async (interaction) => {
        const guild = await index_1.default.guilds.fetch("937230168223789066");
        try {
            await guild.members.fetch(interaction.user.id);
        }
        catch (e) {
            return interaction.reply("you need to become member of rain server to participate bounty");
        }
        if (!interaction.isMessageContextMenuCommand())
            return interaction.reply({ content: "error", ephemeral: true });
        const msg = interaction.targetMessage;
        if (interaction.user.id !== msg.author.id)
            return interaction.reply({ content: "its not your own message", ephemeral: true });
        const attachment = msg.attachments.first()?.url;
        if (attachment == null)
            return interaction.reply({ content: "there is no attachment", ephemeral: true });
        let row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.SelectMenuBuilder()
            .setCustomId(`${interaction.user.id}bbq`)
            .setPlaceholder('Select BBQ')
            .setMaxValues(1)
            .setMinValues(1)
            .addOptions({ label: 'BBQ01', value: 'BBQ01' }, { label: 'BBQ02', value: 'BBQ02' }, { label: 'BBQ03', value: 'BBQ03' }, { label: 'BBQ04', value: 'BBQ04' }, { label: 'BBQ05', value: 'BBQ05' }, { label: 'BBQ06', value: 'BBQ06' }, { label: 'BBQ07', value: 'BBQ07' }, { label: 'BBQ08', value: 'BBQ08' }, { label: 'BBQ09', value: 'BBQ09' }, { label: 'BBQ10', value: 'BBQ10' }, { label: 'BBQ11', value: 'BBQ11' }, { label: 'BBQ12', value: 'BBQ12' }, { label: 'BBQ13', value: 'BBQ13' }, { label: 'BBQ14', value: 'BBQ14' }, { label: 'BBQ15', value: 'BBQ15' }, { label: 'BBQ16', value: 'BBQ16' }, { label: 'BBQ17', value: 'BBQ17' }, { label: 'BBQ18', value: 'BBQ18' }, { label: 'BBQ19', value: 'BBQ19' }, { label: 'BBQ20', value: 'BBQ20' }, { label: 'BBQ21', value: 'BBQ21' }, { label: 'BBQ22', value: 'BBQ22' }, { label: 'BBQ23', value: 'BBQ23' }, { label: 'SP', value: 'SP' }));
        let row1 = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.SelectMenuBuilder()
            .setCustomId(`${interaction.user.id}value`)
            .setPlaceholder('Select Methode')
            .setMaxValues(1)
            .setMinValues(1)
            .addOptions({ label: 'Solo', value: "S" }, { label: 'Solo With Npc', value: "N" }, { label: 'Multiplier', value: "M" }));
        interaction.reply({ components: [row, row1] });
        if (!interaction.channel?.isTextBased())
            return;
        const collector = interaction.channel.createMessageComponentCollector({ componentType: discord_js_1.ComponentType.SelectMenu, time: 400000 });
        let bbq;
        let methode;
        collector.on('collect', async (i) => {
            if (i.user.id == interaction.user.id) {
                if (i.customId == `${interaction.user.id}bbq`) {
                    bbq = i.values[0];
                    if (methode != null) {
                        collector.stop();
                    }
                    i.deferUpdate();
                    row.components[0].setDisabled(true);
                    interaction.editReply({ components: [row, row1] });
                }
                else if (i.customId == `${interaction.user.id}value`) {
                    methode = i.values[0];
                    if (bbq != null) {
                        collector.stop();
                    }
                    i.deferUpdate();
                    row1.components[0].setDisabled(true);
                    interaction.editReply({ components: [row, row1] });
                }
            }
            else {
                i.reply({ content: "this select menu isnt for you to mess with", ephemeral: true });
            }
        });
        collector.on('end', async () => {
            interaction.followUp({ content: "evaluating your submission, wait for a while", ephemeral: true });
            const ch = await index_1.default.channels.fetch(process.env.SUBMIT_CHANNEL);
            if (!ch?.isTextBased())
                return;
            if (methode == "S" || methode == "N") {
                const checked = await (0, check_1.Scheck)(interaction.user.id, bbq).catch(e => {
                    interaction.followUp("There is some problem connecting to server, please try again after some minutes");
                });
                if (!checked) {
                    interaction.followUp({ content: "you are not registered yet", ephemeral: true });
                    return;
                }
                if (checked === 'Cooldown') {
                    interaction.followUp({ content: "BBQ on Cooldown", ephemeral: true });
                    return;
                }
                else if (checked === 'overheat') {
                    interaction.followUp({ content: "you are still on cooldown", ephemeral: true });
                    return;
                }
                try {
                    let embed;
                    let button;
                    if (methode == "N") {
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
                    await interaction.followUp("Bounty Submitted");
                    const cd = await index_1.default.channels.fetch(process.env.COOLDOWN_CHANNEL);
                    if (!cd?.isTextBased())
                        return;
                    const msg1 = await cd.messages.fetch(process.env.COOLDOWN_MSG);
                    msg1?.edit({ embeds: [await (0, cooldown_1.default)()] });
                }
                catch (e) {
                    interaction.followUp("There is some problem connecting to server, please try again after some minutes");
                }
            }
            else {
                const content = msg.content;
                const data = content.match(/<@!?([0-9]+)>/g);
                if (data === null) {
                    interaction.followUp({ content: "No mentions Detected", ephemeral: true });
                    return;
                }
                const ids = data.map(e => e.match(/([0-9]+)/g));
                const checked = await (0, check_1.Mcheck)(interaction.user.id, ids, bbq).catch(e => {
                    interaction.followUp("There is some problem connecting to server, please try again after some minutes");
                });
                if (!checked) {
                    interaction.followUp("there is member thats not registered yet");
                    return;
                }
                else if (checked === 'Cooldown') {
                    interaction.followUp({ content: "BBQ on Cooldown", ephemeral: true });
                    return;
                }
                else if (checked === 'overheat') {
                    interaction.followUp({ content: "there is member on bounty cooldown", ephemeral: false });
                    return;
                }
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
                    interaction.followUp("Bounty Submitted");
                    const cd = await index_1.default.channels.fetch(process.env.COOLDOWN_CHANNEL);
                    if (!cd?.isTextBased())
                        return;
                    const msg1 = await cd.messages.fetch(process.env.COOLDOWN_MSG);
                    msg1?.edit({ embeds: [await (0, cooldown_1.default)()] });
                }
                catch (e) {
                    interaction.followUp("There is some problem connecting to server, please try again after some minutes");
                }
            }
        });
    }
};
exports.default = command;
