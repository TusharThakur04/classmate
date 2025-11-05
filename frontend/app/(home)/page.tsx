'use client';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import axios from 'axios';
import { Hero } from '@/components/Hero';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      axios.post('http://localhost:4000/users/mirrorUser', {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      });
    }
  }, [isSignedIn, user]);

  return (
    <>
      <SignedOut>
        <div className="min-h-[85vh] w-full">
          <Hero />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="min-h-[78vh] w-full">
          <Dashboard />
        </div>
      </SignedIn>
    </>
  );
}
