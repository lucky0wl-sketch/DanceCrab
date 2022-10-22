import {ActionRowBuilder, SlashCommandBuilder,ButtonBuilder} from "discord.js";
import { SlashCommand } from "../types";
import {Scheck,Mcheck} from '../lib/bounty/check'

const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("submit")
    .setDescription("submit your bounty for evaluation")
    .addStringOption(o => o.setName('bounty').setDescription('pick category').setRequired(true).addChoices(
        {name:'BBQ01',value:'BBQ01'},
        {name:'BBQ02',value:'BBQ02'},
        {name:'BBQ03',value:'BBQ03'},
        {name:'BBQ04',value:'BBQ04'},
        {name:'BBQ05',value:'BBQ05'},
        {name:'BBQ06',value:'BBQ06'},
        {name:'BBQ07',value:'BBQ07'},
        {name:'BBQ08',value:'BBQ08'},
        {name:'BBQ09',value:'BBQ09'},
        {name:'BBQ10',value:'BBQ10'},
        {name:'BBQ11',value:'BBQ11'},
        {name:'BBQ12',value:'BBQ12'},
        {name:'BBQ13',value:'BBQ13'},
        {name:'BBQ14',value:'BBQ14'},
        {name:'BBQ15',value:'BBQ15'},
        {name:'BBQ16',value:'BBQ16'},
        {name:'BBQ17',value:'BBQ17'},
        {name:'BBQ18',value:'BBQ18'},
        {name:'BBQ19',value:'BBQ19'},
        {name:'BBQ20',value:'BBQ20'},
        {name:'BBQ21',value:'BBQ21'},
        {name:'BBQ22',value:'BBQ22'},
        {name:'BBQ23',value:'BBQ23'},
        {name:'SP',value:'SP'},
        
    ))
    .addBooleanOption(o => o.setName('npc').setDescription('select true if youare with npc').setRequired(true))
    .addAttachmentOption(option => option.setName('thumbnail').setDescription('set thumbnail for your blog'))
    .addStringOption(o => o.setName('mentions').setDescription('dont fill this if youare solo, fill with mentions if multi')),
    execute: async interaction => {
        const attachment = String(interaction.options.get('thumbnail',true).attachment?.url)
        const bbq = String(interaction.options.get('bounty',true).value)
        const mentions = String(interaction.options.get('mentions')?.value)
        const npc = Boolean(interaction.options.get('npc',true).value)
        if (!mentions){
            const checked = await Scheck(interaction.user.id,bbq)
            if(!checked){return interaction.reply({content:"you are not registered yet",ephemeral:true})}
            if(checked==='Cooldown'){return interaction.reply({content:"BBQ on Cooldown",ephemeral:true})} else
            if(checked === 'overheat'){return interaction.reply({content:"you are still on cooldown",ephemeral:true})}
        }else{
            const data = mentions.match(/<@!?([0-9]+)>/g)
            if(data === null ){return interaction.reply({content:"No mentions Detected",ephemeral:true})}
            const ids:any = data.map(e=>e.match(/([0-9]+)/g))
            const checked = await Mcheck(interaction.user.id,ids,bbq)
            if(!checked){return interaction.reply("there is member thats not registered yet")}else
            if(checked==='Cooldown'){return interaction.reply({content:"BBQ on Cooldown",ephemeral:true})} else
            if(checked === 'overheat'){return interaction.reply({content:"there is member on bounty cooldown",ephemeral:false})}
        }
    },
    cooldown: 10
}

export default command;