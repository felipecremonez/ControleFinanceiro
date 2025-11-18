let itens = JSON.parse(localStorage.getItem('itensFinanceiros')) || [];

function salvar() {
  localStorage.setItem('itensFinanceiros', JSON.stringify(itens));
}

function adicionarItem() {
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!descricao || isNaN(valor)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  itens.push({ descricao, valor, tipo });
  salvar();
  atualizarLista();
  limparCampos();
}

function atualizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  itens.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";

    const valorClass = item.tipo === "receber" ? "positivo" : "negativo";
    const sinal = item.tipo === "receber" ? "+" : "-";

    div.innerHTML = `
      <span>${item.descricao}</span>
      <span class="${valorClass}">${sinal} R$ ${item.valor.toFixed(2)}</span>
      <div class="botoes">
        <button class="edit-btn" onclick="editarItem(${index})">Editar</button>
        <button class="delete-btn" onclick="excluirItem(${index})">Excluir</button>
      </div>
    `;

    lista.appendChild(div);
  });

  atualizarTotal();
}

function editarItem(index) {
  const novoNome = prompt("Nova descrição:", itens[index].descricao);
  if (novoNome === null) return;

  const novoValor = prompt("Novo valor:", itens[index].valor);
  if (novoValor === null || isNaN(parseFloat(novoValor))) return;

  itens[index].descricao = novoNome;
  itens[index].valor = parseFloat(novoValor);
  salvar();
  atualizarLista();
}

function excluirItem(index) {
  itens.splice(index, 1);
  salvar();
  atualizarLista();
}

function atualizarTotal() {
  let total = 0;

  itens.forEach((item) => {
    if (item.tipo === "receber") total += item.valor;
    else total -= item.valor;
  });

  document.getElementById("total").innerText = `Total: R$ ${total.toFixed(2)}`;
}

function limparCampos() {
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("tipo").value = "receber";
}

// Inicializa a lista na tela
document.addEventListener('DOMContentLoaded', atualizarLista);
