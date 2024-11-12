import { Router } from 'express';

const universityRouter = Router();

let universities = [
  { id: 1, name: 'Technical University', location: 'Sofia' },
  { id: 2, name: 'Sofia University', location: 'Sofia' },
];

universityRouter.get('/', (req, res) => {
  res.json(universities);
});

universityRouter.post('/', (req, res) => {
  const { name, location } = req.body;
  const existingUniversity = universities.find((u) => u.name === name);
  if (existingUniversity) {
    res.status(400).json({ message: 'University with this name already exists' });
  }
  const newUniversity = {
    id: universities.length + 1,
    name,
    location,
  };
  universities.push(newUniversity);
  res.status(201).json(newUniversity);
});

universityRouter.delete('/:id', (req, res) => {
  const universityId = parseInt(req.params.id);
  const universityIndex = universities.findIndex((u) => u.id === universityId);
  if (universityIndex !== -1) {
    const deletedUniversity = universities.splice(universityIndex, 1);
    res.json(deletedUniversity[0]);
  } else {
    res.status(404).json({ message: 'University not found' });
  }
});

export default universityRouter;

