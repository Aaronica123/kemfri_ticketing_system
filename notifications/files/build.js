import mongoose from "mongoose";
const types={
    submit: "submit",
    solved: "solved",
    pending:"pending",
}
const notify_schema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    notify_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    issue: {
        enum: Object.values(types),
        type: String,
        required: true,
        default:'submit'
    },
    status: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}
)
const mg=mongoose.model('notify_schema',notify_schema);
export default mg;
