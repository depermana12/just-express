import { createServer } from "http";
import { readFileSync } from "fs";

// the http module has createServer method
// takes 1 args
// 1 callback, calback, has 2 args: req, res

const server = createServer((req, res) => {
  // there is url properties inside req
  console.log(req.url);

  // create route from scratch
  if (req.url === "/") {
    //   console.log(req);
    // res is our server or responding to the requester
    // http message consist of
    // 1. start line
    // 2. header
    // 3. body

    // the start line is taken care from node

    // writeHead takes 2 args:
    // 1. status code
    // 2. objext for the mime-type
    res.writeHead(200, {
      "content-type": "text/html",
    });

    // write take body
    // res.write("<h1>Welcome to the homepage</h1>");
    const homePage = readFileSync("index.html", "utf8");
    res.write(homePage);
    res.end();
  } else if (req.url === "/about") {
    // header
    res.writeHead(200, {
      "content-type": "text/html",
    });

    // body
    res.write("<h1>About me</h1>");
    res.end();
  } else if (req.url === "/express.png") {
    const image = readFileSync("./express.png");
    res.writeHead(200, {
      "content-type": "image/png",
    });

    // body
    res.write(image);
    res.end();
  } else if (req.url === "/styles.css") {
    const css = readFileSync("./styles.css");
    res.writeHead(200, {
      "content-type": "text/css",
    });

    // body
    res.write(css);
    res.end();
  } else {
    // header
    res.writeHead(404, {
      "content-type": "text/html",
    });

    // body
    res.write("<h1>Page not found</h1>");
    res.end();
  }
});

// createServer return an object with a listen method
// listen takes 1 args:
// 1. port to listen for http ttraffic on
server.listen(5000);
