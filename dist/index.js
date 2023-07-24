"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Sample_data_js_1 = require("./data/Sample_data.js");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/books', (req, res) => {
    res.send(Sample_data_js_1.data);
});
app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    res.send(Sample_data_js_1.data.filter(val => val.id == parseInt(id)));
});
app.post('/books/add', (req, res) => {
    const { id, title, author, publicationYear } = req.body;
    if (id && title && author && publicationYear) {
        Sample_data_js_1.data.unshift(req.body);
        res.send('data added successfully');
    }
    else {
        res.status(400).send('how dare you not filling all feilds !!!!');
    }
});
app.put('/books/update/:id', (req, res) => {
    let existing;
    const { id, title, author, publicationYear } = req.body;
    if (id && title && author && publicationYear) {
        existing = Sample_data_js_1.data.findIndex(val => val.id === parseInt(id));
        res.send('the data modified successfully !');
    }
    else {
        res.status(400).send('the data doesnt updated !');
    }
    if (existing == undefined) {
        res.status(404).send('Book with the specified ID not found');
    }
    else {
        Sample_data_js_1.data[existing] = { id, title, author, publicationYear };
    }
});
app.delete('/books/delete/:id', (req, res) => {
    const Id = req.params.id;
    const result = Sample_data_js_1.data.findIndex(val => val.id == parseInt(Id));
    Sample_data_js_1.data.splice(result, 1);
    res.send('the book is successfully deleted ');
});
app.get('/books/callbyname', (req, res) => {
    const title = req.query.title;
    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Please provide a valid book title in the query parameter \'title\'.' });
    }
    const matchedBooks = Sample_data_js_1.data.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
    res.json(matchedBooks);
});
app.get('/books/year', (req, res) => {
    const year = req.query.year;
    if (!year || isNaN(Number(year))) {
        return res.status(400).json({ error: 'Please provide a valid publishing year in the query parameter \'year\'.' });
    }
    const publishingYear = parseInt(year);
    const matchedBooks = Sample_data_js_1.data.filter((book) => book.publicationYear === publishingYear);
    res.send(matchedBooks);
});
const server = app.listen(port, () => {
    server.timeout = 7000;
    console.log(`Server is running on port ${port}`);
});
