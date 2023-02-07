# Signage Player

Update: docker is added and project is reorganised.

A Signage player for creating playlists containing images and videos that also support playing mp4 videos and images for 7 seconds.


After cloning the app. Create .env file in server directory and add as follows.

```sh
 PORT=3000
 mongoURI=mongodb://localhost:27017/playlist #for local development
```

 Please, use the commands below to run locally.

```bash
# For running in docker

cd fullstack
docker-compose --build
docker-compose up
```

if no docker installed on the machine then for manual installation, follow as below:

cd fullstack/server

# packages installation
- npm ci
- npm run client-install

# To run the Apps parallelly:

```sh
npm run build #compiling typescript in watch mode. open the new terminal and run as follows:
npm run dev
```

# Running separately:
```sh
#Backend
- npm dev-start

#Frontend
- npm run client
```
# For End to End Tests
```sh
- npm run e2e
```

## Usage

Remove the old documents in the collection if you have used the first verion of this app. If not, then just run the app by using following endpoints. 

## Endpoints
```bash
# For all the playlists
http://localhost:3000/playlist 

# For specific playlist
http://localhost:3000/playlist/{id}

# Frontend 
http://localhost:5173

```

## About App:

This app allows to add online urls for images and mp4 videos in a playlist. The playlist can be played and image stays on screen for 7 seconds and videos run smoothly till end and it restarts the whole playlist once its finished. Navigation between playlists and create playlists are also part of the app for switching smoothly. 

Node version v16.15.0 is used during development and tested properly. Vite was also preferred instead of create react app due to its fast speed and less in size. Mongodb is also used and during development, I was using local mongo environment. 

## Additional questions related to the task:

1. In the app, looping is done by running all the items in playlists once and then it updates state of currentIndex to 0. State update is keep looking for currentIndex to keep the playlist running. I face challenge in running videos mostly especially once the video was ending, it was not running/loading the next video so had to figure it out. 
2. I was considering the scalability feature of this app. In case of more playlists, its better to keep the route of playlist separate and also its nice to watch the video or image on top instead of scrolling down to see where the element/content is. Therefore, I decided the UI design to have smooth navigation plus separate route for ease. Moreover, I am using bootstrap and some custom css for styling.
3. For video content, I am triggering onEnded event that video element has. There, I am updating the current index to the next element if its still not reached to its length. Also, updating the video src url and loading the current(url) to play it smoothly. 
4. I am using node express js and mongo db. Node is fast and express is easy to create and manage apis. Mongo for me is to try something after a long but also one of the reasons was to insert array of strings as urls. Advantage of using them in this project was the suitablity or nature of the project as there were not many relations required. More, it can be migrated easily for other document base databases. one disadvantage is that in case of migration to relational databases, it requires some work to create tables, relationships and their configurations. 