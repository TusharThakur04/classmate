'use client';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import axios from 'axios';
import { Hero } from '@/components/Hero';

export default function Home() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      axios.post('/api/sync-user', {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      });
    }
  }, [isSignedIn, user]);

  return (
    <>
      <div className="min-h-[100vh] w-full">
        <SignedOut>
          <Hero />
        </SignedOut>
        <SignedIn>Dashboard</SignedIn>
      </div>
    </>
  );
}
