use Bamazon;

create table products(
    id int(11) auto_increment not null,
    product_name varchar(255) not null,
    department_name varchar(50) not null,
    price decimal(50, 3) not null,
    stock_quantity int(255) not null,
    primary key (id)
)

insert into products(product_name, department_name, price, stock_quantity)
values("Charming's Choice", "Pet Supplies", 6, 50);

insert into products(product_name, department_name, price, stock_quantity)
values("Catnip", "Pet Supplies", 3.50, 25);

insert into products(product_name, department_name, price, stock_quantity)
values("Harley Pop Vynil", "Collectables", 10, 10);

insert into products(product_name, department_name, price, stock_quantity)
values("Bulk Socks", "Clothing" , 5, 50);

insert into products(product_name, department_name, price, stock_quantity)
values("Tiger Shirt", "Clothing", 15.99, 30);

insert into products(product_name, department_name, price, stock_quantity)
values("Dancing Groot", "Toys", 11.99, 20);

insert into products(product_name, department_name, price, stock_quantity)
values("Waterbottle", "Kitchen", 14.99, 35);

insert into products(product_name, department_name, price, stock_quantity)
values("Full Set Chef Knives", "Kitchen", 499.99, 20);

insert into products(product_name, department_name, price, stock_quantity)
values("Flux", "Toys", 8.99, 50);

insert into products(product_name, department_name, price, stock_quantity)
values("Rubber Ducky", "Toys", .99, 100);
