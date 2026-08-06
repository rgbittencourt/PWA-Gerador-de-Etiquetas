# Gerador de Etiquetas INOVALAB

PWA para criação e impressão de etiquetas padronizadas de equipamentos, acessórios, armários e materiais do INOVALAB.

## Funcionalidades

- pesquisa e seleção de registros do inventário;
- geração de etiquetas com identificação textual e QR Code;
- organização em folhas compatíveis com o modelo configurado;
- pré-visualização antes da impressão;
- seleção individual ou em lote;
- layout específico de impressão sem cabeçalho e rodapé da aplicação.

## Arquitetura e integrações

`public/etiquetas.html` contém a interface e o layout de impressão. `/api/etiquetas` consulta o Apps Script, que lê os dados da Planilha de Controle. Os QR Codes gerados podem apontar para o PWA QRCode para Inventário ou para outra rota operacional configurada.

## Estrutura

- `app/api/etiquetas/route.ts`: proxy de dados;
- `public/etiquetas.html`: seleção, geração e impressão;
- `google-apps-script/`: acesso ao cadastro;
- `original/`: interface original de referência;
- `public/`: manifesto, ícones e favicon.

## Desenvolvimento

```bash
pnpm install
pnpm dev
pnpm test
pnpm run build
```

## Impressão

Confirme escala de 100%, margens do navegador e modelo da folha antes de imprimir lotes. Faça uma página de teste sempre que impressora, navegador ou etiqueta forem alterados.

## Licença

Projeto de uso institucional do INOVALAB — IFSC Câmpus Continente.
