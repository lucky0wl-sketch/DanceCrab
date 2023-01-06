"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const prisma = new client_1.PrismaClient();
const raw = (0, fs_1.readFileSync)('./gacha/gacha.json');
const file = JSON.parse(String(raw));
async function Pull(did, pull) {
    const discord = await prisma.discord.findUnique({ where: { discord_id: did }, select: { gacha: true, pity: true, bounty: true, char_id: true } });
    if (!discord)
        return false;
    if (pull == 1) {
        if (Number(discord.gacha) < 10)
            return "not enough";
        discord.pity += 1;
        discord.gacha -= 10;
        if (discord.pity == 30) {
            await prisma.discord.update({ where: { discord_id: did }, data: { pity: 0, gacha: discord.gacha } });
            const res = guaranteed();
            const file = (0, fs_1.readFileSync)(`./gacha_b/${res[0]}.bin`);
            await prisma.distribution.create({ data: { character_id: discord.char_id, data: file, type: 1, bot: true, event_name: "Gacha Gift", description: `~C05${res[0]}` } });
            await prisma.$disconnect();
            return { rarity: res[1], item: res[0], pity: 0, ticket: discord.gacha };
        }
        else {
            const res = normal();
            const file = (0, fs_1.readFileSync)(`./gacha_b/${res[0]}.bin`);
            await prisma.distribution.create({ data: { character_id: discord.char_id, data: file, type: 1, bot: true, event_name: "Gacha Gift", description: `~C05${res[0]}` } });
            if (res[1] === 'ssr' || res[1] === 'ur') {
                await prisma.discord.update({ where: { discord_id: did }, data: { pity: 0, gacha: discord.gacha } });
                await prisma.$disconnect();
                return { rarity: res[1], item: res[0], pity: 0, ticket: discord.gacha };
            }
            else {
                await prisma.discord.update({ where: { discord_id: did }, data: { pity: discord.pity, gacha: discord.gacha } });
                await prisma.$disconnect();
                return { rarity: res[1], item: res[0], pity: discord.pity, ticket: discord.gacha };
            }
        }
    }
    else {
        if (Number(discord.gacha) < 100)
            return "not enough";
        const result = [];
        for (let i = 0; i < 10; i++) {
            discord.pity += 1;
            let res;
            if (discord.pity == 30) {
                res = guaranteed();
                discord.pity = 0;
            }
            else {
                res = normal();
                if (res[1] == 'ssr' || res[1] == 'ur')
                    discord.pity = 0;
            }
            result.push(res);
            const file = (0, fs_1.readFileSync)(`./gacha_b/${res[0]}.bin`);
            await prisma.distribution.create({ data: { character_id: discord.char_id, data: file, type: 1, bot: true, event_name: "Gacha Gift", description: `~C05${res[0]}` } });
        }
        discord.gacha -= 100;
        await prisma.discord.update({ where: { discord_id: did }, data: { pity: discord.pity, gacha: discord.gacha } });
        await prisma.$disconnect();
        return { query: result, pity: discord.pity, ticket: discord.gacha };
    }
}
exports.default = Pull;
function normal() {
    const x = Math.random();
    if (x <= 0.001) {
        return [file.ur[Math.floor(Math.random() * file.ur.length)], "ur"];
    }
    else if (0.001 < x && x <= 0.01) {
        return [file.ssr1[Math.floor(Math.random() * file.ssr1.length)], "ssr"];
    }
    else if (0.01 < x && x <= 0.05) {
        return [file.ssr2[Math.floor(Math.random() * file.ssr2.length)], "ssr"];
    }
    else if (0.05 < x && x <= 0.1) {
        return [file.sr1[Math.floor(Math.random() * file.sr1.length)], "sr"];
    }
    else if (0.1 < x && x <= 0.2) {
        return [file.sr2[Math.floor(Math.random() * file.sr2.length)], "sr"];
    }
    else if (0.2 < x && x <= 0.35) {
        return [file.sr3[Math.floor(Math.random() * file.sr3.length)], "sr"];
    }
    else if (0.35 < x && x <= 0.60) {
        return [file.r1[Math.floor(Math.random() * file.r1.length)], "r"];
    }
    else {
        return [file.r2[Math.floor(Math.random() * file.r2.length)], "r"];
    }
}
function guaranteed() {
    const x = Math.random();
    if (x <= 0.1) {
        return [file.ur[Math.floor(Math.random() * file.ur.length)], "ur"];
    }
    else if (0.1 < x && x <= 0.4) {
        return [file.ssr1[Math.floor(Math.random() * file.ssr1.length)], "ssr"];
    }
    else {
        return [file.ssr2[Math.floor(Math.random() * file.ssr2.length)], "ssr"];
    }
}
