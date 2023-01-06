"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const savelist = ['savedata', 'partner', 'decomyset', 'hunternavi', 'otomoairou', 'platebox', 'platedata', 'platemyset', 'rengokudata', 'savemercenary', 'skin_hist'];
let get_save = async (did) => {
    const discord = await prisma.discord.findFirst({ where: { discord_id: did }, select: { char_id: true } }).catch(e => console.log(e));
    const save = await prisma.characters.findFirst({ where: { id: discord.char_id }, select: { savedata: true, partner: true, decomyset: true, hunternavi: true, otomoairou: true, platebox: true, platedata: true, platemyset: true, rengokudata: true, savemercenary: true, skin_hist: true } }).catch(e => console.log(e));
    await prisma.$disconnect();
    return savelist.map((e) => save[e] !== undefined ? save[e] !== null ? [save[e], `${e}.bin`] : "nothing" : "nothing");
};
exports.default = get_save;
