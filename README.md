# LogosFlow — sandbox GitHub sintético

Este repositório é **independente** dos repositórios Core e Beta. Não contém código, Canon, holdouts ou segredos reais.

## Objetivo
Demonstrar, separadamente: (1) que um check de CI falha diante de mutação proibida, (2) que um PR normativo sem registro de encerramento é rejeitado pelo CI, (3) se a proteção de branch configura esse check como requisito obrigatório.

## Executar localmente
Requer Node.js 20+ e Git.

```bash
node scripts/selftest.js
```

## Testes no GitHub
1. Confirmar que `.github/workflows/sandbox-gate.yml` executou em **Actions**.
2. Criar PR para `main` que altera `docs/policy-synthetic.md` sem alterar `docs/task-closeout.md`: o check deve falhar.
3. Criar PR que altera `fixtures/frozen/example.json`: o check deve falhar.
4. Criar PR que altera somente `docs/notes.md`: o check deve passar.
5. Configurar a proteção de `main`, com `synthetic-governance` obrigatório **somente no sandbox**, e observar o bloqueio de merge.

**Distinção essencial:** autotestes provam lógica; CI em PR prova execução; somente proteção de branch torna o check obrigatório para merge.

## Limitações
- O sandbox público não comprova disponibilidade de regras na Beta privada.
- Um administrador pode dispor de bypass; verificar regras e permissões.
- O próprio PR pode tentar modificar scripts ou workflow; isso exige proteção específica.
- Não conectar ao Lovable e não adicionar segredos.
