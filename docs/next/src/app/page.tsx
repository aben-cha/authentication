import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Button} from '@/components/ui/button'
import  ModeToggle  from '@/components/ModeToggle'
export default function Home() {
  return (
    <div className="m-4">
      <SignedOut>
        <SignInButton mode="modal">
          <Button>
            Sign In
          </Button>
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

      <ModeToggle />
      <Button variant={"secondary"}>Click me</Button>
    </div>
  );
}
