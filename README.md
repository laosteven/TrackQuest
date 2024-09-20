# TrackQuest

TrackQuest is an adventure mapping application inspired by the Hero's Path from the Legend of Zelda.

It allows users to track their activities while providing customizable map styles and detailed activity progress.

![Landing](https://i.imgur.com/dwJqmTH.png)

![Settings](https://i.imgur.com/DBXlc3O.png)

![Import](https://i.imgur.com/XWLD513.png)

![Filtering](https://i.imgur.com/l0d0WmL.png)

![Types](https://i.imgur.com/rbZBQDi.png)

![Completion](https://i.imgur.com/gGIV6fn.png)

https://github.com/user-attachments/assets/4b317b06-6a43-44cd-ab49-c37c9fa10a0a

## Features

- Upload routes in GPX format
- Connect to Strava to fetch activities
- Customize map styles
- View detailed activity progress

## Setup

### Dependencies

```bash
npm install
```

### Developing

Once you've created a project and installed dependencies, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Environment Variables

Create an `.env` file in the root directory with the following content:

```makefile
PUBLIC_GOOGLE_MAP_API_KEY=your_google_map_api_key
PUBLIC_STRAVA_CLIENT_ID=your_strava_client_id
PUBLIC_STRAVA_CLIENT_SECRET=your_strava_client_secret
```

## Docker

Configure the environment variables in the `docker-compose.yml` file.

Use the following command to start the application:

```bash
docker-compose up -d
```

This will start the application in a detached mode, allowing you to access TrackQuest at [http://localhost:1234](http://localhost:1234).
