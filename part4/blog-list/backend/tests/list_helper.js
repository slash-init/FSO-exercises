const _ = require('lodash') //importing lodash

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((fav, blog) => fav.likes >= blog.likes ? fav : blog, blogs[0])
}

const mostBlogs = (blogs) => {
    //1. Group Blogs by Author
    const grouped = _.groupBy(blogs, 'author')
    //2. Convert to [{author, blogs}]
    const counts = _.map(grouped, (blogsList, authorName) => ({ //first parameter must be collection item and second must be the key.
        author: authorName,
        blogs: blogsList.length
    }))
    //3. return the max val obj
    return _.maxBy(counts, 'blogs')
}

const mostLikes = (blogs) => {
    const grouped = _.groupBy(blogs, 'author')

    const totalLikes = _.map(grouped, (blogsList, authorName) => ({
        author: authorName,
        likes: _.sumBy(blogsList, 'likes')
    }))

    return _.maxBy(totalLikes, 'likes')
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}