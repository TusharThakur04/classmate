'use client';

import { useState } from 'react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export const Hero = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <main className="relative flex h-full items-center justify-center px-6">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-blue-200 via-blue-100 to-white" />

        <section className="mx-auto max-w-4xl text-center">
          <h1 className="bg-linear-to-r from-blue-950 via-blue-800 to-blue-950 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl">
            Never Miss a Deadline
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-700 md:text-xl">
            Classmate automatically reads your classroom emails, extracts upcoming assignments, and
            adds smart reminders to your calendar so you focus on learning, not remembering.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl bg-blue-900 px-6 py-3 text-white transition hover:bg-blue-800"
            >
              Get Started
            </button>

            <button className="rounded-xl border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </section>
      </main>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="mb-6 text-center text-xl font-semibold text-gray-900">
              Get started with Classmate
            </h2>

            <div className="flex flex-col gap-3">
              <SignUpButton>
                <button className="w-full rounded-xl bg-blue-900 px-4 py-3 text-white hover:bg-blue-800">
                  Sign up
                </button>
              </SignUpButton>

              <SignInButton>
                <button className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 hover:bg-gray-100">
                  Sign in
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
