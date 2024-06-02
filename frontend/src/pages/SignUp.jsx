import React from 'react';
import { Link } from 'react-router-dom';

const Component = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to="#" className="flex items-center justify-center">
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            Products
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md border p-4 rounded shadow">
          <div className="space-y-1">
            <h2 className="text-2xl">Create an account</h2>
            <p>Enter your details below to sign up for a new account.</p>
          </div>
          <div className="space-y-4 mt-4">
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <input id="name" placeholder="Enter your full name" className="border p-2 rounded w-full" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your email" className="border p-2 rounded w-full" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Enter a password" className="border p-2 rounded w-full" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input id="confirm-password" type="password" placeholder="Confirm your password" className="border p-2 rounded w-full" />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-4">
            <button className="w-full sm:w-auto bg-orange-500 text-white p-2 rounded">Sign up</button>
            <div className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-gray-900 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Component;
