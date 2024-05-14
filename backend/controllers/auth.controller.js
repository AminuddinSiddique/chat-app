import User from "../modules/user.model.js"

export const signup = async (req,res) => {
    try{

        const {fullname,username,password,confirmPassword,gender} = req.body

        if(password != confirmPassword){
            return res.status(400).json({error:"password don't match"})
        }

        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({error:"user already exist"})
        }

        // HASH PASSWORD HERE

        const boyProfilePic =  `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic =  `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password,
            gender, 
            profilePic : gender == 'Male' ? boyProfilePic : girlProfilePic
        })

        await newUser.save();
        
        res.status(201).json({
            _id : newUser._id,
            fullname : newUser.fullname,
            username : newUser.usernmae,
            profilePic : newUser.profilePic
        })

    }catch(error){
        console.log("Error in signup controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const login = (req,res) => {
    res.send('inside login');
}

export const logout = (req,res) => {
    res.send('inside logout');
}