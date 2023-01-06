"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const functions_1 = require("../functions");
const event = {
    name: "ready",
    once: true,
    execute: (client) => {
        console.log((0, functions_1.color)("text", `💪 Logged in as ${(0, functions_1.color)("variable", client.user?.tag)}`));
        client.user?.setPresence({ activities: [{ name: "Elzelion's Dethrone", type: discord_js_1.ActivityType.Watching }] });
    }
};
exports.default = event;
