import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  console.log(session);
  return (
    <>
      <h1 className="h1-bold font-space-grotesk">Welcome To Momen Site.</h1>
    </>
  );
};
export default Home;
