import express from "express";

import{saveBrand} from "../controllers/brandController.js";

const brandRouter = express.Router();

brandRouter.post("/", saveBrand);
export default brandRouter;