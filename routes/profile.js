import express from 'express';
import { connect } from '../database/connection.js';

const router = express.Router();

// View profile
router.get('/', async (req, res) => {
    if (req.session.store) {
        return res.status(403).render("error", {
            title: "Error",
            errorClass: "Forbidden",
            text: `You must be a regular user to do that.`,
            user: req.session.user,
            store: req.session.store
        });
    }
    if (!req.session.user)
        return res.redirect("/login");

    //const client = await connect();
    try {
        // const result = await client.query(
        //     'SELECT user_id, username, first_name, last_name, cc_info, shipping_address FROM shipping.user WHERE user_id = $1',
        //     [req.session.user_id]
        // );
        
        // if (result.rows.length === 0) {
        //     return res.status(404).render('error', { message: 'User not found' });
        // }
        
        res.render('profile', {
            title: "User Profile",
            user: req.session.user
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).render('error', {
            title: "Error",
            message: 'Internal Server Error',
            user: req.session.user,
            store: req.session.store
        });
    } finally {
        //client.release();
    }
});

// Update profile
router.post('/update', async (req, res) => {
    if (req.session.store)
        return res.status(403).json({error: `You must be a regular user to do that`});
    if (!req.session.user)
        return res.status(403).json({error: `You must be logged in as a user to do that`});

    const { first_name, last_name, shipping_address } = req.body;
    const client = await connect();
    
    try {
        await client.query(
            'UPDATE shipping.user SET first_name = $1, last_name = $2, shipping_address = $3 WHERE user_id = $4',
            [first_name, last_name, shipping_address, req.session.user.user_id]
        );

        //Update session object
        req.session.user.first_name = first_name;
        req.session.user.last_name = last_name;
        req.session.user.shipping_address = shipping_address;
        
        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).render('error', {
            title: "Error",
            message: 'Internal Server Error',
            user: req.session.user,
            store: req.session.store
        });
    } finally {
        //client.release();
    }
});

// Update payment information
router.post('/payment', async (req, res) => {
    if (req.session.store)
        return res.status(403).json({error: `You must be a regular user to do that`});
    if (!req.session.user)
        return res.status(403).json({error: `You must be logged in as a user to do that`});

    const { cc_info } = req.body;
    const client = await connect();
    
    try {
        await client.query(
            'UPDATE shipping.user SET cc_info = $1 WHERE user_id = $2',
            [cc_info, req.session.user.user_id]
        );

        //Update session object
        req.session.user.cc_info = cc_info;
        
        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating payment info:', error);
        res.status(500).render('error', {
            title: "Error",
            message: 'Internal Server Error',
            user: req.session.user,
            store: req.session.store
        });
    } finally {
        //client.release();
    }
});

export default router;