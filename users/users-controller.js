import people from './users.js'
let users = people

const UserController = (app) => {
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
  }
  const createUser = async (req, res) => {
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser);
  }
  const updateUser =async (req, res) => {
    const userId = req.params['uid'];
    const status = await usersDao.updateUser(userId, req.body);
    const user = await usersDao.findUserById(userId);
    req.session["currentUser"] = user;
    res.json(status);
  
   }
   
   
  const deleteUser = async (req, res) => {
    const userId = req.params['uid'];
    const status = await usersDao.deleteUser(userId);
    res.sendStatus(status);
  }
  
  
  
const findUserById = async (req, res) => {
    const userId = req.params.uid;
    const user = await usersDao.findUserById(userId);

    res.json(user);
  }
const findUsers = (req, res) => {
    const type = req.query.type
    if(type) {
      const usersOfType = users
        .filter(u => u.type === type)
      res.json(usersOfType)
      return
    }
    res.json(users)
  }
  
  
export default UserController

