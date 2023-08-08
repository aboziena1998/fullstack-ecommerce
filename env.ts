import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: str(),
  CLERK_SECRET_KEY: str(),
});
export default env;
