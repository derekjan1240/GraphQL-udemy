import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4466/'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

const createPostForUser = async (authorId, data) =>{
    const isUserExists = await prisma.exists.User({ id: authorId })

    if(!isUserExists){
        throw new Error('User not found!');
    }

    const post = await prisma.mutation.createPost({
        data: {
            ... data,
            author:{
                connect:{
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts { id title body published } } }')

    return post.author
}

// createPostForUser("ck49f0wkp000c0763pid5w8h1", {
//     title: "Number Girl is best!",
//     body: "Yee ~",
//     published: true
// }).then((user)=>{
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error)=>{
//     console.log(error)
// })

const updatePostForUser = async (postId, data) => {
    const isPostExists = await prisma.exists.Post({ id: postId })

    if(!isPostExists){
        throw new Error('Post not found!');
    }

    const post = await prisma.mutation.updatePost({
        where:{
            id: postId
        },  
        data, 
    },'{ author { id name email posts { id title body published } } }')

    return post.author
}

// updatePostForUser('ck49fks8d000n0763tclm3o62', {
//     title: 'MCR is coming back !!!!',
//     body: 'welcome back !!!',
//     published: true
// }).then((user)=>{
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error)=>{
//     console.log(error)
// })