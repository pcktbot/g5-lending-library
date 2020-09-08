const Goodreads = require('../../controllers/goodreads')
const models = require('../../models')
const { Op } = models.Sequelize
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

  app.put('/api/v1/book/:id', async (req, res) => {
    console.log(req.params.id)
    const book = await models.book.findOne({ where: { id: req.params.id } })
    await book.update({
      status: 'deleted'
    })
    res.sendStatus(200)
  })

  app.get('/api/v1/library', async (req, res) => {
    const books = await models.book.findAll({
      where: { status: { [Op.not]: 'deleted' } }
    })
    res.json(books)
  })

  app.post('/api/v1/save', async (req, res) => {
    try {
      const {
        owner,
        book,
        status
      } = req.body
      console.log({ owner, book, status })
      const record = await models.book.findOrCreate({
        defaults: {
          owner,
          title: book.title,
          details: {
            imgUrl: book.imgUrl
          },
          status
        },
        where: { title: book.title }
      })
      res.json(record)
      // res.sendStatus(201)
    } catch (err) {
      console.error(err)
      res.status(503).send('Trouble saving to the Database.')
    }
  })
}
