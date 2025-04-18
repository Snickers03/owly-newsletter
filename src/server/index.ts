import { authRouter } from "./routers/auth";
import { newsletterRouter } from "./routers/newsletter";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  newsletter: newsletterRouter,
});

export type AppRouter = typeof appRouter;
