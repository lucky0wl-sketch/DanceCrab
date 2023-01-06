"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const urlbuf_1 = __importDefault(require("./urlbuf"));
const prisma = new client_1.PrismaClient();
async function Changebt(type, bbq, bounty, ticket, id, url, desc) {
    let res = true;
    const data = await prisma.distribution.findUnique({ where: { id: id }, select: { data: true } }).catch(e => { res = false; });
    if (data == null)
        return false;
    if (desc !== null) {
        await prisma.bounty.updateMany({ where: { title: bbq }, data: { explain: desc } }).catch(e => { res = false; });
    }
    else if (url !== null) {
        const buff = await (0, urlbuf_1.default)(url);
        (0, fs_1.writeFileSync)(`./bounty/${bbq}.png`, buff);
    }
    const solo = async () => {
        if (bounty !== null) {
            await prisma.bounty.updateMany({ where: { title: bbq }, data: { solo_point: bounty } }).catch(e => { res = false; });
        }
        else if (ticket !== null) {
            await prisma.bounty.updateMany({ where: { title: bbq }, data: { solo_ticket: ticket } }).catch(e => { res = false; });
        }
        (0, fs_1.writeFileSync)(`./bounty_b/${bbq}S.bin`, data.data);
    };
    const multi = async () => {
        if (bounty !== null) {
            await prisma.bounty.updateMany({ where: { title: bbq }, data: { multi_point: bounty } }).catch(e => { res = false; });
        }
        else if (ticket !== null) {
            await prisma.bounty.updateMany({ where: { title: bbq }, data: { multi_ticket: ticket } }).catch(e => { res = false; });
        }
        (0, fs_1.writeFileSync)(`./bounty_b/${bbq}M.bin`, data.data);
    };
    if (type == 1) {
        await solo();
    }
    else if (type == 2) {
        await multi();
    }
    else {
        await solo();
        multi();
    }
    await prisma.$disconnect();
    return res;
}
exports.default = Changebt;
