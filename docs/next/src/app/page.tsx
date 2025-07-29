import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal" >
          <button className="ml-2 bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </div>
  );
}
