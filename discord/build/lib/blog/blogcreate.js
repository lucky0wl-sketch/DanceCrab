"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Bind(thumb, category, title, blog, username, avatar) {
    const idk = await prisma.blog.create({ data: { thumbnail_url: thumb, discord_name: username, avatar_url: avatar, category: category, title: title, content: blog, created: Math.floor(new Date().getTime() / 1000) } }).catch(e => console.log(e));
    await prisma.$disconnect();
    return idk.id;
}
exports.default = Bind;
