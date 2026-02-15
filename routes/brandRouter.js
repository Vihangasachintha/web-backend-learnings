import express from "express";

import{saveBrand,getBrand} from "../controllers/brandController.js";

const brandRouter = express.Router();

brandRouter.post("/", saveBrand);
brandRouter.get("/", getBrand)
export default brandRouter;