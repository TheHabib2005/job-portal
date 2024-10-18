import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import apicache from "apicache";
import { jobs } from "../lib";
const router: Router = Router();
const cache = apicache.middleware;
router.get("/jobs-posts", (req: Request, res: Response) => {
  res.json({ message: "Hello from API!" });
});

router.post("/create-job-post", async (req: Request, res: Response) => {
  let body = await req.body;

  try {
    let result = await prisma.jobPost.createMany({
      data: jobs,
      skipDuplicates: true,
    });
    res.json(result).status(200);
  } catch (error) {
    console.log(error);

    res.json({
      error: true,
      message: "something went wrong",
    });
  }
});

router.get(
  "/jobs",
  cache("30 minutes"),
  async (req: Request, res: Response) => {
    // Simulate data fetching
    const data = await prisma.jobPost.findMany();
    res.json(data);
  }
);

export default router;
