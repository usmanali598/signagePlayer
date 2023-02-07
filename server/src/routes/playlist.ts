import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
import Playlist from '../models/Playlist';
import createError from 'http-errors';
import mongoose from 'mongoose';


router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const result = await Playlist.find();
    if(result){
        res.status(200).json(result)
    } else {
        next(createError(400, "Something went wrong!"));
    }
})

router.delete('/:id', async (req:Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    if(mongoose.Types.ObjectId.isValid(id)){
        const result = await Playlist.deleteOne({_id:req.params.id});
        res.status(200).json(result)
    } else {
         next(createError(400, "Invalid request"));
    }
});

router.patch('/:id',async (req:Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    try{
        if(mongoose.Types.ObjectId.isValid(id)){
            const updates = req.body;
            const options = {new : true};
            const result = await Playlist.findByIdAndUpdate(id, updates, options);
            if(!result){
                throw createError(404, "such request does not exist")
            }
            res.send(result);
        }
    }catch(err){
        if(!mongoose.Types.ObjectId.isValid(id)){
            next(createError(400, "Invalid Playlist Id"));
            return;
        }
        next(err);
    }
})

// delete urls of a playlist
router.delete('/:playlistId/:urlId', (req: Request, res: Response, next: NextFunction) => {
    const {playlistId, urlId} = req.params;
    if(mongoose.Types.ObjectId.isValid(playlistId) && mongoose.Types.ObjectId.isValid(urlId)){
        Playlist.findByIdAndUpdate(playlistId, { $pull: { urls: { _id: urlId } } }, {},
                function (err, data) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send(data.urls)
                    }
            });
    } else {
        next(createError(400, "Invalid request"));
    }
})

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    try{
        if(mongoose.Types.ObjectId.isValid(id)){
            const playList = await Playlist.findById(id);
            if(!playList){
                throw createError(404, "Playlist does not exist");
                return;
            }
            res.status(200).json(playList);
        }
    }catch(err){
        if(!mongoose.Types.ObjectId.isValid(id)){
            next(createError(400, "Invalid Playlist Id"));
            return;
        }
        next(err);
    }
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { name, urls } = req.body;
    let urlArray = [];
    
    try {
        if(name && urls){
            for(var i = 0; i < urls.length; i++){
                const urlObj = {url: urls[i]};
                urlArray.push(urlObj)
            }
            const PList = new Playlist({
                name: name,
                urls: urlArray
            });
            const result = await PList.save()
            res.json(result);
        } else {
           throw createError(422, "missing require inputs");
        }
    } catch (error) {
        if(error.name === 'ValidationError'){
            next(createError(422, error.message))
            return;
        }
        next(error);
    }
}) 

export default router;
