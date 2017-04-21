// declare var
var mysql = require("mysql");
var inquirer = require("inquirer");

// make connection to mySQL
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "Bamazon"
});

connection.connect(function(err) {
    if (err) {
	console.log(err);
    } else {
	showDb();
	setTimeout(function() {
	   
	}, 1000);
    }
});



// function to show products available to user
function showDb() {
    connection.query("select * from products", function(err, data) {
	for(var i = 0; i < data.length; i++) {
	    console.log("ID: " + data[i].id + " Product: " + data[i].product_name +  " Price: $" + data[i].price);
	};
    });
}

function manage() {
    

}; // close manage function
