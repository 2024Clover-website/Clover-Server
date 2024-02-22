import express from "express";
import { getPencil } from "../controllers/rec.controller.js";


export const recRoute=express.Router();



recRoute.get("/:patternId/:colorId",async(req,res)=>{
    const result = await getPencil(req,res);
});