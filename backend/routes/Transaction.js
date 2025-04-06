import {Router} from "express";
import Transaction from "../model/Transaction.js";
import User from "../model/User.js";
const router = Router();
router.post("/workshop", async(req,res)=>{
    try{
        const { transactionHash, workshopId, address } = req.body;
        if (!transactionHash || !workshopId) {
            return res.status(400).json({ message: "Transaction hash and type are required" });
        }
        const type = 'workshop';
        const transaction = new Transaction({ transactionHash, type, workshop: workshopId });
        await transaction.save();
        const user = await User.findOne({ walletAddress: address });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.transactions.push(transaction._id);
        await user.save();
        res.status(201).json(transaction);
    }
    catch(error){
        console.error("Error creating transaction:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/token", async(req,res)=>{
    try{
        const { transactionHash,token,address } = req.body;
        if (!transactionHash) {
            return res.status(400).json({ message: "Transaction hash is required" });
        }
        const type = 'token';
        const transaction = new Transaction({ transactionHash, type,token });
        await transaction.save();
        const user = await User.findOne({ walletAddress: address });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.transactions.push(transaction._id);
        await user.save();
        res.status(201).json(transaction);
    }
    catch(error){
        console.error("Error creating transaction:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;