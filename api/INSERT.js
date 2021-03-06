const { conn } = require("./src/db");
const url = process.env.URL_BACK

const query = () =>
  conn.query(`

INSERT INTO products (name, appearance, description, price, stock, volume, destacado, thumbnail, "createdAt", "updatedAt")

VALUES ('Amber Lager', 'Color ambar, rojjos brillantes, espuma blanca.', 'Sabor maltoso, caramelo leve tostado que deja un sutil dulzor en la boca.', 170, 50, '730 cc', 'true', 'https://ecommerce-patagonia.herokuapp.com/images/amberlager730.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Amber Lager', 'Color ambar, rojjos brillantes, espuma blanca.', 'Sabor maltoso, caramelo leve tostado que deja un sutil dulzor en la boca.', 130, 0, '473 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/amberlager473.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Amber Lager', 'Color ambar, rojjos brillantes, espuma blanca.', 'Sabor maltoso, caramelo leve tostado que deja un sutil dulzor en la boca.', 100, 30, '355 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/amberlager355.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Bohemian Pilsener', 'Color dorado brillante, espuma densa', 'Sabor maltoso, con buen cuerpo y un ﬁnal amargo persistente.', 185, 50, '730 cc', 'true', 'https://ecommerce-patagonia.herokuapp.com/images/bohemian740.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Bohemian Pilsener', 'Color dorado brillante, espuma densa', 'Sabor maltoso, con buen cuerpo y un ﬁnal amargo persistente.', 140, 50, '473 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/bohemian473.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Bohemian Pilsener', 'Color dorado brillante, espuma densa', 'Sabor maltoso, con buen cuerpo y un ﬁnal amargo persistente.', 110, 0, '355 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/bohemina355.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Hoppy Lager', 'Color dorado profundo, espuma densa y duradera, leve opalesencia por ser una cerveza sin filtrar(para conservar aromas)', 'Con una maltosidad que equilibra el amargor, haciéndole muy fácil de tomar. De final seco y balanceado, que invitan a probar otro trago inmediatamente.Amargo bajo y cuerpo moderado.', 170, 100, '730 cc', 'true', 'https://ecommerce-patagonia.herokuapp.com/images/happy730.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Hoppy Lager', 'Color dorado profundo, espuma densa y duradera, leve opalesencia por ser una cerveza sin filtrar(para conservar aromas)', 'Con una maltosidad que equilibra el amargor, haciéndole muy fácil de tomar. De final seco y balanceado, que invitan a probar otro trago inmediatamente.Amargo bajo y cuerpo moderado.', 130, 10, '473 cc', 'false','https://ecommerce-patagonia.herokuapp.com/images/happy473.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kilometro 24.7', 'Dorado profundo con un leve tinte rosado por el sauco, espuma blanca intensa', 'Suave lupulado que le da un amargor elegante, balanceado con la acidez leve del sauco. De cuerpo liviano y muy refrescante.', 190, 100, '730 cc', 'true', 'https://ecommerce-patagonia.herokuapp.com/images/km730.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kilometro 24.7', 'Dorado profundo con un leve tinte rosado por el sauco, espuma blanca intensa', 'Suave lupulado que le da un amargor elegante, balanceado con la acidez leve del sauco. De cuerpo liviano y muy refrescante.', 155, 50, '473 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/km433.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kilometro 24.7', 'Dorado profundo con un leve tinte rosado por el sauco, espuma blanca intensa', 'Suave lupulado que le da un amargor elegante, balanceado con la acidez leve del sauco. De cuerpo liviano y muy refrescante.', 130, 30, '355 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/km355.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kúne', 'Color bronce claro con espuma clara cremosa, de claridad brillante', 'Amargo suave con notas leves a caramelo de la malta.', 190, 100, '730 cc', 'true', 'https://ecommerce-patagonia.herokuapp.com/images/kune730.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kúne', 'Color bronce claro con espuma clara cremosa, de claridad brillante', 'Amargo suave con notas leves a caramelo de la malta.', 155, 20, '473 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/kune433.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kúne', 'Color bronce claro con espuma clara cremosa, de claridad brillante', 'Amargo suave con notas leves a caramelo de la malta.', 130, 70, '355 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/kune355.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Porter', 'Color marron oscuro espuma color canela persistente y cremosa', 'Tostado, con un amargo del lúpulo que acompaña para darle un ﬁnal seco.', 180, 70, '730 cc', 'true', 'https://ecommerce-patagonia.herokuapp.com/images/porter730.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Porter', 'Color marron oscuro espuma color canela persistente y cremosa', 'Tostado, con un amargo del lúpulo que acompaña para darle un ﬁnal seco.', 140, 60, '473 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/nodisponible.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Porter', 'Color marron oscuro espuma color canela persistente y cremosa', 'Tostado, con un amargo del lúpulo que acompaña para darle un ﬁnal seco.', 110, 50, '355 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/nodisponible.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Weisse', 'Color pajizo opalesente de espuma densa y cremosa', 'Muy refrescante, cítrico y cuerpo liviano.', 170, 50, '730 cc', 'true', 'https://ecommerce-patagonia.herokuapp.com/images/weisse730.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Weisse', 'Color pajizo opalesente de espuma densa y cremosa', 'Muy refrescante, cítrico y cuerpo liviano.', 130, 50, '473 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/weisse473.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Weisse', 'Color pajizo opalesente de espuma densa y cremosa', 'Muy refrescante, cítrico y cuerpo liviano.', 100, 0, '355 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/weisse355.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Fernandez IPA', 'Color cobrizo anaranjado levemente opalescente, de espuma consistente', 'Se percibe la frescura del lúpulo recién cosechado, con un amargo elegante y bien presente.', 200, 10, '730 cc', 'true', 'https://ecommerce-patagonia.herokuapp.com/images/nodisponible.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Fernandez IPA', 'Color cobrizo anaranjado levemente opalescente, de espuma consistente', 'Se percibe la frescura del lúpulo recién cosechado, con un amargo elegante y bien presente.', 160, 5, '473 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/fernandez473.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Fernandez IPA', 'Color cobrizo anaranjado levemente opalescente, de espuma consistente', 'Se percibe la frescura del lúpulo recién cosechado, con un amargo elegante y bien presente.', 130, 0, '355 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/nodisponible.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('OCTUBREFEST', 'Color ambar cobrizo', 'Un sabor que parece empezar levemente dulce maltoso para terminar con un ﬁnal seco limpio.', 200, 5, '730 cc', 'true',  'https://ecommerce-patagonia.herokuapp.com/images/octubre730.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('OCTUBREFEST', 'Color ambar cobrizo', 'Un sabor que parece empezar levemente dulce maltoso para terminar con un ﬁnal seco limpio.', 160, 5, '473 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/octubre473.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('OCTUBREFEST', 'Color ambar cobrizo', 'Un sabor que parece empezar levemente dulce maltoso para terminar con un ﬁnal seco limpio.', 140, 0, '355 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/nodisponible.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Sendero Sur', 'Color dorado claro', 'Su amargo medio, pero presente equilibra la suave maltosidad de nuestra malta Pilsen orgánica con el ligero aroma cítrico y afrutado del lúpulo, que recuerda a la cáscara de pomelo. El maqui aporta un final ligeramente seco y ácido.', 130, 30, '473 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/sendero473.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Abraso De OSO', 'Color dorado profundo aspecto levemente opalescente, espuma blanca persistente', 'De sabores a cereal, grano, con un toque dulce por la miel. Refrescante, de cuerpo medio-liviano.', 120, 30, '473 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/oso473.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('VeraIPA', 'Dorado/anaranjado profundo espuma blanca persistente, y opalescencia caracteristica', 'Muy suave lupulado en hervor que le da un amargor bajo, con intenso de sabor cítrico y a frutas tropicales, gracias al agregado de lúpulos aromáticos en Dry Hopping. De cuerpo medio y muy refrescante.', 125, 20, '473 cc', 'false', 'https://ecommerce-patagonia.herokuapp.com/images/veraipa473.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00');


INSERT INTO categories (name, description, "createdAt", "updatedAt")

VALUES ('Clasicas', 'Produccion permanente', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Estacionales', 'Produccion en estaciones especificas', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Edicion Limitada', 'Produccion limitada','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Rojas', 'Color ambar rojizo y espuma blanca','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Doradas', 'Variedad de colores Dorados y espuma blanca','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Negras', 'Color marron oscuro, espuma color canela','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00');


INSERT INTO "Product_Category" ("createdAt", "updatedAt", "productId", "categoryId")
VALUES ('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 1, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 1, 4),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 2, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 2, 4),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 3, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 3, 4),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 4, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 4, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 5, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 5, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 6, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 6, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 7, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 7, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 8, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 8, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 9, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 9, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 10, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 10, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 11, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 11, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 12, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 12, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 13, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 13, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 14, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 14, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 15, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 15, 6),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 16, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 16, 6),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 17, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 17, 6),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 18, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 18, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 19, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 19, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 20, 1),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 20, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 21, 2),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 21, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 22, 2),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 22, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 23, 2),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 23, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 24, 2),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 24, 4),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 25, 2),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 25, 4),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 26, 2),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 26, 4),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 27, 3),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 27, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 28, 3),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 28, 5),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 29, 3),
('2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 29, 5);

INSERT INTO users (givenname, familyname, email, password, role, "createdAt", "updatedAt")

VALUES ('Pepito', 'Pon', 'pepito22@gmail.com', '$2b$10$v/Zn64JW2uuvyb05G7gIsuC/X4uPDzPLmP2s13uAxk8nNWrfsft.i', 'user','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Ultimate', 'Marvel', 'Marve_16160@gmail.com', '$2b$10$eTyS510JPtLyfni.Z9W96uLUA8Avf3C9/Hiu4s0PgUsY/8cPBAt6q', 'admin','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Alan', 'Brito', 'Delgado@gmail.com', '$2b$10$s6CR9Exw4f3LZK5BLw61KuFE6Hz6onUAfdnpz1dFO/EGSNicO5/fi', 'user','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Tobey', 'Maguire', 'spider@gmail.com', '$2b$10$tULPveeuq.bCSho/IVyFeOxz6iqh87t8bbnnkVs42bU34GTnCXC36', 'admin','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Pepardo', 'Bondon', 'bondi@gmail.com', '$2b$10$4F5TOvBCZ00W7p.7D78Xl.JyePPuIwIitdSOwyqwr53ik/WOkJd6K', 'user','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Alberto', 'Carlos', 'Cantos@gmail.com', '$2b$10$xJ9cwZjEq/4UeOd36C4P9OVs/lTYm59O0NTfQ6Jx9Jp.DMTZ0diFC', 'user','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Armando', 'Esteban', 'quito@gmail.com', '$2b$10$lgyC/juzBL8KPrEjGYd0JeQGVVjBDmObTwztUxAs45XUI0hR1bjia', 'user','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Admin', 'Admin', 'Admin@soyadmin.com', '$2b$10$KjH28ocxb6CGMIaSXUQxKuuyOct/9ldBOhwVxvnEuYWfSmXA6QGRK', 'admin', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00');

INSERT INTO Orders (total, date, status, "createdAt", "updatedAt", "userId")
VALUES (100 ,'2017-08-09 07:00:00 -7:00', 'carrito', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 1),
(100 ,'2017-08-09 07:00:00 -7:00', 'carrito', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 2),
(100 ,'2017-08-09 07:00:00 -7:00', 'carrito', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 3),
(100 ,'2017-08-09 07:00:00 -7:00', 'carrito', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 4),
(100 ,'2017-08-09 07:00:00 -7:00', 'creada', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 1),
(100 ,'2017-08-09 07:00:00 -7:00', 'cancelada', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 1);

INSERT INTO "Order_products" (quantity, unitprice,  "createdAt", "updatedAt", "orderId", "productId" )
VALUES (10 ,170, '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 1, 1),
(10 ,100, '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 1, 3),
(5 ,100, '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 2, 3),
(9 ,170, '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 2, 1),
(8 ,170, '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 3, 1),
(2 ,100, '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 3, 3);

INSERT INTO reviews (rate, comment,  "createdAt", "updatedAt", "productId", "userId" )
VALUES (3 ,'Me parece una cerveza normal', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 1, 1),
(5 ,'Mi cerveza favorita de patagonia, me encanta siempre arrancar con esta', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 1, 2),
(2 ,'Poco recomendable, no se destaca en nada de otras cervezas del mismo tipo', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 1, 3),
(5 ,'SIMPLEMENTE EXCELENTE!!! Super recomendable', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 1, 4),
(4 ,'De las mejorcitas de patagonia, con un buen gusto agrio a pesar de ser cerveza rubia', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 2, 1),
(1 ,'Muy amarga para mi gusto. No la recomiendo a menos que te gusten las rubias muy fuertes. Para eso me pido otro tipo directamente. No se que fue lo que intentaron hacer con este gusto horrible que le pusieron. Me decepcionó totalmente', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 2, 2),
(3 ,'Me parece una cerveza normal', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 2, 3),
(5 ,'Mi cerveza favorita de patagonia, me encanta siempre arrancar con esta', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 3, 1),
(3 ,'Ni fu ni fa', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 3, 2),
(1 ,'meh, prefiero quilmes por el precio que pagué la última vez', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 3, 3),
(5 ,'ME encantaaaaaAA. Siempre la pido!!!!', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 4, 1),
(5 ,'Mi cerveza favorita de patagonia, me encanta siempre arrancar con esta', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 4, 2),
(3 ,'Me parece una cerveza normal', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00', 4, 3);

`);




module.exports = { query };