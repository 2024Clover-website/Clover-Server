
import { getPencil } from "../model/rec.dao.js";

export const viewPencil=async(data)=>{
    
    const getPencilData=await getPencil(data);
    return getPencilData;

}