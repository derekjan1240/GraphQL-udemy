// Demo user data
const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '3'
}, {
    id: '12',
    title: 'Programming Music',
    body: 'Hakulamatata',
    published: false,
    author: '2'
}]

const comments = [{
    id: "1",
    text:"Comment no 1",
    author: '1',
    post: "10"
}, {
    id: "11",
    text:"Comment no 2",
    author: '2', 
    post: "11"
}, {
    id: "22",
    text:"Comment no 3",
    author: '1',
    post: "12"
}]

const db = {
    users,
    posts,
    comments
}

export {db as default}