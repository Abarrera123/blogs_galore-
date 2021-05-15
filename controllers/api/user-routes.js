const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const { update } = require('../../models/user');
const withAuth = require('../../utils/auth');

//GET request /api/users/
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});
//GET request /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const userData = User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'post_content', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        });
        if (!userData) {
            res.status(400).json({ message: 'No user found with this ID' })
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err);
    }
});

//POST request /api/users/
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username
            req.session.github = userData.github
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
//Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'No user with this email address!' })
        }
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password' });
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username
            req.session.github = userData.github
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//LOGOUT
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//UPDATE USER
router.put('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'No user found with this id' })
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) =>{
    try{
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!userData){
            res.status(400).json({ message: 'No user found with this id' })
        }
        res.status(200).json(userData)
    }catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;