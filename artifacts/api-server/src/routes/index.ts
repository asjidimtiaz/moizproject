import { Router } from "express";
import healthRouter from "./health";
import programsRouter from "./programs";
import enrollmentsRouter from "./enrollments";
import staffRouter from "./staff";
import galleryRouter from "./gallery";
import testimonialsRouter from "./testimonials";
import eventsRouter from "./events";
import contactRouter from "./contact";
import statsRouter from "./stats";


const router = Router();

router.use(healthRouter);
router.use(programsRouter);
router.use(enrollmentsRouter);
router.use(staffRouter);
router.use(galleryRouter);
router.use(testimonialsRouter);
router.use(eventsRouter);
router.use(contactRouter);
router.use(statsRouter);

export default router;
