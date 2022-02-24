var mongoose = require('mongoose');

exports.isLoggedIn = async (req, res, next) => {
    const sessionID = req.headers.authorization;
    
    // search the db for the session
    const result = await mongoose.connection.collection('sessions').findOne({ _id: sessionID });

    if (result != null) {
        req.body.username = result.session.user.username;
        req.body.sessionID = sessionID;
        next();
    } else {
        return res.status(401).json({
            "error": "user is not logged in"
        })
    }
}