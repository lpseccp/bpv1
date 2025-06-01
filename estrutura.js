<!-- estrutura.html --><!DOCTYPE html><html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Estrutura de Capital</title>
  <link rel="stylesheet" href="estrutura.css" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <header>
    <h1>Estrutura de Capital</h1>
    <nav>
      <a href="index.html">Início</a>
      <a href="dre.html">DRE</a>
      <a href="balanco.html">Balanço</a>
      <a href="estrutura.html" class="active">Estrutura de Capital</a>
    </nav>
  </header>  <main>
    <form id="estrutura-form">
      <label for="capital-proprio">Capital Próprio (R$)</label>
      <input type="number" id="capital-proprio" required /><label for="capital-terceiros">Capital de Terceiros (R$)</label>
  <input type="number" id="capital-terceiros" required />

  <button type="submit">Calcular</button>
</form>

<section class="resultado">
  <p id="participacao-proprio"></p>
  <p id="participacao-terceiros"></p>
  <p id="grau-endividamento"></p>
</section>

<canvas id="grafico-estrutura"></canvas>

  </main>  <script src="estrutura.js"></script></body>
</html>