// /app/register/page.tsx
import { redirect } from 'next/navigation';
import { STEPS } from '@/lib/constants';

// This page acts as the entry point for the registration flow.
// It immediately redirects the user to the first step.
const RegisterRootPage = () => {
  redirect(`/register/${STEPS[0].path}`);
  
  // This return is technically unreachable because of the redirect,
  // but it's good practice to have a return statement.
  return null; 
};

export default RegisterRootPage;