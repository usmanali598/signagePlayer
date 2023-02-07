"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const playlist_1 = __importDefault(require("./routes/playlist"));
const mongoose_1 = __importStar(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_errors_1 = __importDefault(require("http-errors"));
dotenv_1.default.config();
//Bodyparser Middleware
app.use(express_1.default.json());
// CORS Middleware
app.use((0, cors_1.default)());
// const db = 'mongodb://localhost:27017/playlists';
const db = process.env.mongoURI;
mongoose_1.default.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
    await (0, mongoose_1.connect)(db);
}
app.get('/', (req, res) => {
    res.send('Yes it wewe e works');
});
app.use('/playlist', playlist_1.default);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, "Not Found!"));
});
// error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});
exports.default = app;
