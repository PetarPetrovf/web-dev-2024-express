import express, { Request, Response } from 'express';
import { db } from '../database';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, universityId, subjectId } = req.body;
    const university = await db.models.University.findByPk(universityId);

    if (!university) {
      res.status(404).json({ error: 'University not found' });
      return;
    }

    if (await db.models.User.findOne({ where: { email } })) {
      throw new Error("User already exists.")
    }

    const subject = await db.models.Subject.findByPk(subjectId);
 
    if (!subject) {
      res.status(404).json({ error: 'Subject not found' });
      return;
    }

    const user = await db.models.User.create({ name, email, universityId });
    await user.addSubject(subject);

    const userWithSubjects = await db.models.User.findOne({
    where: { id: user.id },
      include: {
        model: db.models.Subject,
        as: 'subjects',
      },
});

    res.status(201).json(userWithSubjects);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await db.models.User.findAll({
      include: {
        model: db.models.University,
        as: 'university',
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/subject', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { subjectId } = req.body;

    const user = await db.models.User.findByPk(userId, {
      include: {
        model: db.models.Subject,
        as: 'subjects',
      },
});

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const subject = await db.models.Subject.findByPk(subjectId);
  if (!subject) {
    res.status(404).json({ error: 'Subject not found' });
    return;
  }

  await user.setSubjects([subject]);

  const updatedUser = await db.models.User.findByPk(userId, {
    include: {
      model: db.models.Subject,
      as: 'subjects',
  },
  });

  res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
