const express = require('express');
const app = express();
const morgan = require('morgan');
const http = require('http');

app.use(morgan('dev'));
app.use(express.json());
app.set('port', process.env.PORT || 8000);

const server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log('Server is UP on port => ' + app.get('port'));
})