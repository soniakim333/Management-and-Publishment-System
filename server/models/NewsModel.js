const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsType = {
    title: String,
    content: String,
    //1 stands for latest news, 2 for typical cases 3 for notification
    category: Number,
    cover: String,
    //0: not publish 1:published
    isPublish: Number,
    editTime: Date,
}
const NewsModel = mongoose.model("news", new Schema(NewsType))

module.exports = NewsModel