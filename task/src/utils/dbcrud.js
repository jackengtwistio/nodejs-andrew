async function handlePatch(req,res,queryString,model) {
    const prop = req.params[queryString]
    const updates = req.body
    const updatesKeys = Object.keys(updates)
    
    if(!updatesKeys.every(key=>Object.keys(model.schema.tree).includes(key))){
        return res.status(400).send(`you can only add ${model.allowedProps}`)
    }
    async function response(){
        const results = await model.findOne({[queryString]:prop})
        if(!results){return res.send(`can't find ${req.params.prop}`)}
        updatesKeys.forEach(updatekey =>results[updatekey]=updates[updatekey])
        await results.save()
        console.log(results)
        // const result = await model.findOneAndUpdate(
        //     {[queryString]:prop},
        //     {...updates},
        //     {new: true, runValidators: true}
        //     )
        res.send(results)
    }
    try{
        response() 
    }catch{ 
        res.status(500).send('server is down')
    }
}


async function findAndDo(req,res,method,queryString,model,successMessage='succeeded') {
    const prop = req.params[queryString]
    const result = await model[method]({[queryString]:prop})
    try{
        if(!result||result.length===0){return res.status(400).send(`can't find ${prop}`)}
        res.send(successMessage+': '+result)
    }catch(err){
        res.status(500).send(err)
    }
}

module.exports = {
    findAndDo,
    handlePatch
}