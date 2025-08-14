// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import middleware
const bodyParsers = require('./middleware/bodyParsers');
const staticFiles = require('./middleware/staticFiles');
const errorHandler = require('./middleware/errorHandler');
const setupViewEngine = require('./middleware/viewEngine');

// Apply middleware
app.use(bodyParsers);
app.use(staticFiles);
setupViewEngine(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});