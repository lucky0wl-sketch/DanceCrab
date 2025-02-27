"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accept = void 0;
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const prisma = new client_1.PrismaClient();
async function Accept(id) {
    const data = await prisma.submitted.findUnique({ where: { id: id } });
    if (data === null)
        return false;
    let res;
    try {
        res = await Check(data);
    }
    catch (e) {
        console.log(e);
        return false;
    }
    let wtf = {
        type: data.type_b,
        result: res,
        uname: data.uname,
        cname: data.cname,
        avatar: data.avatar,
        url: data.url_i,
        bbq: data.bbq
    };
    console.log(wtf);
    return wtf;
}
exports.Accept = Accept;
async function Check(data) {
    const bounty = await prisma.bounty.findFirst({ where: { title: data.bbq } });
    if (data.type_b == 1) {
        let status = 0;
        try {
            const file = (0, fs_1.readFileSync)(`./bounty_b/${data.bbq}S.bin`);
            await prisma.distribution.create({ data: { character_id: data.cid, data: file, type: 1, bot: true, event_name: "Bounty Gift", description: `~C05${data.bbq} Solo Reward` } });
        }
        catch (e) {
            status = 1;
        }
        const discord = await prisma.discord.findFirst({ where: { char_id: data.cid } });
        const player = mutiplier(discord);
        if (data.bbq === 'SP' && discord?.road_champion == false) {
            await prisma.discord.updateMany({ where: { char_id: data.cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.solo_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.solo_ticket)), latest_bounty: data.bbq, latest_bounty_time: data.t_submit, road_champion: true } });
            return { title: 'road', status: status, uid: discord?.discord_id };
        }
        else if (data.bbq === 'BBQ07' && discord?.rain_demolizer == false) {
            await prisma.discord.updateMany({ where: { char_id: data.cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.solo_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.solo_ticket)), latest_bounty: data.bbq, latest_bounty_time: data.t_submit, rain_demolizer: true } });
            return { title: 'demolizer', status: status, uid: discord?.discord_id };
        }
        else if (Math.floor((Number(discord?.bounty) + (Number(bounty?.solo_point) * player))) >= 200000 && discord?.bounty_champion == false) {
            await prisma.discord.updateMany({ where: { char_id: data.cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.solo_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.solo_ticket)), latest_bounty: data.bbq, latest_bounty_time: data.t_submit, bounty_champion: true } });
            return { title: 'champion', status: status, uid: discord?.discord_id };
        }
        else if (Math.floor((Number(discord?.bounty) + (Number(bounty?.solo_point) * player))) >= 50000 && discord?.bounty_master == false) {
            await prisma.discord.updateMany({ where: { char_id: data.cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.solo_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.solo_ticket)), latest_bounty: data.bbq, latest_bounty_time: data.t_submit, bounty_master: true } });
            return { title: 'master', status: status, uid: discord?.discord_id };
        }
        else if (Math.floor((Number(discord?.bounty) + (Number(bounty?.solo_point) * player))) >= 25000 && discord?.bounty_expert == false) {
            await prisma.discord.updateMany({ where: { char_id: data.cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.solo_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.solo_ticket)), latest_bounty: data.bbq, latest_bounty_time: data.t_submit, bounty_expert: true } });
            return { title: 'expert', status: status, uid: discord?.discord_id };
        }
        else {
            await prisma.discord.updateMany({ where: { char_id: data.cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.solo_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.solo_ticket)), latest_bounty: data.bbq, latest_bounty_time: data.t_submit } });
            return { title: 'norm', status: status, uid: discord?.discord_id };
        }
    }
    else if (data.type_b == 2) {
        return await Mcheck(data.cid, data.bbq, bounty, data.t_submit);
    }
    else {
        const cidlist = JSON.parse(data.team);
        let wtf = [];
        for (let i = 0; i < cidlist.length; i++) {
            const res = await Mcheck(Number(cidlist[i]), data.bbq, bounty, data.t_submit);
            wtf.push(res);
        }
        return wtf;
    }
}
async function Mcheck(cid, bbq, bounty, t_submit) {
    let status = 0;
    try {
        const file = (0, fs_1.readFileSync)(`./bounty_b/${bbq}M.bin`);
        await prisma.distribution.create({ data: { character_id: cid, data: file, type: 1, bot: true, event_name: "Bounty Gift", description: `~C05${bbq} Multi Reward` } });
    }
    catch (e) {
        status = 1;
    }
    const discord = await prisma.discord.findFirst({ where: { char_id: cid } });
    const player = mutiplier(discord);
    if (bbq == 'SP' && discord?.road_champion == false) {
        await prisma.discord.updateMany({ where: { char_id: cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.multi_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.multi_ticket)), latest_bounty: bbq, latest_bounty_time: t_submit, road_champion: true } });
        return { title: 'road', status: status, uid: discord?.discord_id };
    }
    else if (bbq == 'BBQ07' && discord?.rain_demolizer == false) {
        await prisma.discord.updateMany({ where: { char_id: cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.multi_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.multi_ticket)), latest_bounty: bbq, latest_bounty_time: t_submit, rain_demolizer: true } });
        return { title: 'demilizer', status: status, uid: discord?.discord_id };
    }
    else if (Math.floor((Number(discord?.bounty) + (Number(bounty?.multi_point) * player))) >= 200000 && discord?.bounty_champion == false) {
        await prisma.discord.updateMany({ where: { char_id: cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.multi_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.multi_ticket)), latest_bounty: bbq, latest_bounty_time: t_submit, bounty_champion: true } });
        return { title: 'champion', status: status, uid: discord?.discord_id };
    }
    else if (Math.floor((Number(discord?.bounty) + (Number(bounty?.multi_point) * player))) >= 50000 && discord?.bounty_master == false) {
        await prisma.discord.updateMany({ where: { char_id: cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.multi_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.multi_ticket)), latest_bounty: bbq, latest_bounty_time: t_submit, bounty_master: true } });
        return { title: 'master', status: status, uid: discord?.discord_id };
    }
    else if (Math.floor((Number(discord?.bounty) + (Number(bounty?.multi_point) * player))) >= 25000 && discord?.bounty_expert == false) {
        await prisma.discord.updateMany({ where: { char_id: cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.multi_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.multi_ticket)), latest_bounty: bbq, latest_bounty_time: t_submit, bounty_expert: true } });
        return { title: 'expert', status: status, uid: discord?.discord_id };
    }
    else {
        await prisma.discord.updateMany({ where: { char_id: cid }, data: { bounty: Math.floor((Number(discord?.bounty) + (Number(bounty?.multi_point) * player))), gacha: (Number(discord?.gacha) + Number(bounty?.multi_ticket)), latest_bounty: bbq, latest_bounty_time: t_submit } });
        return { title: 'norm', status: status, uid: discord?.discord_id };
    }
}
function mutiplier(discord) {
    if (discord?.rain_demolizer) {
        return 1.5;
    }
    else if (discord?.road_champion) {
        return 1.4;
    }
    else if (discord?.bounty_champion) {
        return 1.3;
    }
    else if (discord?.bounty_master) {
        return 1.2;
    }
    else if (discord?.bounty_expert) {
        return 1.1;
    }
    else
        return 1;
}
