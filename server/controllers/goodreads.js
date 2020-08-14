const axios = require('axios')
const { xmlDataToJSON } = require('xml-to-json-promise')

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
      .then(res => this.parseXml(res))
      .then(res => this.getTitles(res))
  }

  parseXml(xml) {
    return xmlDataToJSON(xml)
  }

  getTitles(res) {
    const list = res.GoodreadsResponse.search[0].results[0].work
      .map((w) => {
        return {
          title: w.best_book[0].title[0],
          author: w.best_book[0].author[0].name,
          imgUrl: w.best_book[0].image_url[0],
          thumbnail: w.best_book[0].small_image_url[0]
        }
      })
    console.log({ list })
    return list
  }
}

module.exports = Goodreads
