import { useState, useEffect } from 'react';

const INITIAL = { title: '', description: '', status: 'todo', priority: 'medium', dueDate: '', category: '' };

const TaskModal = ({ task, categories, onSave, onClose }) => {
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        category: task.category?._id || task.category || '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError('Vazifa nomi majburiy');

    setSaving(true);
    try {
      const payload = { ...form, category: form.category || undefined, dueDate: form.dueDate || undefined };
      await onSave(payload);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Saqlashda xato yuz berdi');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="card w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
        <h2 className="text-lg font-semibold mb-4">{task ? 'Vazifani tahrirlash' : 'Yangi vazifa'}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Nomi *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Vazifa nomini kiriting"
              maxLength={100}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Tavsif</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="input-field resize-none"
              placeholder="Qo'shimcha izoh..."
              maxLength={500}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="input-field">
                <option value="todo">Kutilmoqda</option>
                <option value="in-progress">Jarayonda</option>
                <option value="done">Bajarildi</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Muhimlik</label>
              <select name="priority" value={form.priority} onChange={handleChange} className="input-field">
                <option value="low">Past</option>
                <option value="medium">O'rta</option>
                <option value="high">Yuqori</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Muddat</label>
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Kategoriya</label>
              <select name="category" value={form.category} onChange={handleChange} className="input-field">
                <option value="">— Tanlash —</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Bekor qilish
            </button>
            <button type="submit" disabled={saving} className="btn-primary flex-1">
              {saving ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
