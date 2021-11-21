const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const knex = require('./queries')

const port = 3000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
   })
)


/**
 * @api {get} / List cities
 * @apiGroup City Operations
 * @apiSuccess {Object[]} city City
 * @apiSuccess {Number} city.ID City ID
 * @apiSuccess {String} city.Name City Name
 * @apiSuccess {String} city.CountryCode Country Code
 * @apiSuccess {String} city.District City District
 * @apiSuccess {Number} city.population Population
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "ID":3003,
 *      "Name":"Caen",
 *      "CountryCode":"FRA",
 *      "District":"Basse-Normandie",
 *      "Population":113987
 *    }]
 *    
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/', async (req,res) => {
  const result = await knex.from('city').where({ID:3003})
  
   res.json(result);
  
});


/**
 * @api {post} /insert Insert a city
 * @apiGroup City Operations
 * @apiParam {String} name City Name
 * @apiParam {Number} population Population
 * @apiSuccess {Object[]} result Result
 * @apiSuccess {String} result.status Status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *         "status":"success"
 *    }
 *    
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post('/insert', async (req,res) => {

const {name, pop} = req.body
 
const result = await knex('city').insert({ID:9050,Name:name,CountryCode:'FRA', District:'Test', Population:pop})

console.log(result)

  res.json({"status":"success"})




});


app.post('/update', async (req,res) => {

const {name, pop} = req.body
 

const result = await knex('city').where({Name: name}).update('Population', pop)

console.log(result)
 if(result >= 1){
   res.json({"status":"success"})
 }
else{
res.json({"status":"failure"})
}



});



app.post('/delete', async (req, res) => {
const id = req.body

const result = await knex('city').where({ID: parseInt(id.ID)}).del()

 if(result!=0){
 res.json({"status":"success"}) 
}
else{
 res.json({"status":"failure"})
}
});


app.listen(port, () => {
  console.log(`App running.`)
})
