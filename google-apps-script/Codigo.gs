/**
 * INOVALAB — Gerador de Etiquetas QR
 * Standalone Apps Script Web App.
 * Lê Cadastro Patrimoniado + Cadastro Não Patrimoniado da planilha principal
 * e disponibiliza os itens para o front-end montar etiquetas com QR Code,
 * prontas para impressão em folha Pimaco.
 */

const ID_PLANILHA = "1-WTwLutdkS6MxIW3NM5Cdqo4MgS4AxCupykgFgdrIP4";

function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'itens') {
    try {
      return _jsonEtiquetas({ ok: true, data: getItens() });
    } catch (error) {
      return _jsonEtiquetas({ ok: false, error: error.message || String(error) });
    }
  }
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Gerador de Etiquetas QR — INOVALAB')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function _jsonEtiquetas(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Retorna todos os itens do Cadastro Patrimoniado + Não Patrimoniado,
 * normalizados em um formato único para a tela de seleção.
 */
function getItens() {
  const ss = SpreadsheetApp.openById(ID_PLANILHA);
  const itens = [];

  // --- Cadastro Patrimoniado ---
  // Colunas: 0=Nº Patrimônio, 1=Nome, 2=Categoria, 3=Marca, 4=Modelo,
  //          5=Local Atual, 6=Armário, 7=Prateleira
  const abaPatr = ss.getSheetByName("Cadastro Patrimoniado");
  if (abaPatr) {
    const dados = abaPatr.getDataRange().getValues().slice(1);
    dados.forEach(l => {
      const [codigo, nome, categoria, marca, modelo, local, armario, prateleira] = l;
      if (!nome) return; // ignora linhas vazias
      itens.push({
        origem: "Patrimoniado",
        codigo: codigo ? String(codigo).trim() : "",
        nome: String(nome).trim(),
        categoria: categoria || "",
        marca: marca || "",
        modelo: modelo || "",
        local: local || "",
        armario: armario || "",
        prateleira: prateleira || "",
        qtde: ""
      });
    });
  }

  // --- Cadastro Não Patrimoniado ---
  // Colunas: 0=Código Interno, 1=Nome, 2=Categoria, 3=Local, 4=Armário,
  //          5=Prateleira, 6=Qtde, 7=Marca, 8=Modelo
  const abaNaoPatr = ss.getSheetByName("Cadastro Não Patrimoniado");
  if (abaNaoPatr) {
    const dados = abaNaoPatr.getDataRange().getValues().slice(1);
    dados.forEach(l => {
      const [codigoInterno, nome, categoria, local, armario, prateleira, qtde, marca, modelo] = l;
      if (!nome) return;
      itens.push({
        origem: "Não Patrimoniado",
        codigo: codigoInterno ? String(codigoInterno).trim() : "",
        nome: String(nome).trim(),
        categoria: categoria || "",
        marca: marca || "",
        modelo: modelo || "",
        local: local || "",
        armario: armario || "",
        prateleira: prateleira || "",
        qtde: qtde || ""
      });
    });
  }

  return itens;
}

/**
 * Função de diagnóstico — roda direto no editor do Apps Script
 * para confirmar que a leitura das abas está OK sem precisar do web app.
 */
function testeGetItens() {
  const itens = getItens();
  Logger.log("Total de itens: " + itens.length);
  Logger.log(JSON.stringify(itens.slice(0, 5), null, 2));
}
