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
	manage();
    }
});


function manage() {
    inquirer.prompt([
	{
	    name: "action",
	    type: "list",
	    message: "What would you like to do?",
	    choices: ["View products for sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}
    ]).then(function(answer) {
	switch(answer.action) {
	case "View products for sale":
	    showDb();
	    setTimeout(function() {
		manage();
	    }, 1000);
	    break;
	case "View Low Inventory":
	    lowInv();
	    setTimeout(function() {
		manage();
	    }, 1000);
	    break;
	case "Add to Inventory":
	    addInv();
	    break;
	case "Add New Product":
	    addProd();
	    break;
	};
    });

}; // close manage function

// function to show products available to manager
function showDb() {
    connection.query("select * from products", function(err, data) {
	for(var i = 0; i < data.length; i++) {
	    console.log("ID: " + data[i].id + " | Product: " + data[i].product_name +  " | Department: " + data[i].department_name + " | Price: $" + data[i].price + " | Quantity: " + data[i].stock_quantity);
	};
    });
} // close showDB function

// function to show manager low inventory
function lowInv() {
    connection.query("select * from products", function(err, data) {
	for(var i = 0; i < data.length; i++) {
	    if(data[i].stock_quantity < 5) {
		console.log("ID: " + data[i].id + " | Product: " + data[i].product_name +  " | Department: " + data[i].department_name + " | Price: $" + data[i].price + " | Quantity: " + data[i].stock_quantity);
	    } 
	};
	return console.log("No low inventory.");
	manage();
    });
} //close lowInv function

// function to allow manager to add inventory to existing products
function addInv() {
    inquirer.prompt([
	{
	    name: "id",
	    message: "What is the id number of the item you would like to add inventory to?"
	}, {
	    name: "quant",
	    message: "How many would you like to add?"
	}
    ]).then(function(answers) {
	connection.query("select stock_quantity from products where id=" + answers.id, function(err, res) {
	    var newQuant = res[0].stock_quantity + parseInt(answers.quant);
	    connection.query("update products set ? where ?", [{stock_quantity: newQuant}, {id: parseInt(answers.id)}], function(err, data) {
		if (err) {
		    console.log(err);
		} else {
		    console.log("The new quantity is: " + newQuant);
		    manage();
		}
	    }); // close connection update
	}); //close connection select
    }); //close .then
}; // close addInv function

function addProd() {
    inquirer.prompt([
	{
	    name: "name",
	    message: "What is the name of the product you like to add?"
	}, {
	    name: "dep",
	    message: "What is the department it goes to?"
	}, {
	    name: "price",
	    message: "How much will it cost?"
	}, {
	    name: "quant",
	    message: "How many do you have?"
	}
    ]).then(function(answers) {
	connection.query("INSERT INTO products SET ?", {
	    product_name: answers.name,
	    department_name: answers.dep,
	    price: answers.price,
	    stock_quantity: answers.quant
	}, function(err, res) {
	    if(err) {
		console.log(err);
	    } else {
		console.log("New product added.");
	    }
	});
	manage();
    });
}; //close addProd function
