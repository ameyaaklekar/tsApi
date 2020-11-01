import { Router, Request, Response } from "express";

const router = Router();

router.post('/', () => {
  console.log('company route')
});

export default router;