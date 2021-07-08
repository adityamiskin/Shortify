const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

mongoose
  .connect('mongodb://localhost:27017', {
    dbName: 'urlShortner',
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Mongoose connected'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find();
  const id = await ShortUrl.find();
  res.render('index', { shortUrls: shortUrls });
});

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect('/');
});

app.post('/delete', async (req, res) => {
  await ShortUrl.deleteOne({ id: req.body.id });
  res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`server running on 8000!!`);
});
