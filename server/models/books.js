const { INTEGER, STRING, JSONB } = require('sequelize')

module.exports = (sequelize) => {
  const book = sequelize.define('book', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: STRING,
      allowNull: false
    },
    details: {
      type: JSONB,
      allowNull: true
    },
    status: {
      type: STRING,
      allowNull: false
    },
    owner: {
      type: STRING,
      allowNull: false
    },
    loanee: {
      type: STRING,
      allowNull: true
    }
  })
  return book
}
