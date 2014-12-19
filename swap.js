var fs = require('fs');
var http = require('http');
// var favicon

var server = http.createServer(function(req,res){

  if (req.url === "/" || req.url === "/favicon.ico" || req.url === "/start.html") {
    fs.readFile("start.html", function(err,data){
      res.end(data.toString());
    });
  }  else if (req.url === "/styles.css") {
    fs.readFile("styles.css", function(err,data){
      res.end(data);
    });
  } else if (req.url === '/back.png') {
    fs.readFile("back.png", function(err,data){
      res.end(data);
    });
  } else if (req.url === '/indexstyles.css') {
    fs.readFile("indexstyles.css", function(err,data){
      res.end(data);
    })
  } else if (req.url === '/bookback.png') {
    fs.readFile("bookback.png", function(err,data){
      res.end(data);
    });
  } else {
    var path = req.url;
    path = path.slice(1);
    path = path.toString();

    fs.readFile("index.html",function(err,data){
      var index = data.toString().split("[replace]")

      fs.readFile(path, function(err, data){
        if (err){
          console.log(path);
          console.log("Read Error");
        } else {
          var text = data.toString();
          text = text.split("\n");
          for (var i = 0; i < text.length; i = i+2) {
            text.splice(i,0,"<br>")
          }
          text = text.join("");
          index.splice(1,0,text);
          index = index.join('');
        }
        res.end(index);
      });
    });
  }
});

server.listen(2000);
