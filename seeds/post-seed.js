const { Post } = require('../models');

const postData = [
    {
        title: "test1",
        post_content: "Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem.",
        user_id: 1
    },
    {
        title: "test2",
        post_content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        user_id: 2
    },
    {
        title: "test3",
        post_content: "Sed quibusdam recusandae alias error harum maxime adipisci amet laborum",
        user_id: 3

    },
    {
        title: "test4",
        post_content: "Quo neque error repudiandae fuga? Ipsa laudantium molestias eos",
        user_id: 4
    }
    
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;