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
  password: "pChrms1115",
  database: "Bamazon"
});

connection.connect(function(err) {
    if (err) {
	console.log(err);
    } else {
	showDb();
	setTimeout(function() {
	    purchase();
	}, 1000);
    }
});



// function to show products available to user
function showDb() {
    connection.query("select * from products", function(err, data) {
	for(var i = 0; i < data.length; i++) {
	    console.log("ID: " + data[i].id + " | Product: " + data[i].product_name +  " | Price: $" + data[i].price);
	};
    });
}


function purchase() {
    inquirer.prompt([
	{
	    name: "ID",
	    message: "What is the ID number of the item you would like to purchase?",
	    type: 'input'
	}, {
	    name: "quantity",
	    message: "How many would you like?",
	    type: 'input'
	}
    ]).then(function(answers) {
	connection.query("SELECT ID,price,stock_quantity FROM products where ID=" + answers.ID, function(err, res) {
	    var results = res[0];
	    if (err) {
		console.log(err);
	    } else if (parseInt(answers.quantity) > results.stock_quantity) {
		console.log("Insufficent quantity");
		purchase();
	    } else if (parseInt(answers.quantity) < results.stock_quantity) {
		var newQuant = results.stock_quantity - parseInt(answers.quantity);
		connection.query("update products set ? where ?", [{stock_quantity: newQuant}, {id: parseInt(answers.ID)}], function(err, data) {
		    if (err) {
			console.log(err);
		    } else {
			console.log("Your total is: $" + results.price * parseInt(answers.quantity));
			showDb();
			setTimeout(function() {
			    purchase();
			}, 1000);
		    }
		}); // close connection update
	    } else {
		console.log("We don't have that item.");
		showDb();
		setTimeout(function() {
		    purchase();
		}, 1000);
	    }
	}); // close connection select 
    }); // close .then
}; // close purchase function
    
