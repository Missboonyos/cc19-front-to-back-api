# Server

## Step 1 create package json
```bash
npm init -y
```

## Step 2 install package..
```bash
npm install express nodemon cors morgan bcryptjs jsonwebtoken zod prisma
```

```bash
npx prisma init
```

## Step 3 Git
```bash
git init
git add .
git commit -m "message"
```

next step
copy code from repo
only the first time
```bash
git remote add origin https://github.com/Missboonyos/cc19-front-to-back-api.git
git branch -M main
git push -u origin main
```

When update code
```bash
git add .
git commit -m "message"
git push
```

## Step 4 update package.json
```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js" 
  },
}
```

## Step 5 codes in file index.js
```js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// Routing
const authRouter = require("./routes/auth-route");

const app = express();

// Middlewares
app.use(cors()); // Allow cross domain
app.use(morgan("dev")); // show log terminal
app.use(express.json()); // For read json

// Routing
app.use("/api", authRouter);

// Start server
const PORT = 8000
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
```

## Step 6 Create folder: Routes
```plaintext
create file: auth-route.js
```

```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');

//@ENDPOINT http://localhost:8000/api/register
router.post('/register', authControllers.register);

// export
module.exports = router
```

## Step 7 Create folder: Controllers => "Register"
```plaintext
create file: auth-controllers.js
```

```js
exports.register = (req, res, next) => {
    try {
    // code
        res.json({ message: "Hello register" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error!!" });
    }
};
```

|METHOD|ENDOINT|BODY|
|------|-------|----|
|POST|/api/register|email,password|

## Step 8 Test "Register" in Postman
```plaintext
1. Create new collection in Postman
2. Click at ... to add new folder & name it as Auth
3. Click at ... to add request & name it as Register
4. Change method from get to post
5. Copy url http://localhost:8000/api/register from auth-routes in VS code 
6. Paste url at Postman & save
7. Test it by click Send
```

## Step 9 Go to VS Code: Auth-controllers.js => "Login"
```plaintext
types the following codes:
```
```js
exports.login = (req, res, next) => {
    // code
    try {
        res.json({ message: "Hello Login" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: " Server Error!!!" });        
    }
};
```

## Step 10 go to VS code: auth-route.js
```plaintext
add the following code under @ENDPOINT
router.post("/login", authControllers.login);
```
```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');

//@ENDPOINT http://localhost:8000/api/register
router.post('/register', authControllers.register);
router.post("/login", authControllers.login);

// export
module.exports = router
```

## Step 11 Test "Login" in Postman
```plaintext
1. Go to Postman
2. add new request
3. Name it as Login
4. Change method to POST
5. Paste url http://localhost:8000/api/login & save
6. Test it by click Send
```

## Step 12 Create new folder: middlewares => HandleError
```plaintext
1. create file: error.js
2. type codes
```

```js
const handleErrors = (err, req, res, next) => {
    //code
    res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Something Wrong!!!" });
};

module.exports = handleErrors;
```

## Step 13 Go to index.js to import handleError
```js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const handleErrors = require('./middlewares/error');
// Routing
const authRouter = require("./routes/auth-route");

const app = express();

// Middlewares
app.use(cors()); // Allow cross domain
app.use(morgan("dev")); // show log terminal
app.use(express.json()); // For read json

// Routing
app.use("/api", authRouter);

//Handle errors
app.use(handleErrors)

// Start server
const PORT = 8000
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
```

## Step 14 Go to auth-controllers.js
```plaintext
1. Update codes from trycatch --> next
2. Add console.log(ccccddd) to create error
3. delete the codes: console.log & res.status where I make it comments
4. Add code next(error)
5. Test at Postman
 
exports.login = (req, res, next) => {
    // code
    try {
        console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};
```

```js
exports.register = async (req, res, next) => {
    try {
    // code
        res.json({ message: "Hello register" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error!!" });
    }
};

exports.login = (req, res, next) => {
    // code
    try {
        console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};
```

## Step 15 Go to auth-controllers.js --> to test Register function
```plaintext
1. type console.log(req.body); at step 1
2. got to Postman and test at Register
3. check result in Terminal Bash --> get {}
````

```js
exports.register = async (req, res, next) => {
    try {
    // code
    // Step 1 req.body
    console.log(req.body);
    // Step 2 validate
    // Step 3 check if this email already exsits?
    // Step 4 Encrypt bcrypt
    // Step 5 Insert to DB (database)
    // Step 6 Response to inform front-end that the registration is successful

        res.json({ message: "Hello register" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error!!" });
    }
};

exports.login = (req, res, next) => {
    // code
    try {
        console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};
```

```plaintext
4. go to Postman --> Register
5. click at Body, raw, type:json and type code
6. check result at git bash and will see the result of the following details; "email, firstname, last name, password, confirmpassword" shown.
````

```js
{
    "email" : "mrpostman@gmail.com",
    "firstname" : "postman",
    "lastname" : "delivery",
    "password" : "1234",
    "confirmPassword": "12345"
}

```

## Step 16 Go to auth-controllers.js --> Destructing req.body
```plaintext
1. const { email}
2. change console.log(req.body) --> 
    console.log(email....)

```
```js
exports.register = async (req, res, next) => {
    try {
    // code
    // Step 1 req.body
    // destructuring
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    
    console.log(req.body);
    // Step 2 validate
    // Step 3 check if this email already exsits?
    // Step 4 Encrypt bcrypt
    // Step 5 Insert to DB (database)
    // Step 6 Response to inform front-end that the registration is successful

        res.json({ message: "Hello register" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error!!" });
    }
};

exports.login = (req, res, next) => {
    // code
    try {
        console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};

```

## Step 17 Go to auth-controllers.js --> handle step 2 Validation
```plaintext
1. type codes if at step 2 validate
2. go to Postman: Register to test if our codes work by
3. comment email, firstname in Postman 
4. the result must diplay status 400 bad request
```

```js
exports.register = async (req, res, next) => {
    try {
    // code
    // Step 1 req.body
    // destructuring req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;

    console.log(email, firstname, lastname, password, confirmPassword);
    // Step 2 validate
    if (!email) {
        return res.status(400).json({ message: "Email is required!!" });
    }
    if (!firstname) {
        return res.status(400).json({ message: "firstname is required!!" })
    }
    // Step 3 check if this email already exsits?
    // Step 4 Encrypt bcrypt
    // Step 5 Insert to DB (database)
    // Step 6 Response to inform front-end that the registration is successful

        res.json({ message: "Hello register" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error!!" });
    }
};

exports.login = (req, res, next) => {
    // code
    try {
        console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};
```

## Step 18 Create folder: utils & file:createError.js
```plaintext
1. type codes
2. use createError at auth-controller.js
```

```js
const createError = (code, message) => {
    //code
    console.log("Step 1 Create Error");
    const error = new Error(message);
    error.statusCode = code;
    throw error;
};

module.exports = createError;
```

## Step 19 at auth-controllers--> import createError and change code at step 2
```plaintext
1. write code to import createError above exports.register = (req, res, next) => {}
2. edit code at step2
```

```js
const createError = require("../utils/createError");

exports.register = async (req, res, next) => {
    try {
    // code
    // Step 1 req.body
    // destructuring req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    // console.log(email, firstname, lastname, password, confirmPassword);
    // Step 2 validate
    if (!email) {
        return createError(400, "Email is required!!");
    }
    if (!firstname) {
        return createError(400, "firstname is required!!" );
    }
    // Step 3 check if this email already exsits?
    // Step 4 Encrypt bcrypt
    // Step 5 Insert to DB (database)
    // Step 6 Response to inform front-end that the registration is successful

        res.json({ message: "Hello register" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error!!" });
    }
};

exports.login = (req, res, next) => {
    // code
    try {
        console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);            
    }
};

```

## Step 20 Go to error.js
```plaintext
1.add console.log("Step3 handle error"); above res
2.add console.log(step 2) to see the route of error step 1-3 (at auth-controllers)

```

```js
const handleErrors = (err, req, res, next) => {
    //code
    console.log("Step3 handle Error");
    res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Something Wrong!!!" });
};

module.exports = handleErrors;
```

```js
const createError = require("../utils/createError");

exports.register = async (req, res, next) => {
    try {
    // code
    // Step 1 req.body
    // destructuring req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    // console.log(email, firstname, lastname, password, confirmPassword);
    // Step 2 validate
    if (!email) {
        return createError(400, "Email is required!!");
    }
    if (!firstname) {
        return createError(400, "firstname is required!!" );
    }
    // Step 3 check if this email already exsits?
    // Step 4 Encrypt bcrypt
    // Step 5 Insert to DB (database)
    // Step 6 Response to inform front-end that the registration is successful

        res.json({ message: "Hello register" });
    } catch (error) {
        console.log("step 2 catch")
        next(error);
        // console.log(error);
        // res.status(500).json({ message: "Server Error!!" });
    }
};

exports.login = (req, res, next) => {
    // code
    try {
        console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};
```

## Step 21 ZOD https://zod.dev/?id=basic-usage @ auth-route.js
```plaintext
1. go to auth-route and write const {z} after const authControllers
2. write code at //Test validator
3. add, validateWithZod(), at router.post('/register', validateWithZod(), authControllers.register);
4.add parameter (schema) at const validateWithZod and const registerScheme = z.object({})
5.test error at all data; eg. email, firstname, etc.
6.add .refine() after confirmPassword
7.edit .refine() by receiving (data)=> data.password === data.confirmPassword, {}
8.reach data to get message: firstname should be > 3 characters
9.catch error and then throw the error
10.to validate data and send error message to front-end
```
```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { z } = require("zod");

//TEST validator
const validateWithZod = () => (req,res,next) => {
    try {
        console.log("Hello middlewares")
        next();
    } catch (error) {
        next(error);        
    }
};


//@ENDPOINT http://localhost:8000/api/register
router.post('/register', validateWithZod(), authControllers.register);
router.post("/login", authControllers.login);

// export
module.exports = router
```

```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { z } = require("zod");

//TEST validator
const registerSchema = z.object({
    email: z.string().email(),
    firstname: z.string()
})

const validateWithZod = (schema) => (req,res,next) => {
    try {
        console.log("Hello middlewares");
        schema.parse(req.body)
        next();
    } catch (error) {
        next(error);
        
    }
};


//@ENDPOINT http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema), authControllers.register);
router.post("/login", authControllers.login);

// export
module.exports = router
```

```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { z } = require("zod");

//TEST validator
const registerSchema = z.object({
    email: z.string().email("Email is not correct"),
    firstname: z.string().min(3, "Firstname should be > 3 characters"),
    lastname: z.string().min(3, "Lastname should be > 3 characters"),
    password: z.string().min(6, "Password should be > 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password should be > 6 characters")
});

const validateWithZod = (schema) => (req,res,next) => {
    try {
        console.log("Hello middlewares");
        schema.parse(req.body)
        next();
    } catch (error) {
        console.log(error.errors)
        next(error);
        
    }
};


//@ENDPOINT http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema), authControllers.register);
router.post("/login", authControllers.login);

// export
module.exports = router
```

```plaintext
No.6 add .refine() after confirmPassword
```
```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { z } = require("zod");

//TEST validator
const registerSchema = z.object({
    email: z.string().email("Email is not correct"),
    firstname: z.string().min(3, "Firstname should be > 3 characters"),
    lastname: z.string().min(3, "Lastname should be > 3 characters"),
    password: z.string().min(6, "Password should be > 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password should be > 6 characters")
}).refine((data)=>console.log('customs', data))

const validateWithZod = (schema) => (req,res,next) => {
    try {
        console.log("Hello middlewares");
        schema.parse(req.body)
        next();
    } catch (error) {
        console.log(error.errors)
        next(error);
        
    }
};


//@ENDPOINT http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema), authControllers.register);
router.post("/login", authControllers.login);

// export
module.exports = router
```

```plaintext
No.7 edit .refine() by receiving (data)=> data.password === data.confirmPassword, {}
```
```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { z } = require("zod");

//TEST validator
const registerSchema = z.object({
    email: z.string().email("Email is not correct"),
    firstname: z.string().min(3, "Firstname should be > 3 characters"),
    lastname: z.string().min(3, "Lastname should be > 3 characters"),
    password: z.string().min(6, "Password should be > 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password should be > 6 characters")
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Confirm Password differs",
    path: ["confirmPassword"]
})

const validateWithZod = (schema) => (req,res,next) => {
    try {
        console.log("Hello middlewares");
        schema.parse(req.body)
        next();
    } catch (error) {
        console.log(error.errors)
        next(error);
        
    }
};


//@ENDPOINT http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema), authControllers.register);
router.post("/login", authControllers.login);

// export
module.exports = router
```

```plaintext
8.reach data to get message: firstname should be > 3 characters
```

```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { z } = require("zod");

//TEST validator
const registerSchema = z.object({
    email: z.string().email("Email is not correct"),
    firstname: z.string().min(3, "Firstname should be > 3 characters"),
    lastname: z.string().min(3, "Lastname should be > 3 characters"),
    password: z.string().min(6, "Password should be > 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password should be > 6 characters")
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Confirm Password differs",
    path: ["confirmPassword"]
})

const validateWithZod = (schema) => (req,res,next) => {
    try {
        console.log("Hello middlewares");
        schema.parse(req.body)
        next();
    } catch (error) {
        console.log(error.errors[1].message)
        next(error);
        
    }
};


//@ENDPOINT http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema), authControllers.register);
router.post("/login", authControllers.login);

// export
module.exports = router
```

```plaintext
No.9 catch error and then throw the error
```

```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { z } = require("zod");

//TEST validator
const registerSchema = z.object({
    email: z.string().email("Email is not correct"),
    firstname: z.string().min(3, "Firstname should be > 3 characters"),
    lastname: z.string().min(3, "Lastname should be > 3 characters"),
    password: z.string().min(6, "Password should be > 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password should be > 6 characters")
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Confirm Password differs",
    path: ["confirmPassword"]
})

const validateWithZod = (schema) => (req,res,next) => {
    try {
        console.log("Hello middlewares");
        schema.parse(req.body);
        next();
    } catch (error) {
        const errMsg = error.errors.map((item) => item.message);
        const errTxt = errMsg.join(",");
        const mergeError = new Error(errTxt);
        next(mergeError);        
    }
};

//@ENDPOINT http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema), authControllers.register);
router.post("/login", authControllers.login);

// export
module.exports = router
```
```plaintext
No.10 to validate data and send error message to front-end
change from this
```

```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { z } = require("zod");

//TEST validator
const registerSchema = z
    .object({
    email: z.string().email("Email is not correct"),
    firstname: z.string().min(3, "Firstname should be > 3 characters"),
    lastname: z.string().min(3, "Lastname should be > 3 characters"),
    password: z.string().min(6, "Password should be > 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password should be > 6 characters")
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Confirm Password differs",
    path: ["confirmPassword"]
})

const validateWithZod = (schema) => (req,res,next) => {
    try {
        console.log("Hello middlewares");
        schema.parse(req.body);
        next();
    } catch (error) {
        const errMsg = error.errors.map((item) => item.message);
        const errTxt = errMsg.join(",");
        const mergeError = new Error(errTxt);
        next(mergeError);        
    }
};

//@ENDPOINT http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema), authControllers.register);
router.post("/login", authControllers.login);

// export
module.exports = router
```

```plaintext
to this -->
```

```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { z } = require("zod");

//TEST validator
const registerSchema = z
    .object({
    email: z.string().email("Email is not correct"),
    firstname: z.string().min(3, "Firstname should be > 3 characters"),
    lastname: z.string().min(3, "Lastname should be > 3 characters"),
    password: z.string().min(6, "Password should be > 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password should be > 6 characters")
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Confirm Password differs",
    path: ["confirmPassword"]
})

const loginSchema = z
    .object({
    email: z.string().email("Email is not correct"),    
    password: z.string().min(6, "Password should be > 6 characters"),    
})

const validateWithZod = (schema) => (req,res,next) => {
    try {
        console.log("Hello middlewares");
        schema.parse(req.body);
        next();
    } catch (error) {
        const errMsg = error.errors.map((item) => item.message);
        const errTxt = errMsg.join(",");
        const mergeError = new Error(errTxt);
        next(mergeError);        
    }
};

//@ENDPOINT http://localhost:8000/api/register
router.post("/register", validateWithZod(registerSchema), authControllers.register);
router.post("/login", validateWithZod(loginSchema), authControllers.login);

// export
module.exports = router
```

## Step 22 create file: validator.js at folder: middlewares
```plaintext
1.Ctrl+X the following codes from auth-route.js 
2.paste them in validator.js
3.change const registerScheme to exports.registerSchema
```

```js
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
    path: ["confirmPassword"]
})

const loginSchema = z
    .object({
    email: z.string().email("Email is not correct"),    
    password: z.string().min(6, "Password should be > 6 characters"),    
})

const validateWithZod = (schema) => (req,res,next) => {
    try {
        console.log("Hello middlewares");
        schema.parse(req.body);
        next();
    } catch (error) {
        const errMsg = error.errors.map((item) => item.message);
        const errTxt = errMsg.join(",");
        const mergeError = new Error(errTxt);
        next(mergeError);        
    }
};

```

## Step 23 adjust format of auth-route.js
```plaintext
adjust format of router.post to automatically import validateWithZod,...
```

```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares/validators");


//@ENDPOINT http://localhost:8000/api/register
router.post(
    "/register", 
    validateWithZod(registerSchema), 
    authControllers.register
);
router.post("/login", validateWithZod(loginSchema), authControllers.login);

// export
module.exports = router
```

### stop here!! Code errors...pls review clip and update ###


## Step 24 ?? schema.prisma
```plaintext
Change provider = ... to mysql
```
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Profile {
  id        Int      @id @default(autoincrement())
  email     String
  firstname String
  lastname  String
  role      Role     @default(USER)
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

## Step 25 at .env

```plaintext
DATABASE_URL="mysql://root:Newmew5442@localhost:3306/landmark"
```

## Step 26 push db to MySQL Workbench
```bash
npx prisma db push
#or
npx prisma migrate dev  --name init
```

## Step 27 Create folder: configs & file: prisma.js
```js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma
```

### Command: to generate prisma i/o npx i prisma
```bash
npx prisma generate
```

## Step 28 go to auth-controller.js
```plaintext
1.const prisma
2. update codes
3. delete long codes at step 2, and edit them at step 3 to..
4. encrypt bcrypt
5. insert to DB & then go to Postman to check Register
-check DB in mySQL Workbench 
-register new user at POSTMAN and then change role from user --> admin at workbench directly

``` 

```plaintext
No. 3. delete long codes at step 2, 3 and edit them to..
```

```js
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");

exports.register = async (req, res, next) => {
    try {
    // code
    // Step 1 req.body
    // destructuring req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    // console.log(email, firstname, lastname, password, confirmPassword);
    // Step 2 validate
    if (!email) {
        return createError(400, "Email is required!!");
    }
    if (!firstname) {
        return createError(400, "firstname is required!!" );
    }
    // Step 3 check if this email already exsits?
    // Step 4 Encrypt bcrypt
    // Step 5 Insert to DB (database)
    // Step 6 Response to inform front-end that the registration is successful

        res.json({ message: "Hello register" });
    } catch (error) {
        console.log("step 2 catch")
        next(error);
        // console.log(error);
        // res.status(500).json({ message: "Server Error!!" });
    }
};

exports.login = (req, res, next) => {
    // code
    try {
        console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};

```

```plaintext
update to this -->
```
```js
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");

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
    // Step 5 Insert to DB (database)
    // Step 6 Response to inform front-end that the registration is successful

        res.json({ message: "Hello register" });
    } catch (error) {
        console.log("step 2 catch")
        next(error);
        // console.log(error);
        // res.status(500).json({ message: "Server Error!!" });
    }
};

exports.login = (req, res, next) => {
    // code
    try {
        console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};
```

```plaintext
4. encrypt bcrypt at auth-controllers.js
```

```js
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");

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

exports.login = (req, res, next) => {
    // code
    try {
        console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};
```

```plaintext
No. 5 insert to DB & then go to Postman to check Register
-check DB in mySQL Workbench 
-register new user at POSTMAN and then change role from user --> admin at workbench directly
```

```js
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");

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

exports.login = (req, res, next) => {
    // code
    try {
        console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};
```

## Step 29 go to auth-controller.js
```plaintext
work on export.login
exports.login = (req, res, next) => {    
    try {
        // Step 1 req.body
        // Step 2 Check email and password
        // Step 3 Generate token
        // Step 4 Response
```

```js
const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");

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
        console.log(isMatch);

         if(!isMatch) {
            return createError(400, "Email or password is invalid!!");
        }

        // Step 3 Generate token
        // Step 4 Response

        // console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};
```

## Step 30 go to auth-controller.js to Generate Token
```plaintext
1. Got to .env file
2. delete info above and write secret
```

```js
SECRET = cc19
DATABASE_URL="mysql://root:Newmew5442@localhost:3306/landmark"
```

```plaintext
Work on step 3 Token
```

```js
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

        // console.log(ccccddd)
        res.json({ message: "Hello Login" });
    } catch (error) {
        next(error);
        // console.log(error.message);
        // res.status(500).json({ message: " Server Error!!!" });        
    }
};
```

## Step 31 go to auth-controller.js to work on step 4 response
```js
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
```

## Step 32 exports.currentUser at auth-controller.js
```plaintext
1. add codes
2. go to auth-route.js
```

```js
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

```
```plaintext
1. at auth-route.js
add code--> router.get("/current-user", authControllers.currentUser);

2. test it at Postman
- add new request at Folder: Auth
- name it as CurrentUser // method: get
```

```js
const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth-controllers');
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares/validators");


//@ENDPOINT http://localhost:8000/api/register
router.post(
    "/register", 
    validateWithZod(registerSchema), 
    authControllers.register
);
router.post("/login", validateWithZod(loginSchema), authControllers.login);

router.get("/current-user", authControllers.currentUser);

// export
module.exports = router

```

## Step 33 Create file: user-controllers.js at folder: controllers
```js
// 1. List all users
// 2. Update Role
// 3. Delete User

exports.listUsers = async (req, res, next) => {
    // code
    try {
        res.json({message: "Hello, List Users"});
    } catch (error) {
        next(error);
    }
};

exports.updateRole = async(req, res, next) => {
    try {
        res.json({ message: "Hello, Update Role" });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
    res.json({ message: "Hello, Delete User"});
    } catch (error) {
    next(error);
    }
};

```

## Step 34 Create file: user-route.js at folder: Routes
```js
const express = require("express");
const router = express.Router();

// import controllers
const userController = require('../controllers/user-controllers');

// @ENDPOINT http://localhost:8000/api/users
router.get("/users", userController.listUsers)
router.patch("/user/update-role", userController.updateRole);
router.delete("/user/:id", userController.deleteUser)


module.exports = router;
```

## Step 35 Call function at index.js
```plaintext
const userRouter = require("./routes/user-route");

app.use("/api", userRouter);

```
```js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const handleErrors = require('./middlewares/error');
// Routing
const authRouter = require("./routes/auth-route");
const userRouter = require("./routes/user-route");

const app = express();

// Middlewares
app.use(cors()); // Allow cross domain
app.use(morgan("dev")); // show log terminal
app.use(express.json()); // For read json

// Routing
app.use("/api", authRouter);
app.use("/api", userRouter);

//Handle errors
app.use(handleErrors);

// Start server
const PORT = 8000
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));

```

## Step 36 Create new folder in POSTMAN in accordance with user-route.js
```plaintext
1. create folder: user
2. create file: List All User (get) & assign path ref. to user-route.js of each condition
    http://localhost:8000/api/users
3. create file: Update Role (patch)
    http://localhost:8000/api/user/update-role

** diff patch vs put
^ patch: frontend can send some properties to db (mySQL Workbench)
^ put: frontend must send all properties to db (mySQL Workbench)

4. Create file: Delete User (del)
http://localhost:8000/api//user/:id
ex: http://localhost:8000/api/user/123456

