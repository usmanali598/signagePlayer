"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Playlist_1 = __importDefault(require("../models/Playlist"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
router.get('/', async (req, res, next) => {
    const result = await Playlist_1.default.find();
    if (result) {
        res.status(200).json(result);
    }
    else {
        next((0, http_errors_1.default)(400, "Something went wrong!"));
    }
});
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    if (mongoose_1.default.Types.ObjectId.isValid(id)) {
        const result = await Playlist_1.default.deleteOne({ _id: req.params.id });
        res.status(200).json(result);
    }
    else {
        next((0, http_errors_1.default)(400, "Invalid request"));
    }
});
router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        if (mongoose_1.default.Types.ObjectId.isValid(id)) {
            const updates = req.body;
            const options = { new: true };
            const result = await Playlist_1.default.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw (0, http_errors_1.default)(404, "such request does not exist");
            }
            res.send(result);
        }
    }
    catch (err) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            next((0, http_errors_1.default)(400, "Invalid Playlist Id"));
            return;
        }
        next(err);
    }
});
// delete urls of a playlist
router.delete('/:playlistId/:urlId', (req, res, next) => {
    const { playlistId, urlId } = req.params;
    if (mongoose_1.default.Types.ObjectId.isValid(playlistId) && mongoose_1.default.Types.ObjectId.isValid(urlId)) {
        Playlist_1.default.findByIdAndUpdate(playlistId, { $pull: { urls: { _id: urlId } } }, {}, function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data.urls);
            }
        });
    }
    else {
        next((0, http_errors_1.default)(400, "Invalid request"));
    }
});
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        if (mongoose_1.default.Types.ObjectId.isValid(id)) {
            const playList = await Playlist_1.default.findById(id);
            if (!playList) {
                throw (0, http_errors_1.default)(404, "Playlist does not exist");
                return;
            }
            res.status(200).json(playList);
        }
    }
    catch (err) {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            next((0, http_errors_1.default)(400, "Invalid Playlist Id"));
            return;
        }
        next(err);
    }
});
router.post('/', async (req, res, next) => {
    const { name, urls } = req.body;
    let urlArray = [];
    try {
        if (name && urls) {
            for (var i = 0; i < urls.length; i++) {
                const urlObj = { url: urls[i] };
                urlArray.push(urlObj);
            }
            const PList = new Playlist_1.default({
                name: name,
                urls: urlArray
            });
            const result = await PList.save();
            res.json(result);
        }
        else {
            throw (0, http_errors_1.default)(422, "missing require inputs");
        }
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            next((0, http_errors_1.default)(422, error.message));
            return;
        }
        next(error);
    }
});
exports.default = router;
