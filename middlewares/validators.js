const { z } = require("zod");

//TEST validator
exports.registerSchema = z
    .object({
    email: z.string().email("Email is not correct"),
    firstname: z.string().min(3, "Firstname should be > 3 characters"),
    lastname: z.string().min(3, "Lastname should be > 3 characters"),
    password: z.string().min(6, "Password should be > 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password should be > 6 characters")
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Confirm Password differs",
    path: ["confirmPassword"],
});

exports.loginSchema = z.object({
    email: z.string().email("Email is not correct"),    
    password: z.string().min(6, "Password should be > 6 characters"),    
})

exports.validateWithZod = (schema) => (req,res,next) => {
    try {
        console.log("Hello middlewares");
        schema.parse(req.body);
        next();
    } catch (error) {
       console.log(error)
        const errMsg = error.errors.map((item) => item.message);
        const errTxt = errMsg.join(",");
        console.log("errTxt",errTxt)
        const mergeError = new Error(errTxt);
        next(mergeError);        
    }
};