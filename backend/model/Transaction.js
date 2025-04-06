import { Schema,model } from "mongoose";

const TransactionSchema = new Schema({
    transactionHash: {
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String,
        enum: ['workshop', 'token'],
        required: true
    },
    workshop: {
        type: Schema.Types.ObjectId,
        ref: 'Workshop',
    },
    token: {
        type: String
    },
    transactionType: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    }
})

const Transaction = model('Transaction', TransactionSchema);
export default Transaction;