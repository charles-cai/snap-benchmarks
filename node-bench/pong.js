var http = require("http"),  
url = require("url"),  
path = require("path"),  
fs = require("fs"),
sys = require('sys');



http.createServer(function (request, response) {

  var uri = url.parse(request.url).pathname;  

  if(uri=='/pong') {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('PONG');
  } else if ((match = uri.match(/^\/echo\/(.*)$/)) != null) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(match[1]);
  } else {
    var filename = path.join(process.cwd(), uri);  
    path.exists(filename, function(exists) {  
      if(!exists) {  
        response.writeHead(404, {"Content-Type": "text/plain"});  
        response.end("404 Not Found\n");  
        return;  
      }  
      
      fs.readFile(filename, "binary", function(err, file) {  
        if(err) {  
          response.writeHead(500, {"Content-Type": "text/plain"});  
          response.end(err + "\n");  
          return;  
        }  
  
        response.writeHead(200);  
        response.write(file, "binary");  
        response.end();  
      });  
    });  
  }
}).listen(8124, "localhost");

sys.puts('Server running at http://127.0.0.1:8124/');
