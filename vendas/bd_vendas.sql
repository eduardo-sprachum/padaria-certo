CREATE DATABASE IF NOT EXISTS padaria;
USE padaria;

CREATE TABLE IF NOT EXISTS vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto VARCHAR(255),
    quantidade INT,
    valor_total DECIMAL(10,2),
    data_hora DATETIME
);
