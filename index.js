const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    { id: 1, name: 'rock' },
    { id: 2, name: 'raggae' },
    { id: 3, name: 'rap' }
]

app.get('/', (req, res) => {
    res.redirect('/api');
});

app.get('/api', (req, res) => {
    res.send('This is the home page for the Vidly API');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(gen => gen.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`Genre with ID of ${req.params.id} does not exist`);
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send(`Error: ${result.error.details[0].message}`);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(gen => gen.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`Genre with ID of ${req.params.id} does not exist`);

    const schema = { name: Joi.string().min(3).required() };
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send(`Error: ${result.error.details[0].message}`);

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(gen => gen.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`Genre with ID of ${req.params.id} does not exist`);

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    genre.status = "Genre deleted successfully";
    res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));