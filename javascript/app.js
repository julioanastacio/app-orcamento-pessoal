class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validarDados() {
    for (const i in this) {
      if (this[i] === undefined || this[i] === '' || this[i] === null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem('id');
    if (id === null) {
      localStorage.setItem('id', 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem('id');
    return parseInt(proximoId) + 1;
  }

  gravar(d) {
    let id = this.getProximoId();
    localStorage.setItem(id, JSON.stringify(d));
    localStorage.setItem('id', id);
  }
}

let bd = new Bd();

function cadastrarDespesa() {
  let ano = document.getElementById('ano');
  let mes = document.getElementById('mes');
  let dia = document.getElementById('dia');
  let tipo = document.getElementById('tipo');
  let descricao = document.getElementById('descricao');
  let valor = document.getElementById('valor');

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value,
  );

  if (despesa.validarDados()) {
    bd.gravar(despesa);
    document.querySelector('.modal-title').innerHTML =
      'Registro inserido com sucesso!';
    document.querySelector('.modal-header').className =
      'modal-header text-success';
    document.querySelector('.modal-body').innerHTML =
      'Despesa cadastrada com sucesso.';
    document.querySelector('#btn-modal').className = 'btn btn-success';
    document.querySelector('#btn-modal').innerHTML = 'Voltar';
    $('#modalRegistroDespesa').modal('show');
  } else {
    document.querySelector('.modal-title').innerHTML =
      'Erro na inclusão do registro!';
    document.querySelector('.modal-header').className =
      'modal-header text-danger';
    document.querySelector('.modal-body').innerHTML =
      'Erro na gravação! Verifique se todos os campos foram preenchidos.';
    document.querySelector('#btn-modal').className = 'btn btn-danger';
    document.querySelector('#btn-modal').innerHTML = 'Voltar e corrigir';
    $('#modalRegistroDespesa').modal('show');
  }
}
