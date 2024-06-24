const User=require('../models/user.model');

//create and save a new user

exports.Create= (req,res) => {
//validate request

if(!req.body){
    return res.status(400).send({
        message : "please complete all field "
    });

}
//create new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        is_active:req.body.is_active,
        is_verified:req.body.is_verified
    });

    //save user bd
    user.save().then(data=>{res.send(data)}).catch(err=>{
        res.status(500).send({message:err.message || "something went wrong while creating new user"})
    })


};

//find users
exports.findAll= (req, res)=>{
    User.find().then(users=>{
        res.send(users);

    }).
    catch(err=>
        {
            res.status(500).send({message:"somthing wrongwhile getting list of users!!!!!!!!"})
        }
    )
    
}


//find user by id
exports.findById= (req, res)=>{
    User.findById(req.params.id).then(user=>{
        if(!user){
            return res.status(400)
            .send({message: "user not found with this id " + req.params.id});
        }
        res.send(user);

    }).
    catch(err=>
        {
            if(err.kind==='ObjectId'){
                return res.status(404).send({message:"Error getting user with id " + req.params.id})
            }
            res.status(500).send({message:"could not find user with id !!!!!!!!" + req.params.id})
        }
    )

};



//delete user

exports.delete= (req, res)=>{
    User.findByIdAndDelete(req.params.id).then(user=>{
        if(!user){
            return res.status(400)
            .send({message: "user not found with this id " + req.params.id});
        }
        res.send({message:"user deleted successfuly"});

    }).
    catch(err=>
        {
            if(err.kind==='ObjectId'){
                return res.status(404).send({message:"Error getting user with id " + req.params.id})
            }
            res.status(500).send({message:"could not delete user with id !!!!!!!!" + req.params.id})
        }
    )

}


//update user
exports.update= (req,res)=>{
    //validate request
if(!req.body){
    return res.status(400).send({message:"please fill all required fields"})
}

User.findByIdAndUpdate(req.params.id,{

 firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        is_active:req.body.is_active,
        is_verified:req.body.is_verified
},
{new : true}
).then((user)=>{
    if(!user){
        return res.status(404).send({message: "user not found"});
    }
    res.send(user);
}).catch(err=>
    {
        if(err.kind==='ObjectId'){
            return res.status(404).send({message:"Error getting user with id " + req.params.id})
        }
        res.status(500).send({message:"could not update user with id !!!!!!!!" + req.params.id})
    }
)


}