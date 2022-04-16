const user = require('./../models/auth');
const blog = require('./../models/blog');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

exports.Register = async (req,res) => {
    try {

        let {email, password, firstname, lastname, dob, role } = req.body;  
        let encryPassword = md5(password);
        let checkEmail = await user.findOne({ email:email }).exec();

        if(checkEmail) {
            return res.status(200).json({ code : 204, status:true, message:'email already available'});
        } else {
            let saveData = {
                email:email,
                password:encryPassword,
                firstname:firstname,
                lastname:lastname,
                dob:dob,
                role:role
            }
            let new_user = new user(saveData);
              
            new_user.save(function(err,result){
                if (err){
                    return res.status(200).json({ code : 400, status:false, message:'Something went wrong.'});
                }
                else{
                    return res.status(200).json({ code : 200, status:true, message:'Register successfully'});
                }
            })
        }

        // res.status(200).json({ 'message':'Register api call' });
    } catch (error) {
        console.log(error,"catch error");
    }
}

exports.Login = async (req,res) => {
    try {

        let {email, password } = req.body;  
        let encryPassword = md5(password);
        let checkEmail = await user.findOne({ email:email }).exec();

        if(checkEmail) {
            if(checkEmail.password == encryPassword) {
                const token = jwt.sign({ id : checkEmail._id },process.env.SECRET_KEY)   
                return res.status(200).json({ code : 200, status:true, message:'Login Successfully',data: { user_data:checkEmail,token:token }});
            }
            else {
                return res.status(200).json({ code : 204, status:true, message:'Email and password does not match'});
            }
        } else {
            return res.status(200).json({ code : 204, status:true, message:'User is not register'});
        }
    } catch (error) {
        console.log(error,"catch error");
    }
}

exports.CreateBlog = async (req,res) => {
    try {
        let { title, description, date, status } = req.body;  
        let saveData = {
            title:title,
            userId:req.user.id,
            description:description,
            date:date,
            status:status,
        }
        let new_blog = new blog(saveData);
          
        new_blog.save(function(err,result){
            if (err){
                return res.status(200).json({ code : 400, status:false, message:'Something went wrong.'});
            }
            else{
                return res.status(200).json({ code : 200, status:true, message:'Blog created...'});
            }
        })
    } catch (error) {
        console.log(error,"catch error");
    }
}

exports.Updateblog = async (req,res) => {
    try {

        let { title, description, date, status,id } = req.body;  
        const filter = { _id: id};
        const updateData = {
            title:title,
            description:description
        };
        blog.updateOne(filter,updateData, function( err,result ) {
            if (err) {
                return res.status(200).json({ code : 400, status:false, message:'Something went wrong'});
            } else {
                return res.status(200).json({ code : 200, status:true, message:'Blog Updated...'});
            }
        });
    } catch (error) {
        console.log(error,"catch error");
    }
}

exports.GetAllBlog = async (req,res) => {
    try {
        let findBlog = await blog.find({}).exec();

        if(findBlog.length > 0 ) {
            return res.status(200).json({ code : 200, status:true, message:'All Blog ',data: findBlog });
        } else {
            return res.status(200).json({ code : 204, status: false, message:'No Blog Found',data: findBlog });
        }
    } catch (error) {
        console.log(error,"catch error");
    }
}

exports.GetBlogByUserId = async (req,res) => {
    try {
        let findBlog = await blog.find({ userId: req.user.id }).exec();

        if(findBlog.length > 0 ) {
            return res.status(200).json({ code : 200, status:true, message:'All Blog By User ',data: findBlog });
        } else {
            return res.status(200).json({ code : 204, status: false, message:'No Blog Found',data: findBlog });
        }
    } catch (error) {
        console.log(error,"catch error");
    }
}