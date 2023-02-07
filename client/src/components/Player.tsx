import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Urls } from './types';
import { Alert } from 'react-bootstrap';

const baseUrl = "http://localhost:3000";

export default function Player() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [media, setMedia] = useState<Urls[]>([]);
    const [content, setContent] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>('');
    
    let { id } = useParams();
    const vidRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        async function play() {
            try{
                if (show) {
                    setShow(false);
                }
                const playerCotent = await axios.get(`${baseUrl}/playlist/${id}`);
                return setMedia(playerCotent.data.urls)
            }catch (error) {
                setShow(true);
                const err = error as AxiosError
                setErrMessage(err.message);
            }
        }

        play();

    }, []);

    useEffect(() => {
        const changeImg = async () => {
           await setContent(media[currentIndex]?.url);
            
            if (!(media[currentIndex]?.url?.includes('mp4'))) {
                var time = 7000;
                setTimeout(() => {
                    return currentIndex < (media.length - 1) ? setCurrentIndex(currentIndex + 1) : setCurrentIndex(0);
                }, time)
            } else {
                await setContent(media[currentIndex].url);
                vidRef.current?.load();
            }
          
        };

        media.length > 0 && changeImg();
    }, [media, currentIndex])
    
    const handleVideoEnded = () => {
        currentIndex < (media.length - 1) ? setCurrentIndex(currentIndex + 1) : setCurrentIndex(0);
    };

    return (
        <div>
            {
                errMessage ? 
                <Alert className='alertStyle' show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                    - {errMessage} <br />
                    There is some issue. Please, try again.
                </Alert> 
                : 
                content?.includes('mp4') ? <video className='signageVideo' width="320" height="240" autoPlay={true} muted controls ref={vidRef}
                    onEnded={() => handleVideoEnded()}>
                    <source src={content} type="video/mp4" />
                </video>
                    : <img className='signageImage' src={content} alt="opppoo" />
            }
        </div>
    )
}
