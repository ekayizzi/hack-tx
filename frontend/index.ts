const express = require('express');

const PORT = 3000;

const app = express();

function sendFile(res, simpleFileName: string) {
  if(simpleFileName.startsWith('/'))
    simpleFileName = simpleFileName.substring(1);
  if(simpleFileName.endsWith('/'))
    simpleFileName = simpleFileName.substring(0, simpleFileName.length - 1);
  const path: string= `${__dirname}/${simpleFileName}`;
  console.log(`sending file: ${path}`);
  res.sendFile(path);
}

app.get('/', (req, res) => {
  sendFile(res, 'index.html');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
