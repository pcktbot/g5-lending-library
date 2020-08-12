const axios = require('axios')

class Goodreads {
  constructor(params) {
    this.key = params.key
    this.secret = params.secret
    this.url = 'https://www.goodreads.com'
  }

  search(phrase) {
    return axios
      .get(`${this.url}/search.xml?key=${this.key}&q=${phrase}`)
      .then(res => res.data)
  }
}

module.exports = Goodreads
