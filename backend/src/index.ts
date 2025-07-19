import express, { response } from 'express';
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';
import { z } from 'zod';
import { Content, User } from './models/db';
import { userMiddleware } from './middlwares/middleware'
import { JWT_PASSWORD, PORT } from './config/config';


const app = express();
app.use(express.json());

const signupSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(8).max(20).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.")
})


app.post('/api/v1/signup', async function (req, res) {
    //To add: Zod Validation and bycrypt(password hash), enum response 
    // const username = req.body.username;
    // const password = req.body.password;

    const parsed = signupSchema.safeParse(req.body);

    if(!parsed.success){
        res.status(411).json({
            message: "Invalid inputs"
        });
        return;
    }

    const { username, password } = parsed.data;
    const hashedPassword = await bycrypt.hash(password, 5);

    try{
        await User.create({
        username: username,
        password: hashedPassword
    })

    res.json({
        message: "You're logged in"
    })
    } catch(e){
        res.status(411).json({
            message: "User already exist"
        })
    }

})

const signinSchema = z.object({
    username: z.string().min(3, "Username is too short").max(20, "Username is too long"),
    password: z.string().min(1, "Password is required")
})

app.post('/api/v1/signin', async function (req, res) {
    // const username = req.body.username
    // const password = req.body.password

    const parsedInput = signinSchema.safeParse(req.body);

    if(!parsedInput.success){
        res.status(403).json({
            message: "Invalid input"
        })
        return;
    }

    const {username, password} = parsedInput.data;

    const existingUser = await User.findOne({
        username,
    })

    if(!existingUser){
        res.status(403).json({
            message: "User doesn't exist!"
        })
        return
    }

    const passwordMatch = await bycrypt.compare(password, existingUser.password);

    if(passwordMatch){
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

app.post('/api/v1/content', userMiddleware,  async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;

    await Content.create({
        link,
        type,
        title: req.body.title,
        // @ts-ignore
        userId : req.userId,
        tags : []
    })

    res.json({
        message: "Content Added"
    })

})

app.get('/api/v1/content', userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;

    const content = await Content.find({
        userId: userId
    }).populate("userId", "username")

    res.json({
        content
    })
})

app.delete('/api/v1/content', userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    
    await Content.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    })

    res.json({
        message: "Content Deleted"
    })

})

// app.post('/api/v1/brain/share', (req, res) => {

// })

// app.get('/api/v1/brain/:shareLink', (req, res) => {

// })

app.listen(PORT, () => console.log(`Server running on ${PORT}`));