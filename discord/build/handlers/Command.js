"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const rest_1 = require("@discordjs/rest");
const fs_1 = require("fs");
const path_1 = require("path");
const functions_1 = require("../functions");
module.exports = (client) => {
    const slashCommands = [];
    const commands = [];
    const contexs = [];
    let slashCommandsDir = (0, path_1.join)(__dirname, "../slashCommands");
    let commandsDir = (0, path_1.join)(__dirname, "../commands");
    let contexsDir = (0, path_1.join)(__dirname, "../contextmenu");
    (0, fs_1.readdirSync)(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".js"))
            return;
        let command = require(`${slashCommandsDir}/${file}`).default;
        slashCommands.push(command.command);
        client.slashCommands.set(command.command.name, command);
    });
    (0, fs_1.readdirSync)(commandsDir).forEach(file => {
        if (!file.endsWith(".js"))
            return;
        let command = require(`${commandsDir}/${file}`).default;
        commands.push(command);
        client.commands.set(command.name, command);
    });
    (0, fs_1.readdirSync)(contexsDir).forEach(file => {
        if (!file.endsWith(".js"))
            return;
        let command = require(`${contexsDir}/${file}`).default;
        contexs.push(command.command);
        client.slashCommands.set(command.command.name, command);
    });
    const rest = new rest_1.REST({ version: "10" }).setToken(process.env.TOKEN);
    const join_com = [...contexs, ...slashCommands];
    rest.put(discord_js_1.Routes.applicationCommands(String(process.env.CLIENT_ID)), {
        body: join_com.map(command => command.toJSON())
    })
        .then((data) => {
        console.log((0, functions_1.color)("text", `🔥 Successfully loaded ${(0, functions_1.color)("variable", data.length)} slash command(s)`));
        console.log((0, functions_1.color)("text", `🔥 Successfully loaded ${(0, functions_1.color)("variable", commands.length)} command(s)`));
    }).catch(e => {
        console.log(e);
    });
};
