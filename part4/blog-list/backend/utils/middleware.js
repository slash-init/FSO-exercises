const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }

    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' })
    }

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformed id' })
    }

    if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }

    response.status(500).json({ error: error.message })

    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    else {
        request.token = null
    }

    next()
}

const userExtractor = async (request, response, next) => {
    try {
        const token = request.token
        if (!token) {
            request.user = null
            return next()
        }

        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!decodedToken.id) {
            request.user = null
            return response.status(401).json({ error: 'token invalid' })
        }

        const user = await User.findById(decodedToken.id)
        request.user = user
        return next()
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    errorHandler, tokenExtractor, userExtractor
}
