import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: str(),
  CLERK_SECRET_KEY: str(),
  STRIPE_API_KEY: str(),
  FRONTEND_STORE_URL: str(),
});
export default env;
