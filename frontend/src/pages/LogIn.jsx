import React from 'react';
import { Link } from 'react-router-dom';

const Component = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md border p-4 rounded shadow">
          <div className="space-y-1">
            <h2 className="text-2xl">Sign in to your account</h2>
            <p>Enter your email and password below to access your account.</p>
          </div>
          <form className="space-y-4 mt-4">
            <div className="grid gap-2">
              <label htmlFor="email">Email or Username</label>
              <input id="email" placeholder="Enter your email or username" className="border p-2 rounded w-full" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password">Password</label>
                <Link className="text-sm font-medium text-gray-900 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input id="password" type="password" placeholder="Enter your password" className="border p-2 rounded w-full" />
            </div>
          </form>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-4">
            <button className="w-full sm:w-auto bg-orange-500 text-white p-2 rounded">Sign in</button>
            <div className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-gray-900 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Component;
