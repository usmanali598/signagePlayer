import app from './app';
import { Server } from 'http';
import dotenv from 'dotenv';

dotenv.config();
const PORT : Number = Number(process.env.PORT) || 3000;

export const server : Server = app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`);
})
server.on("error", console.error);