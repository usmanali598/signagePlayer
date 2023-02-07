import { Schema, model } from 'mongoose';

const childSchema = new Schema({ url: String });
// Create Schema
const PlaylistSchema = new Schema<any>({
    name: {
        type: String,
        required: true
    },
    urls: [childSchema]
}, {timestamps: true});

const Playlist = model<any>('Playlist', PlaylistSchema);

export default Playlist;
