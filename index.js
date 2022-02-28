const express = require('express')

const app = express()

var verify = require('bulk-email-verifier');


const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine','ejs')

app.get('/',(req,res) => {
      res.render('index',{title:'Bulk Domain Validator',text:'',flag:false})
})

app.post('/',(req,res) => {
      console.log(req.body.domain)

var domains = req.body.domain

//convert textarea into array

var lines = domains.split(/\n/);
var output = [];
var outputText = [];
for (var i = 0; i < lines.length; i++) {
  // only push this line if it contains a non whitespace character.
  if (/\S/.test(lines[i])) {
    outputText.push('"' + lines[i].trim() + '"');
    output.push(lines[i].trim());
  }
}
console.log(output);

      verify.verifyDomainsMX(output).then(function(response) {
            console.log('Domains Status: ', res);
            res.render('index',{title:'Bulk Domain Checker',text:response,flag:true})

        });
})

app.listen(5000)