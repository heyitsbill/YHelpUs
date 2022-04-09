import { Router } from "express";
import AuthRoutes from "./auth";
import PostRoutes from "./post";
// import UserRoutes from "./user";

import passport from "passport";


const router = Router();
const secure = passport.authenticate('jwt', { session: false });

router.use("/", AuthRoutes);
router.use("/post", PostRoutes);
//reminder: secure secured routes after
// router.use("/user", UserRoutes);


export default router;
