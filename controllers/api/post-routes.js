// Dependicies
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'created_at',
                'post_text'
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username', 'github']
                    }
                },
                {
                    module: User,
                    attributes: ['username', 'github']
                },
            ]
        });
        res.status(200).json(postData)
    } catch (err) {
        res.status(400).json(err);
    }
});
//GET post by ID
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'created_at',
                'post_content'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username', 'github']
                },
                {
                    module: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username', 'github']
                    }
                }
            ]
        });
        if (!postData) {
            res.status(400).json({ message: 'No post found with this ID' });
        }
        res.status(200).json(postData)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create(req.body)
        res.status(200).json(postData)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            post_text: req.body.post_text
        },
            {
                where: {
                    id: req.params.id
                }
            });
        if (!postData) {
            res.status(400).json({ message: 'There is no post found with this ID' })
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!postData) {
            res.status(400).json({ message: 'There is no post found with this ID' })
        }
        res.json(postData);
    }catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router; 