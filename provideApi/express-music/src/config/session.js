var Session = require('express-session')
let session = Session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'aabb',
    cookie:{maxAge:60 * 1000 * 300}
})
module.exports={
    session
}