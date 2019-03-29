let express = require( 'express');
let dotevn = require( 'dotenv');
let path = require( 'path');

dotevn.config();
let PORT = process.env.PORT;

const app = express();
app.get("*", express.static(path.join(__dirname, "dist"))) 

app.listen(PORT || process.env.PORT, function(){
    console.log('PORT', process.env.PORT)
});
