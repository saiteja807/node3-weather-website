const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()
const port=process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))
app.get('',(req,res) => {
    res.render('index', {
        title:'Weather App',
        name:'saiteja'
    })
})
app.get('/about',(req,res) =>
{
    res.render('about',{
        title:'about me',
        name:'saiteja'
    })
})
app.get('/help',(req,res) =>
{
    res.render('help',{
        helpText:'This is Some Helpful Text',
        title:'Help',
        name:'saiteja'
    })
})

/*app.get('',(req,res) =>
{
    res.send('<h1>Weather</h1>')
})
app.get('/help',(req,res) => 
{
    res.send([{
        name:'sai'
    },
{
    name:'tej'
}])
})
app.get('/about',(req,res) =>
{
    res.send('<h1>ABOUT</h1>')
})*/
app.get('/weather',(req,res) =>
{
    if(!req.query.address)
    {
        return res.send({
            error:'You Must Provide Address'
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={}) =>
    {
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) =>
        {
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,address:req.query.address
            })
            })
        })
    })
    /*res.send({
        forecast:'It is Snowing',
        location:'hyderabad',
        address:req.query.address
    })
})*/
app.get('/products',(req,res) =>
{
    if(!req.query.search)
    {
       return res.send({
            error:'You Must Provide a Search Term' 
        })
    }
    console.log(req.query.search)
    
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'saiteja',
        errorMessage:'Help article not found.'
    })
})
app.get('*',(req,res) =>
{
    res.render('404',{
        title:'404',
        name:'saiteja',
        errorMessage:'Page not found'
    })
})
app.listen(port,() =>
{
    console.log('server is up on port ' +port)
})