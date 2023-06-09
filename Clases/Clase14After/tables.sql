CREATE TABLE OrdenCompra(
    id_oc SERIAL PRIMARY KEY,
	  fecha date,
    id_producto int,
	  id_user int,
	  FOREIGN KEY(id_producto) REFERENCES producto(id_producto),
	  FOREIGN KEY(id_user) REFERENCES users(id_user)
);