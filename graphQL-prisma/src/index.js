import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvees/Query'
import Mutation from './resolvees/Mutation'
import Subscription from './resolvees/Subscription'
import Comment from './resolvees/Comment'
import User from './resolvees/User'
import Post from './resolvees/Post'
import './prisma'

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers:{
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context:{
        db,
        pubsub
    }
})

server.start(() => {
    console.log('The server is up!')
})