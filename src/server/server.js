const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const commands = require('./data/commands.json');

router.get('/api', (req, res) => {
  res.json({
    data: commands,
  });
});

router.post('/api', (req, res) => {
  const commandText = req.body.text;
  const [fileName, filePath] = ['commands.sh', 'src/server/data/'];
  fs.writeFile(filePath + fileName, commandText, (err) => {
    if (err) throw err;
    console.log('File saved!');
  });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server starting  on port ${PORT}`);
});

app.use('/', router);
