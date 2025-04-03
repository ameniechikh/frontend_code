import { useState } from 'react';
import { useRouter } from 'next/router';
import { Lock, Mail, Smartphone, RotateCw } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirection après connexion réussie
      router.push('/Approvisionnement/Dashboard');
    } catch (err) {
      setError('Échec de la connexion. Veuillez vérifier vos informations.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <img 
            src="/logo6.png" 
            alt="SteelFlow Pro" 
            className="h-20 w-20 mx-auto mb-4 rounded-full border-2 border-blue-500"
          />
          <h1 className="text-2xl font-bold text-white">Connexion </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email professionnel
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="contact@votresociete.com"
                required
              />
            </div>
          </div>

          {loginMethod === 'password' ? (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Code OTP
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123456"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setLoginMethod(prev => prev === 'password' ? 'otp' : 'password')}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              {loginMethod === 'password' ? 'Utiliser OTP à la place' : 'Utiliser mot de passe'}
            </button>

            {loginMethod === 'password' && (
              <a 
                href="/mot-de-passe-oublie" 
                className="text-sm text-gray-400 hover:text-gray-300"
              >
                Mot de passe oublié ?
              </a>
            )}
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <RotateCw className="h-5 w-5 animate-spin" />
                Connexion en cours...
              </div>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          <p>Problèmes de connexion ? Contactez le support</p>
          <p className="mt-2">support@steelflowpro.com</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;