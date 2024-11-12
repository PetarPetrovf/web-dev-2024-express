import { Router } from 'express';


const userRouter = Router();

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', universityId: 1, subjects: ['Math', 'Physics'] },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', universityId: 2, subjects: ['Biology', 'Chemistry'] },
];

let universities = [
  { id: 1, name: 'Technical University', location: 'Sofia' },
  { id: 2, name: 'Sofia University', location: 'Sofia' },
];

userRouter.get('/', (req, res) => {
  const usersWithDetails = users.map(user => {
    const university = universities.find(u => u.id === user.universityId);
    const userWithDetails = { 
      ...user, 
      university,  
      subjects: user.subjects  
    };
  });
  res.json(usersWithDetails);
});

userRouter.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    const university = universities.find(u => u.id === user.universityId);
    const userWithDetails = {
      ...user,
      university, 
      subjects: user.subjects
    };
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    universityId: req.body.universityId,
    subjects: req.body.subjects || [], 
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

userRouter.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      name: req.body.name,
      email: req.body.email,
      universityId: req.body.universityId,
      subjects: req.body.subjects || users[userIndex].subjects, 
    };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

userRouter.patch('/update-subjects', (req, res) => {
  const { userId, subjects } = req.body;

  if (!subjects || !userId) {
     res.status(400).json({ message: 'Both userId and subjects are required' });
  }

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].subjects = subjects;
    res.json({ message: 'User subjects updated successfully', user: users[userIndex] });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default userRouter;
