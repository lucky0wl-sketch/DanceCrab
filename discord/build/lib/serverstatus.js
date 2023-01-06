"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Status() {
    const user = await prisma.users.count();
    const channel = await prisma.characters.count();
    const register = await prisma.discord.count();
    await prisma.$disconnect();
    return { user: user, channel: channel, registered: register };
}
exports.default = Status;
