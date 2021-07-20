const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes')
const apiRoutes = require('./routes/apiRoutes.js')

//initialize app to create a port 
const app = express();
const PORT = process.env.PORT || 3000;

// sets up body parsing to route middleware

// Adding configurations for backend 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); 

// Assign routes for backend
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`))
