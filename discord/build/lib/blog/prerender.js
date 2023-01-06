"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function Update() {
    const data = await prisma.blog.findMany();
    data.map(o => {
        const json = JSON.stringify({ blog: o }, null, 2);
        (0, fs_1.writeFile)(`./blog/${o.id}&&${o.category}.json`, json, (err) => {
            if (err)
                throw err;
        });
    });
}
exports.default = Update;
