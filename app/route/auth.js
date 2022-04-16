const app = require('express').Router();
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(200).json({ code : 400, status:false, message:'User is not Valid'});
    }
    else {
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded) => {
            if(err) {
                return res.status(200).json({ code : 400, status:false, message:'Something Went wrong'});
            }
            else {
                req.user = decoded;
                next();
            }
        })
    }
}

module.exports = ( function () {
    
    const authController = require('./../controller/auth.controller');
    app.post('/v1/auth/register', authController.Register);
    app.post('/v1/auth/login', authController.Login);
    app.post('/v1/auth/blog', verifyToken, authController.CreateBlog);
    app.put('/v1/auth/blog',verifyToken, authController.Updateblog);
    app.get('/v1/auth/blog',verifyToken, authController.GetAllBlog);
    app.get('/v1/auth/blogByUser',verifyToken, authController.GetBlogByUserId);
    
    return app;
})();

