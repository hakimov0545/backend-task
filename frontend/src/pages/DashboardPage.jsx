import { useEffect, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useCategories } from '../hooks/useCategories';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

const STATUSES = [
  { value: '', label: 'Barchasi' },
  { value: 'todo', label: 'Kutilmoqda' },
  { value: 'in-progress', label: 'Jarayonda' },
  { value: 'done', label: 'Bajarildi' },
];

const DashboardPage = () => {
  const { tasks, pagination, loading, error, fetchTasks, createTask, updateTask, deleteTask } = useTasks();
  const { categories, fetchCategories } = useCategories();
  const [modal, setModal] = useState(null); // null | 'create' | task object
  const [filters, setFilters] = useState({ status: '', page: 1 });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchTasks(filters);
  }, [filters, fetchTasks]);

  const handleSave = async (formData) => {
    if (modal === 'create') {
      await createTask(formData);
    } else {
      await updateTask(modal._id, formData);
    }
    fetchTasks(filters);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Vazifani o\'chirishni tasdiqlaysizmi?')) {
      await deleteTask(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Vazifalar</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Jami: {pagination?.total || 0} ta vazifa
          </p>
        </div>
        <button onClick={() => setModal('create')} className="btn-primary flex items-center gap-2">
          <span>+</span>
          <span>Yangi vazifa</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilters((f) => ({ ...f, status: s.value, page: 1 }))}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filters.status === s.value
                ? 'bg-sky-500 text-white'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-sky-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-sky-500 border-t-transparent" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">
          <p className="text-4xl mb-2">⚠️</p>
          <p>{error}</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-3">📝</p>
          <p className="text-lg font-medium">Hali vazifalar yo'q</p>
          <p className="text-sm mt-1">Birinchi vazifangizni qo'shing!</p>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(t) => setModal(t)}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setFilters((f) => ({ ...f, page }))}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    filters.page === page
                      ? 'bg-sky-500 text-white'
                      : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-sky-400'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {modal && (
        <TaskModal
          task={modal === 'create' ? null : modal}
          categories={categories}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
