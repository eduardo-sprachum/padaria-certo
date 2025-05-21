<?php
date_default_timezone_set('America/Sao_Paulo');

// Conexão com o banco de dados
$host = "localhost";
$db = "padaria";
$user = "root";
$pass = "";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Dados do formulário
$produtos = $_POST['produtos'];
$quantidades = $_POST['quantidades'];
$valorTotal = $_POST['valorTotal'];
$dataHora = date('Y-m-d H:i:s');

// Loop para salvar cada produto vendido separadamente
for ($i = 0; $i < count($produtos); $i++) {
    $produto = $conn->real_escape_string($produtos[$i]);
    $quantidade = (int)$quantidades[$i];

    $stmt = $conn->prepare("INSERT INTO vendas (produto, quantidade, valor_total, data_hora) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sids", $produto, $quantidade, $valorTotal, $dataHora);
    $stmt->execute();
}

$conn->close();

echo json_encode(["success" => true]);
?>
