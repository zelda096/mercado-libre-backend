const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
const port = 3001;

app.use(cors());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});