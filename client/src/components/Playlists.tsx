import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import axios, {AxiosError} from 'axios';
import { Link } from 'react-router-dom';
import { Urls, Content } from './types';

import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = "http://localhost:3000";

function Playlists() {
    const [media, setMedia] = useState<Content[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>('');
    //save reference for dragItem and dragOverItem
    const dragItem = React.useRef<HTMLLIElement | string | null>(null)
    const dragOverItem = React.useRef<HTMLLIElement | string | null>(null)


    const fetchPlays = async () => {
        try{
            if (show) {
                setShow(false);
            }
            const { data } = await axios.get(`${baseUrl}/playlist`);
            setMedia(data);
        } catch(error){
            setShow(true);
            const err = error as AxiosError
            setErrMessage(err.message);
        }
    }
    
    useEffect(() => {
        fetchPlays();
    }, [])
    
    const deleteItem = async (pId: string, id: string) => {
        await axios.delete(`${baseUrl}/playlist/${pId}/${id}`)
        fetchPlays()
    }
    
    const deletePlayList = async (id: string) => {
        await axios.delete(`${baseUrl}/playlist/${id}`)
        fetchPlays()
    }

    //reordering the content of playlist
    const reorderItems = async (id:string) => {
        //duplicate items
        let _urlItems = media?.filter((it: Content) => it?._id === id)[0].urls;
        
        let inxOne = _urlItems.findIndex((it: Urls) => it._id === dragItem.current);
        let inxTwo = _urlItems.findIndex((it: Urls) => it._id === dragOverItem.current);

        //remove and save the dragged item content
        const draggedItemContent = _urlItems.splice(inxOne, 1)[0]
        
        //switch the position
        _urlItems.splice(inxTwo, 0, draggedItemContent)

        //reset the ref
        dragItem.current = null;
        dragOverItem.current = null;

        const urls = _urlItems;
        // axios patch not updating so fetch is utilised
        const result = await fetch(`${baseUrl}/playlist/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({urls})
        })
        
        if(result.status === 200){
            return fetchPlays()
        }  
    }

    return (
        <div className='playlistContainer'>
            <Alert className='alertStyle' show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                - {errMessage} <br />
                There is some issue. Please, try again.
            </Alert>
        {
                media?.map((item: Content) => {
                return <Card key={item._id} border="primary" style={{ width: '18rem' }} data-cy="playlistCard">
                    <Card.Header>
                        <Card.Title>{item.name}</Card.Title>
                        {
                            item?.createdAt ? 
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                            </svg>
                            {' '} {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                            }).format(new Date(item.createdAt))}</span> : null
                        }
                        
                        <CloseButton className='removePListX' onClick={() => deletePlayList(item._id)} />

                    </Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                            Total Items : <Badge bg="primary">
                                {item?.urls?.length}
                            </Badge> 
                        </Card.Text>
                        
                        <ListGroup>
                            {
                                item?.urls?.map((url:Urls) => {
                                    return <ListGroup.Item key={url._id} draggable 
                                    onDragStart={(e) => (dragItem.current = url._id)}
                                        onDragEnter={(e) => (dragOverItem.current = url._id)}
                                        onDragEnd={(e) => reorderItems(item._id)}
                                        onDragOver={(e) => e.preventDefault()}>
                                            {url?.url.length > 20 ? url.url.substring(0, 20) + '...' : url.url}
                                        <CloseButton className='deletePItem' onClick={() => deleteItem(item._id, url._id)} /></ListGroup.Item>
                                })
                            }
                        </ListGroup>

                        {
                            item?.urls?.length > 0 && <Link to={`/playlists/${item._id}`} >
                                <Button variant="success" className='mt-3'>Play</Button></Link>
                        }

                    </Card.Body>
                </Card>
            })
        }
        </div>
    );
}

export default Playlists;