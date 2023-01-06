"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const prisma = new client_1.PrismaClient();
async function Refresh() {
    const raw = (0, fs_1.readFileSync)('./prerender_data/refresh.json');
    const json = JSON.parse(String(raw));
    try {
        for (let i = 0; i < json.length; i++) {
            await prisma.bounty.updateMany({ where: { title: json[i].title }, data: { cooldown: json[i].cooldown } });
        }
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.default = Refresh;
