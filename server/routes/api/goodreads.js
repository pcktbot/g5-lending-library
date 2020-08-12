const Goodreads = require('../../controllers/goodreads')
const {
  GOODREADS_KEY: key,
  GOODREADS_SECRET: secret
} = process.env
const goodreads = new Goodreads(key, secret)

module.exports = (app) => {
  app.get('/api/v1/search', async (req, res) => {
    try {
      const books = await goodreads.search(req.query.phrase)
      res.send(books)
    } catch (err) {
      res.status(401).send('something not found.')
    }
  })

  // app.post()
  // app.put()
}
