var express = require('express')
var app = express()

var fs = require('fs')
var _ = require('lodash')
var users = []

fs.readFile('users.json', {encoding: 'utf8'}, function (err, data) {
  if (err) throw err

  JSON.parse(data).forEach(function (user) {
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
    users.push(user)
  })

})

app.set('views','./views')
//Se tiene que definir el view engine default, pero al momento de hacer el render
//se puede cargar uno diferente dependiendo de la extension con la que se llame
app.set('view engine','jade')

app.get('/',function(req,res){
  res.render('index',{users:users})
})

app.get(/big.*/,function(req,res,next){
  console.log('BIG USER ACCESS')
  next()
})

app.get('/:username',function(req,res){
    var username = req.params.username
    res.send(username)
})

app.get('/yo',function(req,res){
  res.send('YO!')
})

var server=app.listen(3000,function(){
  console.log('Server running at http://localhost:'+server.address().port)
})
