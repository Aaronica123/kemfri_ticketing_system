import DeletSession from "../sessions/delete.js";
export default async function Logout(req,res){
    try{
        await DeletSession(req,res);
    }
    catch(error){

    }
}