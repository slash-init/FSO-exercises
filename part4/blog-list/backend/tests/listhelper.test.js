const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('./list_helper')

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([{ likes: 5 }])
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  test('returns a blog with max likes', () => {
    const blogs = [
      { likes: 3 },
      { likes: 10 },
      { likes: 7 }
    ]
    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result.likes, 10)
  })
})

describe('most blogs', () => {
  test('returns author with most blogs', () => {
    const blogs = [
      { author: "Robert C. Martin" },
      { author: "Edsger W. Dijkstra" },
      { author: "Robert C. Martin" },
      { author: "Robert C. Martin" }
    ]
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 })
  })
})

describe('most likes', () => {
  test('returns author with most total likes', () => {
    const blogs = [
      { author: "Michael Chan", likes: 7 },
      { author: "Edsger W. Dijkstra", likes: 5 },
      { author: "Edsger W. Dijkstra", likes: 12 },
      { author: "Robert C. Martin", likes: 10 }
    ]
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 })
  })
})