import { Schema, model } from 'mongoose';

type URL = {
    url : string
}
interface IPlaylist {
  name: string,
  urls?: URL
}

const childSchema = new Schema({ url: String });
// Create Schema
const PlaylistSchema = new Schema<IPlaylist>({
    name: {
        type: String,
        required: true
    },
    urls: [childSchema]
}, {timestamps: true});

const Playlist = model<IPlaylist>('Playlist', PlaylistSchema);

export default Playlist;
