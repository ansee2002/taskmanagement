import { useEffect, useState } from 'react';
import API from '../axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'pending' });

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch {
      toast.error('Failed to fetch tasks');
    }
  };

  const addTask = async (e) => {  
    e.preventDefault();
    try {
      await API.post('/tasks', form);
      toast.success('Task added');
      setForm({ title: '', description: '', status: 'pending' });
      fetchTasks();
    } catch {
      toast.error('Failed to add task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      fetchTasks();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>

      <form onSubmit={addTask} className="mb-6">
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="p-2 border mr-2 rounded" />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required className="p-2 border mr-2 rounded" />
        <select name="status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="p-2 border mr-2 rounded">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      {tasks.map((task) => (
        <div key={task._id} className="p-4 mb-2 border rounded flex justify-between items-center bg-white">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <span className="text-sm text-gray-500">Status: {task.status}</span>
          </div>
          <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
 