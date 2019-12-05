import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4466/'
})

// prisma.query  prisma.mutation prisma.subscription prisma.exists

// prisma.query.users(null, '{ id name email posts { id title } }').then((data)=>{
//     console.log( JSON.stringify(data, undefined, 2));
// });

// prisma.mutation.createPost({
//     data:{
//         title: "Balabababa!!!",
//         body: "Yoo ~",
//         published: true,
//         author:{
//             connect:{
//                 id: "ck3rc1fin000q07638en1zsne"
//             }
//         }
//     }
// }, '{ id title body published }').then((data)=>{
//     console.log(data)
// })

// prisma.mutation.updatePost({
//     where:{
//         id: "ck3fnmmk100390763lgtv82f6"
//     },
//     data:{
//         title: "ACDC"
//     }
// },'{ id }').then((data)=>{
//     return prisma.query.posts(null, '{ id title body published }')
// }).then((data)=>{
//     console.log(data)
// })