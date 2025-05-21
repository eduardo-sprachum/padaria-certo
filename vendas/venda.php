<?php
// salvar_venda.php

date_default_timezone_set('America/Sao_Paulo');

$host = 'localhost';
$db = 'padaria';
$user = 'root';
$pass = 'senha_aqui'; // ajuste sua senha

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $produtos = $_POST['produtos'];
    $valorTotal = $_POST['valorTotal'];
    $dataHora = date("Y-m-d H:i:s");

    foreach ($produtos as $p) {
        $produto = $p['produto'];
        $quantidade = $p['quantidade'];
        $stmt = $pdo->prepare("INSERT INTO vendas (produto, quantidade, valor_total, data_hora) VALUES (?, ?, ?, ?)");
        $stmt->execute([$produto, $quantidade, $valorTotal, $dataHora]);
    }

    echo json_encode(["status" => "ok"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "erro", "mensagem" => $e->getMessage()]);
}
?>
