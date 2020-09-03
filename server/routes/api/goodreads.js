const Goodreads = require('../../controllers/goodreads')
const {
  GOODREADS_KEY: key,
  GOODREADS_SECRET: secret
} = process.env
const goodreads = new Goodreads({ key, secret })

module.exports = (app) => {
  app.get('/api/v1/search', async (req, res) => {
    try {
      const books = await goodreads.search(req.query.phrase)
      res.json(books)
    } catch (err) {
      res.status(401).send('We got nothing.')
    }
  })
  app.post('/api/v1/save', async (req, res) => {
    try {
      const { body, user } = req
      // await models.library.create()
    } catch (err) {
      res.status(503).send('Trouble saving to the Database.')
    }
  })
}
