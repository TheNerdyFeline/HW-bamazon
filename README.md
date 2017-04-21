# HW-bamazon
UCLA homework week 12

This is a Amazon like node app that allows a user to eithe make purchases or seell items.  The customer node app allows a user to see the avaliable items, and purchase any item they choose.  The manager node app allows a manager to see what is available with more detail, such as quanitity and department, check for low inventory, anything less then 5, add inventory to an existing product, or add a new product.

## Technologies Used
* mySQL
* nodejs
* javascript
* inquirer

One thing I did have a problem with was the asynchronous loading, because it would be difficult for a user to understand what they are doing.  So I added a setTimeout to some of the function calls to prevent that from happening, and it also allowed me to have better control as to how things displayed in the terminal.


This snippet is from the bamazonCustomer.js node app, where in order to make it easier to read and get information I added the setTimeout you see in lines 22-24.

```Javascript
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
```

Without it I got this:

![Alt text](./images/without-setTimeout.png?raw=true "Without setTimeout")
As you can see it looks odd, and would be difficult to see user input.


With it I got this:

![Alt text](./images/with-setTimeout.png?raw=true "Without setTimeout")

