import app from './app'
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

export const server = app.listen(PORT, () => {
    console.log(`where is server listening at ${PORT}`);
})
server.on("error", console.error);