"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTimedMessage = exports.checkPermissions = exports.color = exports.getThemeColor = void 0;
const chalk_1 = __importDefault(require("chalk"));
const discord_js_1 = require("discord.js");
const themeColors = {
    text: "#ff8e4d",
    variable: "#ff624d",
    error: "#f5426c",
    data: "#00008b",
    blood: "#8b0000"
};
const getThemeColor = (color) => Number(`0x${themeColors[color].substring(1)}`);
exports.getThemeColor = getThemeColor;
const color = (color, message) => {
    return chalk_1.default.hex(themeColors[color])(message);
};
exports.color = color;
const checkPermissions = (member, permissions) => {
    let neededPermissions = [];
    permissions.forEach(permission => {
        if (!member.permissions.has(permission))
            neededPermissions.push(permission);
    });
    if (neededPermissions.length === 0)
        return null;
    return neededPermissions.map(p => {
        if (typeof p === "string")
            return p.split(/(?=[A-Z])/).join(" ");
        else
            return Object.keys(discord_js_1.PermissionFlagsBits).find(k => Object(discord_js_1.PermissionFlagsBits)[k] === p)?.split(/(?=[A-Z])/).join(" ");
    });
};
exports.checkPermissions = checkPermissions;
const sendTimedMessage = (message, channel, duration) => {
    channel.send(message)
        .then(m => setTimeout(async () => (await channel.messages.fetch(m)).delete(), duration));
    return;
};
exports.sendTimedMessage = sendTimedMessage;
// export const getGuildOption = async (guild: Guild, option: GuildOption) => {
//     if (mongoose.connection.readyState === 0) throw new Error("Database not connected.")
//     let foundGuild = await GuildDB.findOne({ guildID: guild.id })
//     if (!foundGuild) return null;
//     return foundGuild.options[option]
// }
// export const setGuildOption = async (guild: Guild, option: GuildOption, value: any) => {
//     if (mongoose.connection.readyState === 0) throw new Error("Database not connected.")
//     let foundGuild = await GuildDB.findOne({ guildID: guild.id })
//     if (!foundGuild) return null;
//     foundGuild.options[option] = value
//     foundGuild.save()
// }
