const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

// App
const app = express()
const port = '4000';

// cors
app.use(cors())

// Morgan
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

// First route
app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})
// Starting server
app.listen(port, () => {
    console.log(`Server listening on the port::::::${port}`);
});