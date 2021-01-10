const { conn } = require("./src/db");

const query = () =>
  conn.query(`

INSERT INTO products (name, appearance, description, price, stock, volume, destacado, thumbnail, "createdAt", "updatedAt")

VALUES ('Amber Lager', 'Color ambar, rojjos brillantes, espuma blanca.', 'Sabor maltoso, caramelo leve tostado que deja un sutil dulzor en la boca.', 170, 50, '730 cc', 'true', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHlzdC432zyFNkwS2cQx_bCWsNQf3y5f0be70qptJvvb98WdHGUGwJrsEtPafjg_QA5Rgui6PxQYA&usqp=CAc', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Amber Lager', 'Color ambar, rojjos brillantes, espuma blanca.', 'Sabor maltoso, caramelo leve tostado que deja un sutil dulzor en la boca.', 130, 0, '473 cc', 'false', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYvKfnk3QMbPM3SzUoV6JTs3PIbHRbtIIUfSm-xcdDgQ0b6aHeDdPBLd2KeIM-lgvDKAstKLY&usqp=CAc', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Amber Lager', 'Color ambar, rojjos brillantes, espuma blanca.', 'Sabor maltoso, caramelo leve tostado que deja un sutil dulzor en la boca.', 100, 30, '355 cc', 'false', 'https://emporiodacerveja.vtexassets.com/arquivos/ids/176098/Cerveja-Patagonia-Amber-Lager-Long-Neck-355ml.jpg?v=637212809310330000', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Bohemian Pilsener', 'Color dorado brillante, espuma densa', 'Sabor maltoso, con buen cuerpo y un ﬁnal amargo persistente.', 185, 50, '730 cc', 'true', 'https://emporiodacerveja.vteximg.com.br/arquivos/ids/174178-1000-1000/Cerveja-Patagonia-Bohemian-Pilsener-740ml.jpg?v=637008826268730000', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Bohemian Pilsener', 'Color dorado brillante, espuma densa', 'Sabor maltoso, con buen cuerpo y un ﬁnal amargo persistente.', 140, 50, '473 cc', 'false', 'https://www.clubcervecero.com.py/tienda/web/assets/images/productos/Patagonia%20Bohemian%20269_kqbmu2yb.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Bohemian Pilsener', 'Color dorado brillante, espuma densa', 'Sabor maltoso, con buen cuerpo y un ﬁnal amargo persistente.', 110, 0, '355 cc', 'false', 'https://emporiodacerveja.vteximg.com.br/arquivos/ids/176099-1000-1000/Cerveja-Patagonia-Bohemian-Pilsener-Long-Neck--355ML.jpg?v=637212810036370000', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Hoppy Lager', 'Color dorado profundo, espuma densa y duradera, leve opalesencia por ser una cerveza sin filtrar(para conservar aromas)', 'Con una maltosidad que equilibra el amargor, haciéndole muy fácil de tomar. De final seco y balanceado, que invitan a probar otro trago inmediatamente.Amargo bajo y cuerpo moderado.', 170, 100, '730 cc', 'true', 'https://www.elreferente.com.ar/assets/images/productos/fotoproducto421_1585835279.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Hoppy Lager', 'Color dorado profundo, espuma densa y duradera, leve opalesencia por ser una cerveza sin filtrar(para conservar aromas)', 'Con una maltosidad que equilibra el amargor, haciéndole muy fácil de tomar. De final seco y balanceado, que invitan a probar otro trago inmediatamente.Amargo bajo y cuerpo moderado.', 130, 10, '473 cc', 'false','https://www.clubcervecero.com.py/tienda/web/assets/images/productos/Patagonia%20Lata%20hoppy%20269_dfv2smgm.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kilometro 24.7', 'Dorado profundo con un leve tinte rosado por el sauco, espuma blanca intensa', 'Suave lupulado que le da un amargor elegante, balanceado con la acidez leve del sauco. De cuerpo liviano y muy refrescante.', 190, 100, '730 cc', 'true', 'http://www.clubcervecero.com.py/tienda/web/assets/images/productos/PATAGONIA-24.7-BOTELLA-730-ML_f2e4lraw.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kilometro 24.7', 'Dorado profundo con un leve tinte rosado por el sauco, espuma blanca intensa', 'Suave lupulado que le da un amargor elegante, balanceado con la acidez leve del sauco. De cuerpo liviano y muy refrescante.', 155, 50, '473 cc', 'false', 'http://www.clubcervecero.com.py/tienda/web/assets/images/productos/PATAGONIA-24.7-LATA-473-ML_xtaed7og.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kilometro 24.7', 'Dorado profundo con un leve tinte rosado por el sauco, espuma blanca intensa', 'Suave lupulado que le da un amargor elegante, balanceado con la acidez leve del sauco. De cuerpo liviano y muy refrescante.', 130, 30, '355 cc', 'false', 'https://emporiodacerveja.vtexassets.com/arquivos/ids/177121/CervejaPatagonia247_1000x1000px.jpg?v=637311895367600000', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kúne', 'Color bronce claro con espuma clara cremosa, de claridad brillante', 'Amargo suave con notas leves a caramelo de la malta.', 190, 100, '730 cc', 'true', 'https://www.bessaudiovideo.com/produtos_img/1/4/5/4/5/8/IMG_145458_1.JPG', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kúne', 'Color bronce claro con espuma clara cremosa, de claridad brillante', 'Amargo suave con notas leves a caramelo de la malta.', 155, 20, '473 cc', 'false', 'https://www.bessaudiovideo.com/produtos_img/1/4/5/4/5/8/IMG_145458_1.JPG', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Kúne', 'Color bronce claro con espuma clara cremosa, de claridad brillante', 'Amargo suave con notas leves a caramelo de la malta.', 130, 70, '355 cc', 'false', 'https://www.superseis.com.py/images/thumbs/0209226.jpeg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Porter', 'Color marron oscuro espuma color canela persistente y cremosa', 'Tostado, con un amargo del lúpulo que acompaña para darle un ﬁnal seco.', 180, 70, '730 cc', 'true', 'https://d26lpennugtm8s.cloudfront.net/stores/861/458/products/335371-d5bb01fa338479e48115671048376584-640-0.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Porter', 'Color marron oscuro espuma color canela persistente y cremosa', 'Tostado, con un amargo del lúpulo que acompaña para darle un ﬁnal seco.', 140, 60, '473 cc', 'false', 'http://localhost:3001/images/nodisponible.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Porter', 'Color marron oscuro espuma color canela persistente y cremosa', 'Tostado, con un amargo del lúpulo que acompaña para darle un ﬁnal seco.', 110, 50, '355 cc', 'false', 'http://localhost:3001/images/nodisponible.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Weisse', 'Color pajizo opalesente de espuma densa y cremosa', 'Muy refrescante, cítrico y cuerpo liviano.', 170, 50, '730 cc', 'true', 'https://emporiodacerveja.vteximg.com.br/arquivos/ids/173977-1000-1000/patagonia-weisse-nacional-740ml.jpg?v=636996792682870000', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Weisse', 'Color pajizo opalesente de espuma densa y cremosa', 'Muy refrescante, cítrico y cuerpo liviano.', 130, 50, '473 cc', 'false', 'https://elmundodelasado.com/285-large_default/patagonia-weisse-lata-473ml.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Weisse', 'Color pajizo opalesente de espuma densa y cremosa', 'Muy refrescante, cítrico y cuerpo liviano.', 100, 0, '355 cc', 'false', 'https://emporiodacerveja.vtexassets.com/arquivos/ids/176100-800-auto?width=800&height=auto&aspect=true', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Fernandez IPA', 'Color cobrizo anaranjado levemente opalescente, de espuma consistente', 'Se percibe la frescura del lúpulo recién cosechado, con un amargo elegante y bien presente.', 200, 10, '730 cc', 'true', 'http://localhost:3001/images/nodisponible.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Fernandez IPA', 'Color cobrizo anaranjado levemente opalescente, de espuma consistente', 'Se percibe la frescura del lúpulo recién cosechado, con un amargo elegante y bien presente.', 160, 5, '473 cc', 'false', 'https://cdn.shopify.com/s/files/1/1103/5152/products/Patagonia_IPA_Fernandez_1000_x_2048_grande.jpg?v=1556030993', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Fernandez IPA', 'Color cobrizo anaranjado levemente opalescente, de espuma consistente', 'Se percibe la frescura del lúpulo recién cosechado, con un amargo elegante y bien presente.', 130, 0, '355 cc', 'false', 'http://localhost:3001/images/nodisponible.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('OCTUBREFEST', 'Color ambar cobrizo', 'Un sabor que parece empezar levemente dulce maltoso para terminar con un ﬁnal seco limpio.', 200, 5, '730 cc', 'true',  'https://www.clubcervecero.com.py/tienda/web/imagen.php?src=assets/images/productos/PATAGONIA-OCTUBREFEST-BOTELLA-730ML_jlu0ece6.jpg&x=632&y=948&r=0&c=1&v=1&e=1', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('OCTUBREFEST', 'Color ambar cobrizo', 'Un sabor que parece empezar levemente dulce maltoso para terminar con un ﬁnal seco limpio.', 160, 5, '473 cc', 'false', 'https://images-ti-vm1.tiendainglesa.com.uy/medium/P449301-1.jpg?20181207102259,Cerveza-PATAGONIA-Octubrefest-lata-473ml-en-Tienda-Inglesa', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('OCTUBREFEST', 'Color ambar cobrizo', 'Un sabor que parece empezar levemente dulce maltoso para terminar con un ﬁnal seco limpio.', 140, 0, '355 cc', 'false', 'http://localhost:3001/images/nodisponible.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Sendero Sur', 'Color dorado claro', 'Su amargo medio, pero presente equilibra la suave maltosidad de nuestra malta Pilsen orgánica con el ligero aroma cítrico y afrutado del lúpulo, que recuerda a la cáscara de pomelo. El maqui aporta un final ligeramente seco y ácido.', 130, 30, '473 cc', 'false', 'https://http2.mlstatic.com/D_NQ_NP_770719-MLA43699688782_102020-O.webp', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Abraso De OSO', 'Color dorado profundo aspecto levemente opalescente, espuma blanca persistente', 'De sabores a cereal, grano, con un toque dulce por la miel. Refrescante, de cuerpo medio-liviano.', 120, 30, '473 cc', 'false', 'https://www.comprasparaguai.com.br/media/fotos/modelos/cerveja_patagonia_abrazo_de_oso_473ml_119781_550x550.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('VeraIPA', 'Dorado/anaranjado profundo espuma blanca persistente, y opalescencia caracteristica', 'Muy suave lupulado en hervor que le da un amargor bajo, con intenso de sabor cítrico y a frutas tropicales, gracias al agregado de lúpulos aromáticos en Dry Hopping. De cuerpo medio y muy refrescante.', 125, 20, '473 cc', 'false', 'https://www.boulevard-sa.com.ar/Site/img/products/patagonia/Patagonia-vera-ipa-473-L.jpg', '2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00');


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

VALUES ('Pepito', 'Pon', 'pepito22@gmail.com', '$2b$10$JYZBhXOEWO8VIJA8JLNSguKoGjM6Yiwm6yxmKaMWbnqvz0i0JLGyq', 'user','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Ultimate', 'Marvel', 'Marve_16160@gmail.com', '$2b$10$ilKA0iNbUtT6b.YS5/nFxeAwzEPjsBCteYMJt9CBh3D8B6sgRNO7i', 'admin','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Juan', 'Cho', 'talarga@gmail.com', '$2b$10$CfStvFoWhUXRUyfCNJ9KHOrhdKKKiDZWwDY5a0JpV/JpYZvVs/fb6', 'user','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Tobey', 'Maguire', 'spider@gmail.com', '$2b$10$03.M75gYOUhqm.1hhGwIlOCocLJ9YQsWwj9w7KkQe74DP2360il5y', 'admin','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Pepardo', 'Bondon', 'bondi@gmail.com', '$2b$10$3mlcCI1NkXCglnR/qcGrKemQzB.U7V8L8kAOQ.jdoYn5pPrigA4u.', 'user','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Pepon', 'Sodom', 'pepon@gmail.com', '$2b$10$XjZEMZWtsnNetPOrQBWE3uRQYZHwD.tQrxZu3aIKfhpaxN./PG7S.', 'user','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
('Armando', 'Esteban', 'quito@gmail.com', '$2b$10$x7PEB9lO8cNjJ.CZSS/wPeVd1uktD3vawwiwQJ9BApB6altR4haCK', 'user','2017-08-09 07:00:00 -7:00', '2017-08-09 08:00:00 -7:00'),
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
`);




module.exports = { query };