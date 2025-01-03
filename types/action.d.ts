interface SignInWithOAuthProps {
  provider: "google" | "github";
  providerAccountId: string;
  user: {
    name: string;
    username: string;
    email: string;
    image: string;
  };
}
