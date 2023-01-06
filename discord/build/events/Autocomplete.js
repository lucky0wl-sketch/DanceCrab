"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const raw = (0, fs_1.readFileSync)('./prerender_data/guild_data.json');
const data = JSON.parse(String(raw));
const list = data.guild.map((e) => e.name);
const event = {
    name: "interactionCreate",
    execute: async (interaction) => {
        if (!interaction.isAutocomplete())
            return;
        switch (interaction.commandName) {
            case 'join_guild': {
                const focusedValue = interaction.options.getFocused().toLocaleLowerCase();
                let filtered;
                try {
                    filtered = list.filter((c) => { if (c.toLocaleLowerCase().startsWith(focusedValue)) {
                        return c;
                    } }).slice(0, 10);
                    await interaction.respond(filtered.map((c) => ({ name: c, value: c }))).catch(e => console.log(e));
                }
                catch (e) {
                    console.log(e);
                }
                break;
            }
        }
    }
};
exports.default = event;
