import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
   
    const register = async(req, res) => {
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) { // if user exists already
            res.sendStatus(409);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        req.session["currentUser"]  = newUser;
        res.json(newUser);

    };
    
    const login = async(req, res) => { // given username and password
        const username = req.body.username;
        const password = req.body.password;
        const user = await usersDao.findUserByCredentials(username, password);
        if (user) {
            req.session["currentUser"]  = user;
            res.json(user); // display the user
        } else {
            res.sendStatus(404);
        }
    };
    // if a user has already logged in, we can retrieve the current user by using the profile
    // API as shown below
    const profile = (req, res) => {
      const currentUser = req.session["currentUser"] ;
      if (!currentUser) {
          res.sendStatus(404);
          return;
      }
      res.json(currentUser);
  };
    // logout users by destroying the session
    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = async (req, res) => {
      const currentUser = req.session["currentUser"] ;
      const user = req.body;
      console.log("inside update currentUser ", currentUser);
      if (!currentUser) {
          res.sendStatus(404);
      } else {
          const updatedUser =await usersDao.updateUser(currentUser._id, user);
          req.session["currentUser"]  = updatedUser;
          res.json(updatedUser);
      }
  };


    app.post("/api/users/register", register);
    app.post("/api/users/login",    login);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    app.put ("/api/users",          update);
}
export default AuthController;