import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) return 'Barcha maydonlarni to\'ldiring';
    if (form.name.length < 2) return 'Ism kamida 2 ta harf bo\'lishi kerak';
    if (form.password.length < 6) return 'Parol kamida 6 ta belgi bo\'lishi kerak';
    if (form.password !== form.confirm) return 'Parollar mos kelmadi';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Ro\'yxatdan o\'tish muvaffaqiyatsiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4">
      <div className="card w-full max-w-sm p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">⚡</div>
          <h1 className="text-2xl font-bold">Ro'yxatdan o'tish</h1>
          <p className="text-sm text-gray-500 mt-1">Yangi akkaunt yarating</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Ism', name: 'name', type: 'text', placeholder: 'Ismingiz' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'email@example.com' },
            { label: 'Parol', name: 'password', type: 'password', placeholder: '••••••••' },
            { label: 'Parolni tasdiqlang', name: 'confirm', type: 'password', placeholder: '••••••••' },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="input-field"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Ro'yxatdan o'tilmoqda...
              </span>
            ) : (
              'Ro\'yxatdan o\'tish'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Allaqachon akkaunt bormi?{' '}
          <Link to="/login" className="text-sky-500 hover:underline font-medium">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
