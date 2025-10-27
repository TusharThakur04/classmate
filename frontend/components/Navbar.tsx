import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoading,
} from '@clerk/nextjs';

export const Navbar = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between bg-gray-200 px-4 font-semibold text-black drop-shadow-xl">
      <span>Classmate</span>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignUpButton>
            <button className="cursor-pointer">SignUp</button>
          </SignUpButton>

          <SignInButton>
            <button className="bg-primary cursor-pointer rounded-2xl px-3 py-1 transition-transform duration-150 hover:scale-105">
              SignIn
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
