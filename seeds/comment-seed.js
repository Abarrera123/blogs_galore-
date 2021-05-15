const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        comment_text: "TEST COMMENT 1"
    },
    {
        user_id: 1,
        post_id: 2,
        comment_text: "TEST COMMENT 2"
    },
    {
        user_id: 2,
        post_id: 3,
        comment_text: "TEST COMMENT 3"
    },
    {
        user_id: 2,
        post_id: 4,
        comment_text: "TEST COMMENT 4"
    },
    {
        user_id: 3,
        post_id: 5,
        comment_text: "TEST COMMENT 5"
    },
    {
        user_id: 3,
        post_id: 1,
        comment_text: "TEST COMMENT 6"
    },
    {
        user_id: 4,
        post_id: 2,
        comment_text: "TEST COMMENT 7"
    },
    {
        user_id: 4,
        post_id: 3,
        comment_text :"TEST COMMENT 8"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;