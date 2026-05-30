import { useEffect, useState } from 'react';
import { useCategories } from '../hooks/useCategories';

const COLORS = ['#6366f1', '#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];
const ICONS = ['📁', '💼', '🏠', '🎯', '📚', '🛒', '💡', '⚡', '🎨', '🏋️'];

const INITIAL = { name: '', color: '#6366f1', icon: '📁' };

const CategoriesPage = () => {
  const { categories, loading, error, fetchCategories, createCategory, updateCategory, deleteCategory } = useCategories();
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(INITIAL);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const openCreate = () => { setForm(INITIAL); setModal('create'); setFormError(''); };
  const openEdit = (cat) => { setForm({ name: cat.name, color: cat.color, icon: cat.icon }); setModal(cat); setFormError(''); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setFormError('Kategoriya nomi majburiy');
    setSaving(true);
    try {
      if (modal === 'create') await createCategory(form);
      else await updateCategory(modal._id, form);
      setModal(null);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Xato yuz berdi');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Kategoriyani o\'chirishni tasdiqlaysizmi?\nBu kategoriya barcha vazifalardan olib tashlanadi.')) {
      await deleteCategory(id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Kategoriyalar</h1>
        <button onClick={openCreate} className="btn-primary">+ Yangi</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-sky-500 border-t-transparent" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-3">🗂️</p>
          <p className="text-lg font-medium">Kategoriyalar yo'q</p>
          <p className="text-sm mt-1">Vazifalarni tartiblashtirish uchun kategoriya yarating</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((cat) => (
            <div key={cat._id} className="card p-4 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ backgroundColor: cat.color + '25', border: `2px solid ${cat.color}` }}
                >
                  {cat.icon}
                </span>
                <span className="font-medium">{cat.name}</span>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(cat)} className="p-2 text-gray-400 hover:text-sky-500 transition-colors">✏️</button>
                <button onClick={() => handleDelete(cat._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="card w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              {modal === 'create' ? 'Yangi kategoriya' : 'Kategoriyani tahrirlash'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Nom *</label>
                <input
                  value={form.name}
                  onChange={(e) => { setForm(f => ({ ...f, name: e.target.value })); setFormError(''); }}
                  className="input-field"
                  placeholder="Kategoriya nomi"
                  maxLength={30}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Rang</label>
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setForm(f => ({ ...f, color: c }))}
                      className={`w-7 h-7 rounded-full transition-transform ${form.color === c ? 'scale-125 ring-2 ring-offset-2 ring-gray-400' : 'hover:scale-110'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Ikonka</label>
                <div className="flex gap-2 flex-wrap">
                  {ICONS.map((ic) => (
                    <button
                      type="button"
                      key={ic}
                      onClick={() => setForm(f => ({ ...f, icon: ic }))}
                      className={`w-9 h-9 rounded-lg text-lg transition-all ${form.icon === ic ? 'bg-sky-100 dark:bg-sky-900/30 ring-2 ring-sky-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              {formError && <p className="text-sm text-red-500">{formError}</p>}

              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setModal(null)} className="btn-secondary flex-1">Bekor qilish</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
