import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export default async function Gjoin(name:string,char_id:number) {
    const guild_characters = await prisma.guild_characters.findFirst({where:{character_id:char_id},select:{id:true}})
    if (guild_characters !== null){await prisma.$disconnect();return false}
    const guild = await prisma.guilds.findFirst({where:{name:name},select:{id:true}})
    const member = await prisma.guild_characters.count({where:{guild_id:guild?.id}})
    const member1 = await prisma.guild_characters.findMany({select:{id:true},orderBy:{id:'desc'}})
    if (member >= 60 ){await prisma.$disconnect();return false}
    await prisma.guild_characters.create({data:{character_id:char_id,guild_id:Number(guild?.id),id:member1[0].id+1}})
    await prisma.$disconnect()
    return true
}