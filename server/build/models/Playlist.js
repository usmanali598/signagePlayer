"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const childSchema = new mongoose_1.Schema({ url: String });
// Create Schema
const PlaylistSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    urls: [childSchema]
}, { timestamps: true });
const Playlist = (0, mongoose_1.model)('Playlist', PlaylistSchema);
exports.default = Playlist;
