const {User} = require('../models');

const userData = [
    {
        id: 1,
        username: "Test1",
        github: "testhub",
        email: "Test@test.com",
        password: "password1"
    },
    {
        id: 2,
        username: "Test2",
        github: "test2hub",
        email: "Test2@test.com",
        password: "password2"
    },
    {   
        id: 3,
        username: "Test3",
        github: "test3hub",
        email: "Test3@test.com",
        password: "password3"
    },
    {
        id:4,
        username: "Test4",
        github: "test4hub",
        email: "Test4@test.com",
        password: "password4"
    }
]
const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers;