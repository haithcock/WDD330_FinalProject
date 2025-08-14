require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const setupViewEngine = require('./middleware/viewEngine');
setupViewEngine(app);

const bodyParsers = require('./middleware/bodyParsers');
const staticFiles = require('./middleware/staticFiles');
const errorHandler = require('./middleware/errorHandler');
app.use(bodyParsers);
app.use(staticFiles);


const indexRouter = require('./routes/index');
app.use('/', indexRouter);


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
