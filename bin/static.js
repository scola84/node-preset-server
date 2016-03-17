const http = require('http');
const minimist = require('minimist');
const Server = require('node-static').Server;

const options = minimist(process.argv.slice(2));
const fileServer = new Server('../client/dist/browser/www', {
  cache: false,
  indexFile: 'browser.html'
});

http.createServer((request, response) => {
  request.addListener('end', () => {
    fileServer.serve(request, response, (error) => {
      if (error) {
        response.writeHead(error.status, error.headers);
        response.end();
      }
    });
  }).resume();
}).listen(options.port);
