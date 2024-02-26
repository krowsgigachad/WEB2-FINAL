const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  pictures: [{ type: String }],
  names: {
    en: { type: String, required: true },
    anotherLanguage: { type: String, required: true }
  },
  descriptions: {
    en: { type: String, required: true },
    anotherLanguage: { type: String, required: true }
  }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
