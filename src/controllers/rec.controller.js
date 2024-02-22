import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import {viewPencil} from "../service/rec.service.js";


export const getPencil=async (req,res)=>{
    try {
        console.log("연필 찾기를 요청하셨습니다.");
        const data={
            "pattern":req.params.patternId,
            "color":req.params.colorId
        }
        res.send(response(status.SUCCESS,await viewPencil(data)));
    } catch (error) {
        console.log(error);
        res.send(response(status.BAD_REQUEST,error));
    }
}