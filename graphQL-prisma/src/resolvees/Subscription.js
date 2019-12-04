const Subscription = {
    // Allows us to get new comments for a particular post
    comment: {
        subscribe(parent, { postId }, { pubsub, db }, info){
            const post = db.posts.find((post)=>{
                return post.id === postId && post.published
            })

            if(!post){
                throw new Error('Post not found')
            }

            return pubsub.asyncIterator(`comment ${postId}`)
        }
    },
    // Get new post that are published  
    post: {
        subscribe(parent, args, { pubsub }, info){
            return pubsub.asyncIterator('post')
        }
    }
}

export { Subscription as default }