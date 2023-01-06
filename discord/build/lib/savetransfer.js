"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const urlbuf_1 = __importDefault(require("./urlbuf"));
const prisma = new client_1.PrismaClient();
const savelist = ['savedata', 'partner', 'decomyset', 'hunternavi', 'otomoairou', 'platebox', 'platedata', 'platemyset', 'rengokudata', 'savemercenary', 'skin_hist'];
const savedata = savelist.map(e => `${e}.bin`);
async function transferFile(url, size, cid, name) {
    if (size >= 100000)
        return "malicius";
    const buffer = await (0, urlbuf_1.default)(url);
    if (name == null)
        return "invalid";
    if (!savedata.includes(name))
        return "invalid";
    const index = savedata.indexOf(name);
    await prisma.characters.update({ where: { id: cid }, data: { [savelist[index]]: buffer } });
    await prisma.$disconnect();
    return `transfer ${name} success`;
}
exports.default = transferFile;
