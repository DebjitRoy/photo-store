'use client';

import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

//auth/confirm?token_hash=pkce_987d52589cf1ae3d7a8324134788535dec56a08693448eab94e84f12&type=email&next=http%3a%2f%2flocalhost%3a3000
export default function AuthForm() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setisSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log({ data, error });
    if (!error) {
      setIsSigningUp(true);
    }
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    // setIsSigningIn(true);
  };
  let signInMessage = 'Sign In';
  if (isNewUser) {
    signInMessage = 'Sign Up';
  } else if (isSigningIn) {
    signInMessage = 'Signing in...';
  }
  const signUpMessage = (
    <p className="text-center text-white">Email sent! Check your email to confirm sign up.</p>
  );

  return (
    <form onSubmit={isNewUser ? handleSignUp : handleSignIn} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isSigningIn || !email || !password}
      >
        {signInMessage}
      </button>
      <p className="text-center text-white">
        {isNewUser ? (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setIsNewUser(false)}
              className="text-indigo-400 hover:text-indigo-600"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setIsNewUser(true)}
              className="text-indigo-400 hover:text-indigo-600"
            >
              Sign Up
            </button>
          </>
        )}
      </p>
      {isSigningUp && signUpMessage}
    </form>
  );
}
