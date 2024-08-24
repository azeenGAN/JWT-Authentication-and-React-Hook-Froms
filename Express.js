import express from "express"
import CORS from "cors";
import { connectToMongoDB, closeConnection} from './db.js'
import dotenv from "dotenv"
import jwt from 'jsonwebtoken';
import {funcToSendMail} from './Mailer.js'


dotenv.config()

const app = express()
const port = 3000
let db, authCollection, formDataCollection

async function dbConnection() {
  try{
    db= await connectToMongoDB('authentication');
  
    authCollection=  db.collection('authentication')//authentication collection reference
    formDataCollection=  db.collection('formData')//Form datacollection reference
  }
  
  catch(error){
   console.log('Unable to connect with Collections', error)
  }
}
dbConnection();

const corsConfigure={
  origin:'http://localhost:5173'
}

app.use(CORS(corsConfigure))
app.use(express.json());

const authenticateJWT = (req, res) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      res.status(200).json({ message: 'Authentication successful', user })
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

app.get('/protected', (req,res)=>authenticateJWT(req, res));

app.post('/signup', async (req, res) => {

try{
  const { email } = req.body;
  
   let checkCredientials= await authCollection.findOne({email}) 
   
  if(checkCredientials){
    return res.status(400).send({message: 'Your credientials already exist, Go to login page '})
    }
  else {
    await authCollection.insertOne(req.body)
    return res.send({message: 'Thankyou , you can login now. '})
  }
 s

}
catch(error){
  res.status(500).send({message:`${error.message}`})
}
})

//login routes

app.post('/login', async (req, res) => {

  try{
    const { email,password } = req.body;
    
    let user= await authCollection.findOne({email}) 
         
    if(!user){
      return res.status(400).send({message: 'Wrong email provided. '})
      }
    else if(password!==user.password){
      return res.status(400).send({message: 'Wrong password provided. '})
      }
      const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '1h' });
      return res.json({ token });
    
    
    
  }
  catch(error){
    res.status(500).send({message:`${error.message}`})
  }
  })
  



//formdata handling routes

app.use('/form',(req,res,next)=>{
delete req.body.confirmPassword
req.body.date= new Date
next()
})

app.post('/form', async (req, res) => {
  const formData=req.body
  const [usermail, username, date]= [req.body.email, req.body.Lastname, req.body.date]
  
  formDataCollection.insertOne(formData)
  .then(()=> funcToSendMail(usermail, username, date))
  .then(()=>{
    res.send({message: `Thankyou ${req.body.Lastname}, your information has been submitted `})
    console.log(req.body)
  }) 
  .catch((error)=>{
    res.status(500).json(error)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const shutdown = async () => {
    console.log('Shutting down...');
    await closeConnection();
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  };
  
  // Catch termination signals
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
