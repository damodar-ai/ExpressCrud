const mongoose= require("mongoose");


mongoose.connect("mongodb+srv://dams:dams@students.46u77ro.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true
}).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})


Schema = mongoose.Schema({
    name:String,
    age:Number,
    mail:String
})

studentModel = mongoose.model("student",Schema);
module.exports = studentModel