var express = require('express');
var moment = require('moment');
var app = express();

var PORT = process.env.PORT || 3000;


app.get('/',function(req,res){
	res.status(200).send({status : 'TimeStampApi'})
})
app.get('/:q',function(req,res){
	
	var date = req.params.q;
        var unix = null;
        var natural = null;
        
        // Check for initial unix time
        if (+date >= 0) {
            unix = +date;
            natural = unixToNat(unix);
        } 
        
        // Check for initial natural time
        if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
            unix = +natToUnix(date);
            natural = unixToNat(unix);
        }
        
        var dateObj = { "unix": unix, "natural": natural };
		res.send(dateObj);

});

function natToUnix(date) {
    // Conver from natural date to unix timestamp
    return moment(date, "MMMM D, YYYY").format("X");
}
    
function unixToNat(unix) {
    // Convert unix timestamp to natural date
    return moment.unix(unix).format("MMMM D, YYYY");
}

app.listen(PORT,function(){
	console.log("Server running at "+ PORT);
});

