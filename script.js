const perguntas = [
  {
    pergunta: "Qual tag cria um título principal?",
    opcoes: ["<p>", "<h1>", "<div>", "<span>"],
    correta: 1
  },
  {
    pergunta: "Qual tag cria uma lista não ordenada?",
    opcoes: ["<ul>", "<li>", "<ol>", "<a>"],
    correta: 0
  },
  {
    pergunta: "Qual tag cria um parágrafo?",
    opcoes: ["<text>", "<p>", "<h3>", "<br>"],
    correta: 1
  },
  {
    pergunta: "Qual atributo define o link em uma tag <a>?",
    opcoes: ["src", "href", "link", "url"],
    correta: 1
  },
  {
    pergunta: "Qual tag é usada para inserir uma imagem?",
    opcoes: ["<image>", "<img>", "<pic>", "<figure>"],
    correta: 1
  },
  {
    pergunta: "Qual tag cria uma lista ordenada?",
    opcoes: ["<ul>", "<li>", "<ol>", "<dl>"],
    correta: 2
  },
  {
    pergunta: "Qual tag quebra a linha?",
    opcoes: ["<p>", "<newline>", "<br>", "<hr>"],
    correta: 2
  },
  {
    pergunta: "Qual atributo define texto alternativo em imagens?",
    opcoes: ["title", "desc", "alt", "name"],
    correta: 2
  },
  {
    pergunta: "Qual tag cria um formulário?",
    opcoes: ["<input>", "<form>", "<button>", "<fieldset>"],
    correta: 1
  },
  {
    pergunta: "Qual elemento cria um botão clicável?",
    opcoes: ["<click>", "<input>", "<btn>", "<button>"],
    correta: 3
  }
];
let perguntaAtual = 0;
let pontos = 0;
let tempo = 10;
let timer;

function iniciarJogo() {
  document.getElementById("telaInicial").style.display = "none";
  document.getElementById("telaJogo").style.display = "block";
  carregarPergunta();
}

function atualizarTopo() {
  document.getElementById("placar").innerText = "🏆 Pontos: " + pontos;
  document.getElementById("tempo").innerText = "⏱️ " + tempo + "s";
}

function iniciarTempo() {
  tempo = 10;
  atualizarTopo();

  timer = setInterval(() => {
    tempo--;
    atualizarTopo();
    if (tempo === 0) {
      clearInterval(timer);
      document.getElementById("resultado").innerText = "⏰ Tempo esgotado!";
      proximaPergunta();
    }
  }, 1000);
}

function carregarPergunta() {
  document.getElementById("resultado").innerText = "";
  const p = perguntas[perguntaAtual];
  document.getElementById("pergunta").innerText = p.pergunta;

  p.opcoes.forEach((op, i) => {
    document.getElementById("b" + i).innerText = op;
  });

  iniciarTempo();
}

function responder(indice) {
  clearInterval(timer);

  if (indice === perguntas[perguntaAtual].correta) {
    pontos += 10 + tempo;
    document.getElementById("resultado").innerText =
      "✅ Correto! +" + (10 + tempo) + " pontos";
  } else {
    document.getElementById("resultado").innerText = "❌ Errado!";
  }

  atualizarTopo();
  proximaPergunta();
}

function proximaPergunta() {
  perguntaAtual++;
  setTimeout(() => {
    if (perguntaAtual < perguntas.length) {
      carregarPergunta();
    } else {
      finalizarJogo();
    }
  }, 1000);
}

function finalizarJogo() {
  document.getElementById("telaJogo").innerHTML = `
    <h1>🏁 Fim de Jogo!</h1>
    <p>Sua pontuação final:</p>
    <h2 style="color:#38bdf8">${pontos} pontos</h2>
    <button onclick="location.reload()">🔄 Jogar Novamente</button>
  `;
}

