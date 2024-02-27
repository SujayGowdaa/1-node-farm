const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replceTemplate'); // while using require module there is an exeption, which is, we can use "." to automatically point the absolute path of the location where the module is present insetad of "__dirname"

// The path returned by __dirname is an absolute path, not relative to the current working directory

// Absolute Path:
// An absolute path provides the full location of a file or directory from the root directory of the file system.

// Relative Path:
// A relative path specifies the location of a file or directory relative to the current working directory.

// // Non blocking, Asynchrous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   console.log(data1, 'non-blocking');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2, 'non-blocking');
//     fs.writeFile(
//       `./txt/final.txt`,
//       `This is overwritten file: \n${data1}\n${data2}`,
//       'utf-8',
//       (err) => {
//         if (err) return console.log(err);
//         console.log('File overwritten, "non-blocking"');
//       }
//     );
//   });
// });

// // Blocking, Synchronous way
// const helloWorld = 'Hello World!';
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// const textOut = `This is what we wrote in a new file: ${textIn}.\nCreated on ${Date()}`;
// fs.writeFileSync('./txt/output.text', textOut);
// console.log('File written complete, blocking code');

// Server

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Template Overview
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);

// Product Overview
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

// Template Overview
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/') {
    res.end('Hello from the server )');

    // OVERVIEW
  } else if (pathname === '/overview') {
    res.writeHead(200, {
      'content-type': 'text/html',
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // PRODUCT
  } else if (pathname === '/product') {
    const product = dataObj[query.id];
    res.writeHead(200, {
      'content-type': 'text/html',
    });
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'content-type': 'application/json',
    });
    res.end(card);

    // TEST
  } else if (pathname === '/test') {
    res.end('HELLO AGAIN');

    // NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page Not Found (</h1>');
  }
});

server.listen(8000, () => {
  console.log('Server running');
});
