"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const discord_js_1 = require("discord.js");
const functions_1 = require("../functions");
const prisma = new client_1.PrismaClient();
const available = (data) => {
    switch (data) {
        case 0: {
            return "Available";
        }
        case 1: {
            return "cooldown";
        }
        default: {
            return "Active";
        }
    }
};
async function Boost(cid) {
    const user = await prisma.login_boost_state.findMany({ where: { char_id: cid }, orderBy: { week_req: 'asc' }, select: { end_time: true } });
    const embed = new discord_js_1.EmbedBuilder()
        .setAuthor({ name: 'Login Boost' })
        .setColor((0, functions_1.getThemeColor)("data"))
        .addFields({ name: "Week 1 ", value: available(user[0].end_time), inline: false }, { name: "Week 2 ", value: available(user[1].end_time), inline: false }, { name: "Week 3 ", value: available(user[2].end_time), inline: false }, { name: "Week 4 ", value: available(user[3].end_time), inline: false }, { name: "Week 5 ", value: available(user[4].end_time), inline: false });
    await prisma.$disconnect();
    return embed;
}
exports.default = Boost;
