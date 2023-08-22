import express from 'express';
import { data } from './data/Sample_data.js';
const app = express();
const port = process.env.port || 3000;
app.use(express.json());


app.get('/books', (req, res) => {

    res.send(data)
})
app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    res.send(data.filter(val => val.id == parseInt(id)))
})

app.post('/books/add', (req, res) => {

    const id = req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    const publicationYear = req.body.publicationYear;

    if (id && title && author && publicationYear) {
        data.unshift(req.body);
        res.send('Data added successfully');
    } else {
        res.status(400).send('Please fill all fields.');
    }
});

app.put('/books/update/:id', (req, res) => {
    let existing;
    const { id, title, author, publicationYear } = req.body;

    if (id && title && author && publicationYear) {
        existing = data.findIndex(val => val.id === parseInt(id))
        res.send('the data modified successfully !')
    } else {
        res.status(400).send('the data doesnt updated !')
    }
    if (existing == undefined) {
        res.status(404).send('Book with the specified ID not found')
    }
    else {
        data[existing] = { id, title, author, publicationYear };
    }
})
app.delete('/books/delete/:id', (req, res) => {
    const Id = req.params.id;


    const result = data.findIndex(val => val.id == parseInt(Id));
    data.splice(result, 1);
    res.send('the book is successfully deleted ')

})

  
  app.get('/books/callbyname', (req, res) => {
      const title = req.query.title as string;
      console.log("tested");
      if (!title || title.trim() === '') {
          return res.status(400).json({ error: 'Please provide a valid book title in the query parameter \'title\'.' });
      }
  
      const matchedBooks = data.filter((book) => {
          console.log('Checking:', book.title); // Debug log to check which books are being compared
          return book.title.includes(title);
      });
  
      console.log('Matched Books:', matchedBooks); // Debug log to see the matched books
      res.send(matchedBooks);
  });
  app.get("/health",(req ,res)=>{
    res.sendStatus(200);
  })

  app.get('/books/year', (req, res) => {
    console.log('Received request for /books/year');

    const year = Number(req.query.year);

    if (isNaN(year)) {
        console.log('Invalid year parameter:', req.query.year);
        return res.status(400).json({ error: 'Please provide a valid publishing year in the query parameter \'year\'.' });
    }

    console.log('Valid year parameter:', year);

    const matchedBooks = data.filter((book) => book.publicationYear === year);

    console.log('Matched Books:', matchedBooks);

    res.send(matchedBooks)})

  


const server = app.listen(port, () => {
    server.timeout = 7000;
    console.log(`Server is running on port ${port}`);
});
