import Brand from "../models/brand.js";
import { isAdmin } from "./userController.js";

export function saveBrand(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "You are not authorized to add brands!",
    });
    return;
  }

  const brand = new Brand(req.body);

  brand
    .save()
    .then(() => {
      res.json({ message: "Brand added successfully!" });
    })
    .catch((error) => {
      res.json({ error: "Brand not added!" });
    });
}


export async function getBrand(req,res){
try {
    if (isAdmin(req)) {
      const brands = await Brand.find();
      res.json(brands);
    } else {
      const brands = await Brand.find({ status: "active" });
      res.json(brands);
    }
  } catch (err) {
    res.json({
      message: "Failed to get brands!",
      error: err,
    });
  }
}