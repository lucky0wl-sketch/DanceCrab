"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Membed = exports.Nembed = exports.Sembed = void 0;
const discord_js_1 = require("discord.js");
const Sembed = (cname, uname, url, bbq, avatar) => {
    const embed = new discord_js_1.EmbedBuilder();
    const att = new discord_js_1.AttachmentBuilder(`./bounty/${bbq}.png`, { name: "bbq.png" });
    embed.setTitle(bbq).setThumbnail('attachment://bbq.png').setImage(url).setFooter({ text: `submited by ${uname}`, iconURL: avatar }).addFields({ name: cname, value: `cleared : solo\n<t:${Math.floor(new Date().getTime() / 1000)}:F>` }).setColor('DarkBlue');
    return { embed: embed, attach: att };
};
exports.Sembed = Sembed;
const Nembed = (cname, uname, url, bbq, avatar) => {
    const embed = new discord_js_1.EmbedBuilder();
    const att = new discord_js_1.AttachmentBuilder(`./bounty/${bbq}.png`, { name: "bbq.png" });
    embed.setTitle(bbq).setThumbnail('attachment://bbq.png').setImage(url).setFooter({ text: `submited by ${uname}`, iconURL: avatar }).addFields({ name: cname, value: `cleared : solo with npc\n<t:${Math.floor(new Date().getTime() / 1000)}:F>` }).setColor('Aqua');
    return { embed: embed, attach: att };
};
exports.Nembed = Nembed;
const Membed = (cname, uname, url, bbq, avatar) => {
    const embed = new discord_js_1.EmbedBuilder();
    const att = new discord_js_1.AttachmentBuilder(`./bounty/${bbq}.png`, { name: "bbq.png" });
    embed.setTitle(bbq).setThumbnail('attachment://bbq.png').setImage(url).setFooter({ text: `submited by ${uname[0]}`, iconURL: avatar }).addFields({ name: 'Team', value: `cleared : multiplayer \n <t:${Math.floor(new Date().getTime() / 1000)}:F>` }).setColor('Blue');
    for (let i = 0; i < cname.length; i++) {
        embed.addFields({ name: cname[i], value: `Discord: ${uname[i]}` });
    }
    return { embed: embed, attach: att };
};
exports.Membed = Membed;
