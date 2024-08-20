const http = require("http");
console.log(http);
const fs = require("fs");
const server = http.createServer((req, res) => {
  //   console.log(req.url);
  if (req.url == "/home") {
    res.end("welcome");
  } else if (req.url == "/about") {
    res.end("aboutpage");
  } else if (req.url == "/getproductdata") {
    let str = "";
    req.on("data", (chunk) => {
      str += chunk;
    });
    req.on("close", () => {
      fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
          res.end(err);
        } else {
          const getdatafromdb = JSON.parse(data);
          console.log(getdatafromdb.products);
          res.end(JSON.stringify(getdatafromdb.products));
        }
        res.end();
      });
    });
  } else if (req.url == "/user") {
    fs.readFile("./db.json", "utf-8", (err, data) => {
      if (err) {
        res.end(err);
      } else {
        const getdatafromdb = JSON.parse(data);
        console.log(getdatafromdb.user);
        res.end(JSON.stringify(getdatafromdb.user));
      }
      res.end();
    });
  } else {
    res.end("Not Fond");
  }
});

server.listen(8090, () => {
  console.log("server is running");
});


//http://localhost:8080

