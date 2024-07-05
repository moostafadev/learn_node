import * as http from "http";
import fs, { promises as fsPromises } from "fs";
import path from "path";

const PORT = 5000;

const server = http.createServer((req, res) => {
  interface IProducts {
    products: [{ id: number; title: string; description: string }];
  }
  const productsFilePath = path.join(__dirname, "data", "products.json");
  if (req.url === "/products") {
    fs.access(productsFilePath, (err) => {
      if (err) {
        console.log("Not accessable path => " + productsFilePath);
        return;
      }
      fs.readFile(productsFilePath, "utf8", (err, data) => {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(data);
        res.end();
      });
    });
  } else if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>Welcome back !</h1>");
    res.end();
  } else if (req.url === "/products/new") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`
      <html>
        <head>
          <title>Add a new product</title>
        </head>
        <body>
          <form method="POST" action="/products/add-new">
            <label for="title">Title</label>
            <br />
            <input id="title" name="title" placeholder="Product title"/>
            <br></br>
            <label for="description">Description</label>
            <br />
            <textarea id="description" name="description" placeholder="Product description"></textarea>
            <br></br>
            <button>Submit</button>
          </form>
        </body>
      </html>
      `);
    res.end();
  } else if (req.method === "POST" && req.url === "/products/add-new") {
    let body = "";
    req.on("data", (data) => {
      body += data.toString();
    });
    req.on("end", async () => {
      const data = new URLSearchParams(body);
      const title = data.get("title");
      const description = data.get("description");
      try {
        const jsonData = await fsPromises.readFile(productsFilePath, "utf8");
        const jsonProducts: IProducts = JSON.parse(jsonData);
        jsonProducts.products.push({
          id: jsonProducts.products.length + 1,
          title: title as string,
          description: description as string,
        });
        const updatedData = JSON.stringify(jsonProducts, null, 2);
        await fsPromises.writeFile(productsFilePath, updatedData, {
          flag: "w",
        });
      } catch (error) {
        console.log(error);
      }
      res.writeHead(200, { "content-type": "text/html" });
      res.write(`
        <div>
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
        `);
      res.end();
    });
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Not found page !</h1>");
    res.end();
  }
});

server.listen(PORT);

console.log(`Running Server => http://localhost:${PORT}`);
