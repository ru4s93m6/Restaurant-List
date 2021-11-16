// require packages used in the project
const e = require('express')
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurantList = require('./restaurant.json')

//set template 
app.engine('handlebars', exphbs({ defaultLayout:'main'}))
app.set('view engine', 'handlebars');

app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req,res)=>{
    const restaurant = restaurantList.results.find(restaurant=> restaurant.id === Number(req.params.restaurant_id))
    res.render('show', { restaurant: restaurant})
})

app.get('/search', (req,res) =>{
    if(req.query.keyword == ""){
        res.redirect('/')
    }else{
        const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
        res.render('index' , {restaurants: restaurants})
    }
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})