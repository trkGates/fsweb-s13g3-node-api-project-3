// require your server and launch it

const server = require('./api/server.js');

server.port=9000;

server.listen(server.port, () => {
    console.log(`\n*** Server Running on http://localhost:${server.port} ***\n`);
    }
);

