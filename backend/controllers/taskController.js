import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const task = new Task({ title, description, status, userId: req.userId });
  await task.save();
  res.status(201).json({ message: 'Task created' });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findOneAndDelete({ _id: id, userId: req.userId });
  res.json({ message: 'Task deleted' });
};
