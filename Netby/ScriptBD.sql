if not exists (select * from sys.databases where name = 'bd_ProductosFinancieros')
    create DATABASE bd_ProductosFinancieros;
go
use bd_ProductosFinancieros;
go
--creacion de tablas de la base de datos
--Producto Financieros y las transacciones sobre los productos
--desarrollado por Daniel Dominguez
--fecha 18/10/2025

drop TABLE if exists Producto;
create table Producto(
    id int primary key identity(1,1),
    nombre varchar(50) not null,
    descripcion varchar(50) not null,
    categoria varchar(50) not null,
    imagen varchar(50) not null,
    precio DECIMAL(10,2) not null,
    stock int not null
);

go
drop TABLE if exists Transaccion;
create table Transaccion(
    id int primary key identity(1,1),
    idProducto int not null,
    cantidad int not null,
    precioUnitario DECIMAL(10,2) not null,
    precioTotal DECIMAL(10,2) not null,
    detalle varchar(50) not null,
    fecha datetime not null,
    tipoTransaccion varchar(50) not null,
    FOREIGN KEY (idProducto) REFERENCES Producto(id)
);
go
/* Data para la tabla `Producto` inicial  */
INSERT INTO [Producto] ([id], [nombre], [descripcion], [categoria], [imagen], [precio], [stock]) VALUES ('1', 'pan de pascua', 'prueba', 'pasteleria', 'assets.png', '2.25', '20');
INSERT INTO [Producto] ([id], [nombre], [descripcion], [categoria], [imagen], [precio], [stock]) VALUES ('2', 'detergente', 'prueba 2', 'aseo', 'assets.png', '3.25', '35');
INSERT INTO [Producto] ([id], [nombre], [descripcion], [categoria], [imagen], [precio], [stock]) VALUES ('3', 'jabon liquido', 'prueba 3.1', 'aseo', 'asset01.png', '1.3', '25');
INSERT INTO [Producto] ([id], [nombre], [descripcion], [categoria], [imagen], [precio], [stock]) VALUES ('5', 'avena con canela', 'prueba 4', 'cereal', 'assets.png', '1', '40');
INSERT INTO [Producto] ([id], [nombre], [descripcion], [categoria], [imagen], [precio], [stock]) VALUES ('6', 'arroz', 'prueba 5', 'cereal', 'assets.png', '1.50', '40');
INSERT INTO [Producto] ([id], [nombre], [descripcion], [categoria], [imagen], [precio], [stock]) VALUES ('7', 'leche', 'prueba 6', 'lacteos', 'assets.png', '1.25', '50');
INSERT INTO [Producto] ([id], [nombre], [descripcion], [categoria], [imagen], [precio], [stock]) VALUES ('8', 'yogurt', 'prueba 7', 'lacteos', 'assets.png', '3.45', '30');