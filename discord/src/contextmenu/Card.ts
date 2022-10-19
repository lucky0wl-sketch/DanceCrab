import { ContextMenuCommandBuilder,ApplicationCommandType } from "discord.js";
import { ContextMenu } from "../types";
import client from '../index'
import Check from '../lib/registercheck'
import Embed from '../lib/char_embbed'

const command:ContextMenu = {
    command: new ContextMenuCommandBuilder()
    .setName("Card")
    .setType(ApplicationCommandType.User),
    execute: async interaction =>{
        if (!interaction.isUserContextMenuCommand()) return;
        const uid = interaction.targetId
        const disc = await Check(uid)
        if (!disc) {return interaction.reply("They arent registered yet")}
        let embed = await Embed(disc)
        const user = await client.users.fetch(uid)
        embed[0].setFooter({ text: `owned by ${user.username}`, iconURL: `${user.displayAvatarURL()}` });
    }
}
export default command 