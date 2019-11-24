import uuid4 from 'uuid/v4'

const Mutation = {
    createUser(parent, args,{ db }, info){
        const emailTaken = db.users.some((user)=>{
            return user.email === args.data.email
        })

        if (emailTaken){
            throw new Error('Email taken.')
        }

        const user = {
            id: uuid4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    deleteUser(parent, args, { db, pubsub }, info){
        const userIndex = db.users.findIndex((user)=>{
            return user.id === args.id
        })

        if(userIndex === -1){
           throw new Error('User not found.') 
        }

        const deleteUsers = db.users.splice(userIndex, 1)

        // delete post and post comment
        db.posts = db.posts.filter((post)=>{
            const match = post.author === args.id

            if(match){
                db.comments = db.comments.filter((comment)=>{
                    return comment.post !== post.id
                })
            }

            return !match
        })

        // delete comments by user
        db.comments = db.comments.filter((comment)=>{
            return comment.author !== args.id
        })

        return deleteUsers[0]
    },
    updateUser(parent, args, { db }, info){
        const { id, data } = args
        const user = db.users.find((user)=>{
            return user.id === id
        })

        if(!user){
            throw new Error('User not found')
        }

        if ( typeof data.email === 'string'){
            const emailTaken = db.users.some((user)=>{
                return user.email === data.email
            })
    
            if (emailTaken){
                throw new Error('Email taken.')
            }

            user.email = data.email
        }

        if( typeof data.name === 'string'){
            user.name = data.name
        }

        if( typeof data.age != 'undefined'){
            user.age = data.age
        }

        return user         
    },
    createPost(parent, args, { db, pubsub }, info){
        const userExists = db.users.some((user)=>{
            return user.id === args.data.author
        })

        if(!userExists){
            throw new Error('User not found')
        }

        const post = {
            id: uuid4(),
            ...args.data
        }

        db.posts.push(post);

        if(args.data.published === true){
            pubsub.publish('post', {
                post:{
                    mulation: 'CREATE',
                    data: post
                } 
            })
        }

        return post
    },
    updatePost(parent, args, { db, pubsub }, info){
        const { id, data } = args
        const post = db.posts.find((post)=>{
            return post.id === id
        })
        const originalPost = { ...post }

        if(!post){
            throw new Error('Post not found')
        }

        if ( typeof data.title === 'string'){
            post.title = data.title
        }

        if ( typeof data.body === 'string'){
            post.body = data.body
        }

        if ( typeof data.published === 'boolean'){
            post.published = data.published
            
            if(originalPost.published && !post.published){
                // delete (發佈 > 不發佈)
                pubsub.publish('post', {
                    post:{
                        mulation: "DELETED",
                        data: originalPost
                    }
                })
            }else if(!originalPost.published && post.published){
                // create ( 發佈 > 不發佈)
                pubsub.publish('post', {
                    post:{
                        mulation: "CREATE",
                        data: post
                    }
                })
            }
        }else if(post.published){
            // updated (單純更新內容)
            pubsub.publish('post', {
                post:{
                    mulation: "UPDATED",
                    data: post
                }
            })
        }

        return post         
    },
    deletePost(parent, args, { db, pubsub }, info){
        const postIndex = db.posts.findIndex((post)=>{
            return post.id === args.id
        })

        if(postIndex === -1){
            throw new Error('Post not found')
        }

        const [post] = db.posts.splice(postIndex, 1)

        db.comments = db.comments.filter((comment)=>{
            return comment.post !== args.id
        })

        if(post.published){
            pubsub.publish('post', {
                post:{
                    mulation: "DELETED",
                    data: post
                }
            })
        }

        return post

    }, 
    createComment(parent, args, { db, pubsub }, info){
        const userExists = db.users.some((user)=>{
            return user.id === args.data.author
        })

        const PostExists = db.posts.some((post)=>{
            return (post.id === args.data.post && post.published)
        })
        
        if(!userExists){
            throw new Error('User not found')
        }

        if(!PostExists){
            throw new Error('Post not found')
        }

        const comment = {
            id: uuid4(),
            ...args.data
        }

        db.comments.push(comment);
        pubsub.publish(`comment ${args.data.post}`, { comment})

        return comment
    },
    deleteComment(parent, args, { db }, info){
        const commentIndex = db.comments.findIndex((comment)=>{
            return comment.id === args.id
        })

        if(commentIndex === -1){
            throw new Error('Comment not found')
        }

        const deleteComments = db.comments.splice(commentIndex, 1)

        return deleteComments[0]
    },
    updateComment(parent, args, { db }, info){
        const { id, data } = args
        const comment = db.comments.find((comment)=>{
            return comment.id === id
        })

        if(!comment){
            throw new Error('Comment not found')
        }

        if ( typeof data.text === 'string'){
            comment.text = data.text
        }

        return comment      
    }
}

export { Mutation as default}