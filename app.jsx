import React, { useState, useEffect } from 'react';
import { initAuth, isAuthenticated, logout } from './utils/auth';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await initAuth();
      const authStatus = await isAuthenticated();
      setIsAuth(authStatus);
      setLoading(false);
    };
    initialize();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600">Initializing AI Talent Marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuth ? (
        <Auth onLogin={() => setIsAuth(true)} />
      ) : (
        <div>
          <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-indigo-600">AI Talent Marketplace</h1>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </header>
          <main className="container mx-auto p-4">
            <Dashboard />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;