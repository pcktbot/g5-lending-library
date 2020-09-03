const Goodreads = require('../../controllers/goodreads')
const models = require('../../models')
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

  app.get('/api/v1/library', async (req, res) => {
    const books = await models.book.findAll()
    res.json(books)
  })

  app.post('/api/v1/save', async (req, res) => {
    try {
      console.log(req.query)
      const { owner, title, status } = req.query
      const record = await models.book.findOrCreate({
        defaults: {
          owner,
          title,
          status
        },
        where: { title }
      })
      res.json(record)
    } catch (err) {
      console.error(err)
      res.status(503).send('Trouble saving to the Database.')
    }
  })
}
