import express, { response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import { z } from 'zod';
import { Content, Links, User } from './models/db';
import { userMiddleware } from './middlwares/middleware'
import { JWT_PASSWORD, PORT } from './config/config';
import { random } from './utility/util';
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cors());

enum ResponseStatus {
    SUCCESS = 200,
    INVALID_INPUT = 411,
    INVALID_CREDENTIALS = 401,
    USER_NOT_FOUND = 404,
    USER_EXISTS = 403,
    SERVER_ERROR = 500 
}


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
        res.status(ResponseStatus.INVALID_INPUT).json({
            message: "Invalid inputs"
        });
        return;
    }

    const { username, password } = parsed.data;


    try{

        const existingUser = await User.findOne({
            username
        });

        if(existingUser){
            return res.status(ResponseStatus.USER_EXISTS).json({
                message: "User already exists with this username"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await User.create({
        username: username,
        password: hashedPassword
    });
    
    return res.status(ResponseStatus.SUCCESS).json({
        message: "Signed up successfully"
    });
    } catch(e){
        return res.status(ResponseStatus.SERVER_ERROR).json({
            message: "Server error"
        });
    }

});

const signinSchema = z.object({
    username: z.string().min(3, "Username is too short").max(20, "Username is too long"),
    password: z.string().min(1, "Password is required")
})

app.post('/api/v1/signin', async function (req, res) {
    // const username = req.body.username
    // const password = req.body.password

    const parsedInput = signinSchema.safeParse(req.body);

    if(!parsedInput.success){
        res.status(ResponseStatus.INVALID_INPUT).json({
            message: "Invalid input"
        })
        return;
    }

    const {username, password} = parsedInput.data;

    try{
        const existingUser = await User.findOne({
        username,
    })

    if(!existingUser){
        return res.status(ResponseStatus.USER_NOT_FOUND).json({
            message: "User doesn't exist!"
        })
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if(!passwordMatch){
        return res.status(ResponseStatus.INVALID_CREDENTIALS).json({
            message: "Incorrect Credentials"
        })
    }

    const token = jwt.sign({
        id: existingUser._id
    }, JWT_PASSWORD)


    return res.status(ResponseStatus.SUCCESS).json({
        message: "Signin Successful",
        token
    })
    } catch(e){
        return res.status(ResponseStatus.SERVER_ERROR).json({
            message: "Something went wrong. Please try again later."
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

app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
    const share = req.body.share;

    if(share){
        const existingLink = await Links.findOne({
            // @ts-ignore
            userId: req.userId
        })

        if(existingLink){
            return res.json({
                hash: existingLink.hash
            })
        }

        const hash = random(11);
        await Links.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })

        res.json({
        message: "/share/" + hash,
    })
    }
    else {
        await Links.deleteOne({
            // @ts-ignore
            userId: req.userId
        })

        res.json({
        message: "Link Removed",
    })
    }

    
})

app.get('/api/v1/brain/:shareLink', async (req, res) => {
    const hash = req.params.shareLink;

    const link = await Links.findOne({
        hash
    })

    if(!link){
       return res.status(ResponseStatus.INVALID_INPUT).json({
            message: "Invalid Inputs"
        })
    } 

    //userId
    const content = await Content.findOne({
        userId: link.userId
    })

    const user = await User.findOne({
        _id: link.userId
    })

    if(!user){
        return res.status(ResponseStatus.USER_NOT_FOUND).json({
            message: "User not found"
        })
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(PORT, () => console.log(`Server running on ${PORT}`));