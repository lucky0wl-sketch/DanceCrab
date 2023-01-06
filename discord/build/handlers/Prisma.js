"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../functions");
// import Update from '../lib/update'
module.exports = async () => {
    console.log((0, functions_1.color)("text", `🐘 Prisma-Postgres connection has been ${(0, functions_1.color)("variable", "established.")}`));
    // await Update().catch(e=>console.log("text",`🐘 Prisma-Postgres had some problem connecting to database with error${color("variable", `${e}`)}`))
};
