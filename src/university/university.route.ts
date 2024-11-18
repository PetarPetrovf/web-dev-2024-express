import { Router } from 'express';

const universityRouter = Router();

let universities = [
  { id: 1, name: 'TU - Sofia' },
  { id: 2, name: 'Sofia University' },
];

universityRouter.get('/', (req, res) => {
    res.json(universities);
  });

  universityRouter.get('/:id', (req, res) => {
    const universityId = parseInt(req.params.id);
    const university = universities.find((u) => u.id === universityId);
    if (university) {
      res.json(university);
    } else {
      res.status(404).json({ message: 'University not found' });
    }
  });

  universityRouter.post('/', (req, res) => {
    const newUniversity = {
      id: universities.length + 1,
      name: req.body.name,
      location: req.body.location,
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
