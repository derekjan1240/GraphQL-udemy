import { GraphQLServer } from 'graphql-yoga'
import db from './db'
import Query from './resolvees/Query'
import Mutation from './resolvees/Mutation'
import Comment from './resolvees/Comment'
import User from './resolvees/User'
import Post from './resolvees/Post'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers:{
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context:{
        db
    }
})

server.start(() => {
    console.log('The server is up!')
})