<<<<<<< HEAD
'use client';
import { Navbar } from '@/components/Navbar';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import axios from 'axios';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Loader } from '@/components/Loader';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';

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
      <div className="min-h-[91vh] w-full">
        <ClerkLoading>
          <Loader />
        </ClerkLoading>
        <ClerkLoaded>
          <Navbar />
        </ClerkLoaded>

        <Hero />
      </div>
      <Footer />
    </>
  );
=======
export default function Home() {
  return <div className="flex "></div>;
>>>>>>> ac65d09e4ba55dfc17d7bfe195ef5b4de557fb57
}
