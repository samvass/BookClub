var mongoose = require('mongoose');

exports.isLoggedIn = async (req, res, next) => {
    const sessionID = req.body.sessionID;

    // search the db for the session
    const result = await mongoose.connection.collection('sessions').findOne({ _id: sessionID });

    if (result != null) {
        console.log("Authenticated");
        req.body.username = result.session.user.username;
        next();
    } else {
        console.log("Not authenticated");
        return res.status(401).json({
            "error": "user is not logged in"
        })
    }
}