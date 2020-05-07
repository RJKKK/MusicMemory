var Session = require('express-session')
let session = Session({
    name:'myname',
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'aabb',
    cookie:{maxAge:  1000 * 60 * 30}
})
module.exports={
    session
}