const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'HTTP Documentation',
        description: 'User APIs'
    },
    host:'localhost:3000',
    scheme:['http','https']
};

const outPutFile = "./swagger.json";
const endPointsFiles = ['./routes/index.js'];

swaggerAutogen (outPutFile, endPointsFiles, doc);