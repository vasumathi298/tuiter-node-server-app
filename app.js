import express from 'express';
import cors from 'cors';
import HelloController from "./controllers/hello-controller.js";
import UserController from './users/users-controller.js';
import TuitsController from './controllers/tuit/tuits-controller.js';
import session from "express-session";
import AuthController from './users/auth-controller.js';

const app = express();
app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
      methods: ["GET", "POST","PUT"]
    })
   );
   app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      store: new session.MemoryStore(),
    })
  );

   
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(process.env.PORT || 4000);