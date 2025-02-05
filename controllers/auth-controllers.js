const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    try {
    // code
    // Step 1 req.body
    // destructuring req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    // console.log(email, firstname, lastname, password, confirmPassword);
    // Step 2 validate    
    // Step 3 check if this email already exsits?
    const checkEmail = await prisma.profile.findFirst({
        where: {
            email: email,
        },
    });
    console.log(checkEmail)
    if(checkEmail) {
        return createError(400, "Email already exists");
    }
    // Step 4 Encrypt bcrypt
    // const salt = bcrypt.genSaltSync(10)
    // const hashedPassword = bcrypt.hashSync(password,salt)
    // console.log(hashedPassword);

    // or this way step 4   
    const hashedPassword = bcrypt.hashSync(password,10)
    console.log(hashedPassword);
    // Step 5 Insert to DB (database)
    const profile = await prisma.profile.create({
        data: {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword,
        },
    });
    // Step 6 Response to inform front-end that the registration is successful

        res.json({ message: "Hello register" });
    } catch (error) {
        console.log(error)
        console.log("step 2 catch")
        next(error);
        // console.log(error);
        // res.status(500).json({ message: "Server Error!!" });
    }
};

exports.login = async (req, res, next) => {
    // code
    try {
        // Step 1 req.body
        const { email, password } = req.body;
        // console.log(email, password);
        // Step 2 Check email and password
        const profile = await prisma.profile.findFirst({
            where: {
                email: email,
            },
        });
        // console.log(profile);
        if (!profile) {
            return createError(400, "Email or password is invalid!!");
        }
        const isMatch = bcrypt.compareSync(password, profile.password)

        if(!isMatch) {
            return createError(400, "Email or password is invalid!!");
        }
        // Step 3 Generate token
        const payload = {
            id: profile.id,
            email: profile.email,
            firstname: profile.firstname,
            lastname: profile.lastname,
            role: profile.role,
        };
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1d",
        })
        console.log(token);
        // Step 4 Response       
        res.json({ 
            message: "Login Success",
            payload: payload,
            token: token,
        });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};

exports.currentUser = async (req, res, next) => {
    try {
        res.json({ message: "Hello, current user"});
    } catch (error) {
        next(error);
    }

};