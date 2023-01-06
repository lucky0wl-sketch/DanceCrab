"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const prisma = new client_1.PrismaClient();
async function Chgacha() {
    let res = true;
    const raw = String((0, fs_1.readFileSync)('./gacha/gacha.json'));
    const json = JSON.parse(raw);
    Promise.all(json.download.map(async (e) => {
        const data = await prisma.distribution.findUnique({ where: { id: e.distribution }, select: { data: true } });
        if (data == null)
            return;
        (0, fs_1.writeFileSync)(`./gacha_b/${e.name}.bin`, data.data);
    })).catch(e => { res = false; });
    return res;
}
exports.default = Chgacha;
