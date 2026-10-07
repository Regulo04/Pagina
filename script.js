let dados = [];

function generateTable(data) {
  if (!data || data.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.textContent = "Nenhuma recomendação encontrada.";
    return mensagem;
  }

  const table = document.createElement("table");
  const columns = Object.keys(data[0]);

  const header = document.createElement("tr");
  columns.forEach(column => {
    const th = document.createElement("th");
    th.textContent = column;
    header.appendChild(th);
  });
  table.appendChild(header);

  data.forEach(item => {
    const row = document.createElement("tr");

    columns.forEach(column => {
      const cell = document.createElement("td");
      cell.textContent = item[column];
      row.appendChild(cell);
    });

    table.appendChild(row);
  });

  return table;
}

function atualizarTabela() {
  const filtros = [];

  const mapeamentoFiltros = {
    "filtro_Tag_Controle": "Controle",
    "filtro_Tag_TA": "TA",
    "filtro_Tag_QV": "QV",
    "filtro_Tag_InfoE": "Info E",
    "filtro_Tag_InfoG": "Info G",
    "filtro_Tag_InfoA": "Info A",
    "filtro_Tag_Feedback": "Feedback",
    "filtro_Tag_Instalacao": "Instalação",
    "filtro_Tag_Mecanica": "Mecânica",
    "filtro_Tag_Menu": "Menu",
    "filtro_Tag_Desafio": "Desafio",
    "filtro_Tag_Narrativa": "Narrativa",
    "filtro_Tag_CJ": "CJ",
    "filtro_Tag_Tutorial": "Tutorial"
  };

  Object.keys(mapeamentoFiltros).forEach(id => {
    const el = document.getElementById(id);
    if (el && el.checked) {
      filtros.push(mapeamentoFiltros[id].toLowerCase());
    }
  });

  let dadosFiltrados = dados;

  if (filtros.length > 0) {
    dadosFiltrados = dados.filter(item =>
      item.Tags &&
      filtros.some(filtro =>
        item.Tags.toLowerCase().includes(filtro)
      )
    );
  }

  const container = document.getElementById("tabela");
  container.innerHTML = "";
  container.appendChild(generateTable(dadosFiltrados));
}

async function loadTable() {
  try {
    const response = await fetch("dados/recomendacoes.json");
    dados = await response.json();
    atualizarTabela();
  } catch (erro) {
    console.error("Erro ao carregar JSON:", erro);
  }
}

[
  "filtro_Tag_Controle",
  "filtro_Tag_TA",
  "filtro_Tag_QV",
  "filtro_Tag_InfoE",
  "filtro_Tag_InfoG",
  "filtro_Tag_InfoA",
  "filtro_Tag_Feedback",
  "filtro_Tag_Instalacao",
  "filtro_Tag_Mecanica",
  "filtro_Tag_Menu",
  "filtro_Tag_Desafio",
  "filtro_Tag_Narrativa",
  "filtro_Tag_CJ",
  "filtro_Tag_Tutorial"
].forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("change", atualizarTabela);
  }
});

loadTable();