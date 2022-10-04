class Validator{
    validateUser(req,res){
        const {name,email,password}=req.body
        if (!(name && email && password)){
            res.status(400)
            throw new Error('Please add all fields')
        }
    }
}
