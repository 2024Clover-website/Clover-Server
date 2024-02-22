import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../config/db.connect.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

export const getPencil=async(data)=>{
    try {
        console.log(data);
        const conn=await connectToDatabase();
        const pencilCollection=conn.collection('rec');
        const result = await pencilCollection.find({pattern:Number(data.pattern),color:Number(data.color)}).toArray();;
        return result;
    } catch (error) {
        console.log(error);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}