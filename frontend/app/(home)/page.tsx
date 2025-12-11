'use client';
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import axios from 'axios';
import { Hero } from '@/components/Hero';
import { Dashboard } from '@/components/Dashboard';

export default function Home() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!isSignedIn || !user) return;

    let hasRun = false;

    const mirrorUser = async () => {
      if (hasRun) return;
      hasRun = true;

      try {
        await axios.post('http://localhost:4000/users/mirrorUser', {
          id: userId,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
        });
      } catch (err: any) {
        if (err.response?.status === 409) {
          console.log('User already exists.');
        } else {
          console.error('Error mirroring user:', err);
        }
      }
    };

    mirrorUser();
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
          <Dashboard userId={userId} />
        </div>
      </SignedIn>
    </>
  );
}
