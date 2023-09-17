const { createServer } = require('vite');
const express = require('express');

async function start() {
    const vite = await createServer({
        server: {
            middlewareMode: true,
        },
    });

    const app = express();
    app.use(vite.middlewares);

    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}

start();