const { response } = require("express")

express = require("express")
app = express()
student = require('./database')
port = 3000

app.listen(port , () => {
    console.log(`you are onn ${port}`)
})
app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/' , async (req , res ) => {
    students = await student.find();
    res.render(('index.ejs'),{
    title : "CRUD in Express",
    students : students })
})

app.get('/register' , async(req , res) => {
    res.render('register')
})
app.post('/register' , async(req , res) => {
    const {name , mail ,age} =  req.body;
    newstudent = new student({
    name , mail , age
    });
    studentsave = await newstudent.save();
    res.redirect('/')
})

app.get('/delete/:id',async (req , res) => {
    delst = await student.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

app.get("/update/:id",async(req,res)=>{
    const {id} =req.params;
    const user = await student.findById({_id:id});
    if(user==null){
        res.redirect("/");
    }else{
        res.render("update",{
            user:user
        })
    }
})

app.post("/update/:id",async(req,res)=>{
    const {id} =req.params;
    const {name,email,age}=req.body;
    const updateuser = await student.findByIdAndUpdate({_id:id},
        {name,email,age},
        {new:true})
    res.redirect("/");
})


