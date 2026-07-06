import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, Github } from 'lucide-react';

const LOGO_PATH = '/logo-dashboard.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  const handleOAuthLogin = (provider) => {
    alert(`OAuth con ${provider} - Próximamente`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0615] p-4 relative overflow-hidden">
      {/* Animated gradient orbs - ya no usamos mix-blend-multiply */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-[100px] animate-float" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-pink-600 rounded-full opacity-20 blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left - Branding */}
        <div className="hidden lg:flex flex-col justify-center text-white space-y-8 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/[0.06] backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/[0.08] p-3">
              <img src={LOGO_PATH} alt="Diego Dizzi Logo" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Diego Dizzi
              </h1>
              <p className="text-purple-300/80 font-semibold text-lg tracking-wide">
                Desarrollador Full Stack
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              Dashboard <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Profesional</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
              Gestiona tus proyectos, estadísticas y tareas en un entorno diseñado para la máxima productividad.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-[#0a0615]" />
              ))}
            </div>
            <span>+4 usuarios activos ahora</span>
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/[0.04] backdrop-blur-2xl rounded-3xl border border-white/[0.08] p-8 shadow-2xl animate-scale-in">
            {/* Mobile Logo */}
            <div className="lg:hidden flex flex-col items-center mb-6">
              <img src={LOGO_PATH} alt="Logo" className="w-12 h-12 mb-4 drop-shadow-lg" />
              <h2 className="text-xl font-bold text-white">Diego Dizzi</h2>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-1">Bienvenido</h2>
              <p className="text-gray-500 text-sm">Inicia sesión para continuar</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-xs">{error}</p>
              </div>
            )}

            {/* OAuth Buttons */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <button
                onClick={() => handleOAuthLogin('Google')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97] text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                onClick={() => handleOAuthLogin('GitHub')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1a1a2e] hover:bg-[#242440] text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97] border border-white/[0.06] text-sm"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-[#0a0615] text-gray-500">O usa tu email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-600" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3.5 py-3 border border-white/[0.08] rounded-xl bg-white/[0.04] text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all hover:bg-white/[0.06] text-sm"
                    placeholder="admin@dashboard.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Contraseña</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-600" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3.5 py-3 border border-white/[0.08] rounded-xl bg-white/[0.04] text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all hover:bg-white/[0.06] text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-ripple w-full flex items-center justify-center gap-2 py-3 px-4 mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-xl hover:shadow-purple-600/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Iniciar Sesión</span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-xs">
                Credenciales demo: <span className="font-mono text-purple-400/80">admin@dashboard.com</span>
              </p>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-8 text-xs">
            &copy; 2024 Diego Dizzi. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
