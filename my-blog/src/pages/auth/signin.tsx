import { signIn } from 'next-auth/react';

const SignIn = () => {
  const handleSignIn = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      email: 'user@example.com',
      password: 'password',
    });
    console.log(res);
  };

  return <button onClick={handleSignIn}>Sign In</button>;
};

export default SignIn;
