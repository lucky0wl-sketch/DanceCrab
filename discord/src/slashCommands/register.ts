import { SlashCommandBuilder} from "discord.js";
import { SlashCommand } from "../types";
import Regis from '../lib/register'
import Dcheck from '../lib/registercheck'

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("create")
    .setDescription("register new user to database")
    .addStringOption(option => option.setName('username').setDescription('Your username').setRequired(true))
    .addStringOption(option => option.setName('password').setDescription('Your password').setRequired(true)),
    execute: async interaction => {
        const res = await Dcheck(interaction.user.id)
        if(res) return interaction.reply({content:'you already have an account',ephemeral:true})
        const username = String(interaction.options.get("username")?.value)
        const password = String(interaction.options.get("password")?.value)
        const data = await Regis(username,password)
        const ch = await interaction.guild?.channels.fetch(process.env.USER_CREATE_LOG_CHANNEL)
        if (data){interaction.reply({content:"New Account Succesfully Created",ephemeral:true})
            if (ch?.isTextBased()){ch.send(`${interaction.user.username}#${interaction.user.discriminator} created new account`)}
        }else{interaction.reply({content:"Username Already Exist",ephemeral:true})}
    },
    cooldown: 10
}

export default command;