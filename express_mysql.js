let mysql = require('mysql2')
let exp = require('express')
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "knowitdb"
});
con.connect(function(err){
     if(!err)
         console.log("connection established");
     else
	console.log("rejected : "+err.toString()); 
})
let app = exp();
app.get('/emps',function(req,res){
    con.query("select * from emp", function(err,result) {
        if(!err) {
  	    console.log(result.length)
            //res.send("No of emps : "+result.length); 
            let str = "<p>  No of emps : "+result.length+"</p>";
            str+="<table border=1>";
            result.forEach(emp => {
                str+="<tr>";
		str+="<td>"+emp.EMPNO+"</td>";
                str+="<td>"+emp.ENAME+"</td>";
                str+="<td>"+emp.JOB+"</td>"; 
                str+="</tr>";
            })
            str+="</table>";
            res.send(str);           
        }
        else {
            res.send("Can not receive emp data");
        }
    });
})
//general route - no routes match
app.get('/*splat',function(req,res){
    res.send("Invalid URL ");
})
app.listen(9000,function() {
      console.log("exp server - mysql");	 
})


