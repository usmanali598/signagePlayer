import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseUrl = "http://localhost:3000";

export default function CreatePlaylists() {
    const [url, setUrl] = useState<string[]>([]);
    const [name, setName] = useState<string>('');
    const [urlLists, setUrlLists] = useState<string[]>([]);
    const [validUrl, setValidUrl] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const navigate = useNavigate();

    const insertUrls = () => {
        const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        if(show){
            setShow(false);
        }
        if (url.toString().match(urlRegex) !== null) {
            setValidUrl(false)
            setUrl([]);
            setUrlLists([...urlLists, url.toString()]);
        } else {
            setValidUrl(true)
        }
    }

    const createPlaylist = () => {
        setName('');
        setUrl([]);
        setUrlLists([]);
        name || url ? axios.post(`${baseUrl}/playlist`, {
            name: name, urls: urlLists
        })
        .then(function (response) {
            navigate('playlists');
        })
        .catch(function (error) {
            setErrMessage(error.message)
            setShow(true);
        }) : null;
    }

    return (
        <div className='inputContainer'>
            <Card border="primary">
                <Card.Header>Create PalyList</Card.Header>
                <Card.Body>
                    <Form name='form1'>
                        <Form.Group className="mb-3" controlId="formPlistName" >
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Playlist name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formContent" >
                            <Form.Label>Add Content</Form.Label>
                            <Form.Control type="text" className={validUrl ? 'invalidUrl' : ''} name="urls" value={url} onChange={e => setUrl([e.target.value])} placeholder="Enter Urls" />
                            <Form.Text className="text-muted">
                                Please add the url of images and videos with mp4.
                            </Form.Text>
                        </Form.Group>

                        <Button className="cardButton" variant="primary" onClick={() => insertUrls()} disabled={url.length === 0}>Add URLs</Button>

                        <Button className="cardButton" variant="success" onClick={() => createPlaylist()} disabled={name.length === 0}>Create Playlist</Button>

                    </Form>

                </Card.Body>
            </Card>
            <br />
            <Alert className='alertStyle' show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                - {errMessage} <br />
                There is some issue. Please, try again.
            </Alert>
            {
                urlLists?.length > 0 ? 
                    <div className='playlistContainer'>
                        <Card>
                            <Card.Header>
                                <Card.Title>{name ? name : '-'}</Card.Title>
                            </Card.Header>
                            <ListGroup as="ol" numbered>
                                {
                                    urlLists?.map((url: string, i: number) => {
                                        return <ListGroup.Item key={i}>
                                            {url.length > 80 ? url.substring(0, 80) + '...' : url}
                                        </ListGroup.Item>
                                    })
                                }
                            </ListGroup>
                        </Card> 
                    </div> : null
            }
            
        </div>
    )
}