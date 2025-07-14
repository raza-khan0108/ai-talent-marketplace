import React from 'react';
import { login } from '../utils/auth';

const Auth = ({ onLogin }) => {
  const handleLogin = async () => {
    await login();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Talent Marketplace</h1>
          <p className="text-gray-600">Connect with AI professionals using blockchain technology</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Powered by Internet Computer</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Secure blockchain-based authentication</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Zero gas fees for users</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>AI-powered talent matching</span>
              </li>
            </ul>
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition"
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Sign in with Internet Identity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;