USE tfcManager;

CREATE TABLE IF NOT EXISTS roles(
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR (30)
);

INSERT INTO roles (role_name)
VALUES
('Administrador'),
('Empleado');

-- KEY user_role (user_role),
--     CONSTRAINT users_roles_fk FOREIGN KEY (user_role) REFERENCES roles(role_id) ON DELETE NO ACTION

CREATE TABLE IF NOT EXISTS users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR (100) NOT NULL,
    user_email VARCHAR (100) NOT NULL,
    user_password VARCHAR (512) NOT NULL,
    user_address VARCHAR (100),
    user_city VARCHAR (30),
    user_province VARCHAR (30),
    user_cp VARCHAR (5),
    user_phone VARCHAR (9),
    user_role INT NOT NULL,
    user_state TINYINT DEFAULT 1,
    FOREIGN KEY (user_role) REFERENCES roles(role_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO users (user_name, user_email, user_password, user_address, user_city, user_province, user_cp, user_phone, user_role)
VALUES
('PedroCalvo', 'pedrojcalvo@gmail.com', '$2a$10$1ISZ7Mr2C4dr03mXI/ImLuEZjwlWJc/8LjDM83s35fccZ1xTR/c1q', 'Calle Lepanto Nº 7 2ºIzq', 'Elda', 'Alicante', '03600', '744626081', 1 ),
('Admin', 'admin@gmail.com', '$2a$10$FlRlpGFCpp.1.0OiPn3PMuSI.ULF7KafuL5Ny7GiRjRViaj8rhun6', 'Calle Inventada Nº 12 3ºIzq', 'Alcantarilla', 'Murcia', '30820', '626235123', 1),
('Empleado', 'empleado@gmail.com', '$2a$10$kxS6ookx7ARL2NQa35bL/.RWMa6R29aO5nXpTJ/qJIsldNFPO8bla', 'Calle La calleja Nº 1 Bajo', 'Caudete', 'Albacete', '02660', '618684759', 2);



CREATE TABLE IF NOT EXISTS customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_dni VARCHAR (9),
    customer_name VARCHAR (100),
    customer_email VARCHAR (100),
    customer_address VARCHAR (100),
    customer_city VARCHAR (30),
    customer_province VARCHAR (30),
    customer_cp INT,
    customer_phone VARCHAR (9),
    customer_alert VARCHAR (1000),
    customer_state TINYINT DEFAULT 1
);

INSERT INTO customers (customer_dni, customer_name, customer_email, customer_address, customer_city, customer_province, customer_cp, customer_phone, customer_alert)
VALUES
('31559875H', 'Arturo Perez-Reverte',      'arturoperezreverte@gmail.com',   'Avenida Constitucion 17 3B', 'Elda',              'Alicante',    '03600',  '975765456', 'Pagos pendientes'),
('79157842G', 'Miguel de Unamuno',         'migueldeunamuno@gmail.com',      'Plaza de las Malvas 27 4C',  'Albacete',          'Albacete',    '02006',  '691254781', 'Pagos pendientes'),
('47569575B', 'Isabel Allende',            'isabelallende@gmail.com',        'Los Olivos 34 1J',           'Sevilla',           'Sevilla',     '41017',  '693459782', ''),
('25843691B', 'Francisco Baldomero',       'franciscobladomero@gmail.com',   'Altiplano 25 2C',            'Lepe',              'Huelva',      '21004',  '689421689', ''),
('36572158V', 'Margarita Fernandez',       'margaritafernandez@gmail.com',   'Las casitas 45',             'Cuntis',            'Pontevedra',  '36670',  '758693217', ''),
('65879635S', 'Eustaquio Canto Cano',      'eustaquiocantocano@gmail.com',   'Benito Perez Galdos 34 3D',  'Villena',           'Alicante',    '03400',  '635872541', 'Pagos pendientes'),
('75869324L', 'Patrick Rotfus',            'patrickrotfus@gmail.com',        'Cañada 34',                  'Villena',           'Alicante',    '03400',  '755215215', ''),
('58637931W', 'John Ronald Reuel Tolkien', 'jrrt@gmail.com',                 'La Comarca 32 1C',           'Bolson Cerrado',    'La Comarca',  '00010',  '658412589', ''),
('75983214T', 'Robert E Howart',           'conan@gmail.com',                'Casicas del señor 12',       'Alicante',          'Alicante',    '03001',  '635213121', ''),
('19657394W', 'Andrzej Sapkowski',         'thewitcher@gmail.com',           'Temeria 34',                 'Vengerberg',        'Aedirn',      '99999',  '733898741', ''),
('58234498G', 'Michael Moorcock',          'campeoneterno@gmail.com',        'Grandes escritores 45',      'Madrid',            'Madrid',      '28082',  '695369963', 'Pagos pendientes'),
('72396542Q', 'William Faulkner',          'williamfaulkner@gmail.com',      'Estafeta 87 1D',             'Pamplona',          'Pamplona',    '31001',  '753159854', ''),
('72589654H', 'Oscar Wilde',               'oscarwilde@gmail.com',           'Gran Vía 134 2D',            'Alicante',          'Alicante',    '03001',  '619736542', ''),
('25731458L', 'Franz Kafka',               'franzkafka@gmail.com',           'Paseo de los Tristes 94',    'Granada',           'Granada',     '18001',  '638554221', 'Pagos pendientes'),
('12358641E', 'William Shakespeare',       'williamshakespeare@gmail.com',   'Marques de Larios 21',       'Málaga',            'Málaga',      '29001',  '733447147', ''),
('26439874K', 'James Joyce',               'jamesjoyce@gmail.com',           'Laurel 36 2C',               'Logroño',           'Logroño',     '26001',  '722998877', ''),
('68542142H', 'Philip K. Dick',            'philipkdick@gmail.com',          'Paseo de Gracia 41 5D',      'Barcelona',         'Barcelona',   '08001',  '658965874', ''),
('32154785G', 'Gabriel García Márquez',    'gabrielgarciamarquez@gmail.com', 'Ruta de los Molinos 49 4A',  'Campo de Criptana', 'Ciudad Real', '13610',  '673198654', 'Pagos pendientes');




CREATE TABLE IF NOT EXISTS projects(
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR (100),
    project_author INT DEFAULT NULL,
    project_customer INT DEFAULT NULL,
    project_description VARCHAR(1000),
    project_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    project_alert VARCHAR (1000),
    project_state TINYINT DEFAULT 1,
    FOREIGN KEY (project_author) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (project_customer) REFERENCES customers(customer_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO projects(project_name, project_author, project_customer, project_description, project_alert)
VALUES
('Reforma Heladería Sirvent', 1, 1, 'Reforma eléctrica integral del local. Iluminación de la fachada.', ''),
('Iluminación Bocopa', 2, 6, 'Iluminación de fachada', 'Descuadre en materiales'),
('Frutería Paquito', 2, 8, 'Sustitución de toda la red eléctica e iluminación de stands', ''),
('Talleres Molina', 1, 12, 'Subida de potencia y mejora de iluminación.', '');



CREATE TABLE IF NOT EXISTS materials(
    material_id INT PRIMARY KEY AUTO_INCREMENT,
    material_reference VARCHAR (100),
    material_brand VARCHAR (100),
    material_description VARCHAR (500),
    material_pvp DECIMAL (6,2),
    material_ecotax VARCHAR (10),
    material_state TINYINT DEFAULT 1
);

INSERT INTO materials (material_reference, material_brand, material_description, material_pvp, material_ecotax)
VALUES
('10950-ABR', 'EFAPEL', 'ADAPT MODULAR Q45 P/CANALES C/TAPA L75 BLANCO', '1.45', 'Si'),
('90608-TIS', 'EFAPEL', 'TECLA INT. BIPOLAR GRIS', '3.35', 'No'),
('10295-RBR', 'EFAPEL', 'TOPE P/CANAL 180X50 BLANCO', '2.28', 'No'),
('90605-TAL', 'EFAPEL', 'TECLA SIMPLE CON SIMBOLO DE CAMPANA ALUMINIO', '3.35', 'Si'),
('12345-VRP', 'SONY', 'TRIPLE INTERRUPTOR MEC. 21', '6.12', 'No'),
('90605-TPM', 'SONY', 'TOMA RJ45 UTP C/5E MEC 21', '6.25', 'No'),
('90632-TBR', 'EFAPEL', 'TAPA SCHUKO C/PROTECCION BLANCA', '3.09', 'Si'),
('90751-TPM', 'EFAPEL', 'TAPA RJ-45 NEGRO', '3.35', 'Si'),
('10959-ABR', 'SONY', 'TAPA P/ADAPT MOD Q45 P/CANALES C/TAPA L75 BLANCO', '1.10', 'No'),
('90632-TAL', 'SONY', 'TAPA C/PROTECCION P/BASE SCHUKO ALUMINIO', '3.40', 'Si'),
('45972-SBR', 'EFAPEL', 'MODULO C/CONECTOR HEMBRA RJ11 CAT. 3 BLANCO', '5.42', 'No'),
('90910-TBB', 'EFAPEL', 'MARCO SIMPLE BLANCO/BLANCO', '2.30', 'Si'); 

CREATE TABLE IF NOT EXISTS hourlyrates(
    hourlyrate_id INT PRIMARY KEY AUTO_INCREMENT,
    hourlyrate_name VARCHAR (20),
    hourlyrate_pvp DECIMAL (6,2),
    hourlyrate_state TINYINT DEFAULT 1
);

INSERT INTO hourlyrates (hourlyrate_name, hourlyrate_pvp)
VALUES
('Normal', 20),
('Reducida', 15),
('Horas Extra', 35);

CREATE TABLE IF NOT EXISTS workorders(
    workorder_id INT PRIMARY KEY AUTO_INCREMENT,
    workorder_author INT DEFAULT NULL,
    workorder_project INT DEFAULT NULL,
    workorder_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    workorder_hours INT,
    workorder_minutes INT,
    workorder_hourlyrate INT DEFAULT NULL,
    workorder_alert VARCHAR (1000),
    workorder_state TINYINT DEFAULT 1,
    FOREIGN KEY (workorder_hourlyrate) REFERENCES hourlyrates(hourlyrate_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (workorder_author) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (workorder_project) REFERENCES projects(project_id)
    ON DELETE CASCADE ON UPDATE CASCADE

);

INSERT INTO workorders (workorder_author, workorder_project, workorder_hours, workorder_minutes, workorder_hourlyrate, workorder_alert)
VALUES
(1, 1, 8, 0, 1, 'Problemas para acceder al recinto'),
(2, 1, 6, 30, 1, 'Recibimos inspección de trabajo'),
(3, 1, 9, 0, 1, ''),
(2, 2, 8, 0, 2, ''),
(3, 2, 8, 0, 2, ''),
(3, 2, 5, 25, 2, ''),
(1, 4, 6, 15, 3, ''),
(3, 4, 7, 0, 3, 'El cliente estuvo revisando la obra');

CREATE TABLE IF NOT EXISTS workorder_materials(
    workorderMaterials_id INT PRIMARY KEY AUTO_INCREMENT,
    workorder_id INT DEFAULT NULL,
    material_id INT DEFAULT NULL,
    material_amount INT(3),
    FOREIGN KEY (workorder_id) REFERENCES workorders(workorder_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materials(material_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO workorder_materials (workorder_id, material_id, material_amount)
VALUES
(1, 2, 12),
(1, 3, 2),
(1, 8, 5),
(1, 1, 50),
(2, 2, 1),
(2, 9, 10),
(2, 11, 25),
(3, 6, 20);

-- SOURCE C:/Users/34744/Desktop/TFCManager/backend/BD/gisbertBanyo_DB.sql;
