# Política de revisão de governança — sandbox (PROPOSTA)

**Escopo:** apenas o repositório sintético. Não é uma autorização de mudanças para Core/Beta.

## Arquivos sensíveis
- `.github/workflows/**`: workflows e comportamento do CI.
- `scripts/validate.js`, `scripts/selftest.js`: testes e implementação das regras.
- `.github/CODEOWNERS`: responsabilidade por revisão.
- `docs/policy-synthetic.md`: norma sintética.
- `fixtures/frozen/**`: conjunto sintético imutável.

## Controles recomendados
1. PR obrigatório e status check `synthetic-governance` obrigatório (já em vigor no sandbox).
2. CI deve carregar validador da referência de destino verificada, nunca executar scripts fornecidos pelo PR.
3. Mudanças nos próprios workflows/validadores devem passar por revisão humana independente. Não confiar apenas no check cuja definição está sendo modificada.
4. Manter bypass e permissões administrativas sob revisão explícita e registrar exceções.
5. Restringir alterações em arquivos normativos ou congelados usando verificações independentes (somente testes sintéticos neste repositório).
6. Não exigir revisão de Code Owners enquanto não existir segundo revisor elegível e processo definido: caso contrário há risco de bloqueio permanente do autor único.

## Limitações importantes
- Um `CODEOWNERS` não exige revisão por si mesmo; é preciso configurar regra aplicável.
- Uma pessoa não pode aprovar o próprio PR como revisora independente.
- O workflow é selecionado pelo mecanismo do GitHub Actions; usar código de validação da branch de destino não impede, isoladamente, um PR de editar a definição do workflow.
- Administradores e integrações com permissões relevantes precisam de controles organizacionais; uma conta individual limita a segregação de funções.
- Não aplicar automaticamente esta proposta nos repositórios reais.
