---
name: code-standards
description: >
  Padrões pessoais de código do usuário — SEMPRE consulte esta skill ao escrever, revisar, refatorar ou gerar qualquer código,
  independentemente da linguagem ou framework. Aplica-se a React, Next.js, Angular, Flutter, Node.js, NestJS, Express, FastAPI,
  Python, Java e Spring. Inclui regras de arquitetura, documentação, organização de arquivos, princípios SOLID/KISS/DRY, uso de POO,
  nomenclatura e estrutura de pastas. Use sempre que o usuário pedir para criar, refatorar, revisar ou melhorar código — mesmo que
  não mencione explicitamente "padrões" ou "arquitetura".
---

# Code Standards — Padrões Pessoais de Código

> Esta skill define como o código deve ser escrito em qualquer linguagem ou framework.
> Leia inteiramente antes de gerar ou refatorar qualquer código.

---

## Princípios Fundamentais

| Princípio      | Descrição                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------ |
| **SOLID**      | Cada classe/função tem uma responsabilidade. Dependa de abstrações, não de implementações. |
| **KISS**       | A solução mais simples que resolve o problema é a certa. Sem over-engineering.             |
| **DRY**        | Código que se repete vira função helper, hook, util ou componente reutilizável.            |
| **MVC / MVVM** | Separação clara entre dados, lógica e apresentação. Cada camada sabe apenas o que precisa. |

---

## Regras Absolutas (nunca viole)

### ❌ Sem IIFEs em JSX/TSX

Nunca use Immediately Invoked Function Expressions diretamente em tags JSX/TSX.

```tsx
// ❌ ERRADO
return (
  <div>
    {(() => {
      if (isLoading) return <Spinner />;
      return <Content />;
    })()}
  </div>
);

// ✅ CERTO — extraia para uma função ou componente
function renderContent() {
  if (isLoading) return <Spinner />;
  return <Content />;
}

return <div>{renderContent()}</div>;

// ✅ MELHOR — componente dedicado
return (
  <div>
    <ContentOrSpinner isLoading={isLoading} />
  </div>
);
```

### ❌ Sem funções complexas e multi-propósito

Funções fazem **uma coisa**. Se uma função está fazendo duas coisas, ela deve ser duas funções.

```ts
// ❌ ERRADO — faz busca, transforma e salva num lugar só
async function handleUserData(id: string) {
  const res = await fetch(`/users/${id}`);
  const data = res.json();
  const formatted = { ...data, name: data.name.toUpperCase() };
  localStorage.setItem("user", JSON.stringify(formatted));
  return formatted;
}

// ✅ CERTO — responsabilidades separadas
async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/users/${id}`);
  return res.json();
}

function formatUser(user: User): FormattedUser {
  return { ...user, name: user.name.toUpperCase() };
}

function persistUser(user: FormattedUser): void {
  localStorage.setItem("user", JSON.stringify(user));
}
```

### ❌ Sem comentários inline explicando "o que fez"

Use **JSDoc / TSDoc / equivalente da linguagem** para documentar. Nunca comente linha a linha o que o código faz — o código deve ser autoexplicativo pela nomenclatura.

```ts
// ❌ ERRADO
// busca o usuário pelo id
const user = await fetchUser(id);
// formata o nome
user.name = user.name.toUpperCase();

// ✅ CERTO — JSDoc no contrato da função, código autoexplicativo
/**
 * Busca e retorna um usuário formatado pelo seu identificador único.
 *
 * @param userId - Identificador único do usuário
 * @returns Usuário com dados normalizados prontos para exibição
 * @throws {UserNotFoundError} Quando o usuário não existe na base
 *
 * @example
 * const user = await getFormattedUser('abc-123');
 */
async function getFormattedUser(userId: string): Promise<FormattedUser> {
  const user = await fetchUser(userId);
  return formatUser(user);
}
```

---

## Regras de Clareza e Brevidade na Documentação

Documentação boa é **curta e direta**. Se você precisou de 3 linhas para explicar o que a função faz, o problema pode ser o nome da função — não a doc.

### Regras

| Regra                                 | Descrição                                                                                                                           |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Uma frase na descrição**            | A descrição principal deve caber em uma linha. Se não couber, a função provavelmente faz coisas demais.                             |
| **Só documente o que não é óbvio**    | `@param id` não precisa de "o id do usuário" se o nome já diz tudo. Documente restrições, formato esperado, comportamento especial. |
| **`@param` sem redundância**          | Se o tipo já está na assinatura, não repita o tipo na doc. Foque no _porquê_ ou _formato_ do parâmetro.                             |
| **`@returns` objetivo**               | Diga o que retorna em caso de sucesso — não repita o tipo.                                                                          |
| **`@throws` apenas quando relevante** | Só liste erros que o chamador precisa tratar. Erros genéricos de runtime não precisam de doc.                                       |
| **`@example` para casos não óbvios**  | Use quando o uso correto não for evidente pela assinatura. Evite exemplos triviais.                                                 |

### Exemplos

```ts
// ❌ VERBOSO — repete o óbvio
/**
 * Esta função busca um usuário pelo seu identificador único de usuário.
 * Ela recebe como parâmetro o id que é o identificador do usuário.
 * Ela retorna uma Promise que resolve com os dados do usuário encontrado.
 *
 * @param id - O id do usuário (string com o identificador do usuário)
 * @returns Retorna uma Promise com o objeto do tipo User contendo os dados
 */
async function fetchUser(id: string): Promise<User>;

// ✅ CLARO E BREVE — só o que agrega valor
/**
 * Busca um usuário pelo seu ID.
 *
 * @param id - UUID v4 do usuário
 * @returns Dados do usuário ou `null` se não encontrado
 * @throws {UnauthorizedError} Quando a sessão expirou
 */
async function fetchUser(id: string): Promise<User | null>;
```

```ts
// ❌ EXEMPLO DESNECESSÁRIO — trivial demais
/**
 * Soma dois números.
 * @example
 * add(1, 2) // 3
 */
function add(a: number, b: number): number;

// ✅ EXEMPLO ÚTIL — comportamento não óbvio
/**
 * Formata um valor em centavos para exibição em moeda local.
 *
 * @param cents - Valor em centavos (inteiro)
 * @returns String no formato "R$ 0,00"
 *
 * @example
 * formatCurrency(0)     // "R$ 0,00"
 * formatCurrency(1990)  // "R$ 19,90"
 * formatCurrency(-500)  // "R$ -5,00"
 */
function formatCurrency(cents: number): string;
```

---

## Documentação por Linguagem

| Linguagem               | Padrão                    | Exemplo de tag                              |
| ----------------------- | ------------------------- | ------------------------------------------- |
| JavaScript / TypeScript | JSDoc / TSDoc             | `@param`, `@returns`, `@throws`, `@example` |
| Python                  | Docstrings (Google style) | `Args:`, `Returns:`, `Raises:`, `Example:`  |
| Java / Spring           | Javadoc                   | `@param`, `@return`, `@throws`              |
| Dart / Flutter          | DartDoc                   | `/// Descrição`, `[param]`                  |
| Markdown / README       | Markdown                  | Cabeçalhos, exemplos de uso                 |

> Para linguagens sem padrão oficial, use o estilo mais próximo da comunidade da linguagem.

Consulte `references/documentation-examples.md` para exemplos completos por linguagem.

---

## POO — Quando e Como Usar

Use **Programação Orientada a Objetos** quando a lógica for complexa, stateful ou representar uma entidade com comportamentos encapsulados.

**Gatilhos para usar POO:**

- Lógica complexa com múltiplos estados (ex: Gantt, editor, motor de regras)
- Entidades com comportamento próprio (ex: `Order`, `PaymentProcessor`)
- Quando a lógica precisa ser extensível sem modificar o núcleo (Open/Closed Principle)

```ts
// ✅ Exemplo: lógica de Gantt com POO
class GanttTask {
  constructor(
    private readonly id: string,
    private startDate: Date,
    private endDate: Date,
    private dependencies: string[] = [],
  ) {}

  /** Verifica se a tarefa está atrasada em relação à data atual. */
  isOverdue(): boolean {
    return new Date() > this.endDate;
  }

  /** Calcula a duração em dias úteis. */
  getDurationInWorkdays(): number {
    return calculateWorkdays(this.startDate, this.endDate);
  }
}
```

**Funções simples/puras** continuam sendo a escolha padrão fora desses casos.

---

## Nomenclatura

| Elemento                  | Regra                                | Exemplo                           |
| ------------------------- | ------------------------------------ | --------------------------------- |
| Variáveis                 | Intenção clara, sem abreviações      | `userList`, não `ul` ou `arr`     |
| Funções                   | Verbo + substantivo                  | `fetchUserById`, `formatCurrency` |
| Booleanos                 | Prefixo `is`, `has`, `can`, `should` | `isLoading`, `hasPermission`      |
| Constantes                | SCREAMING_SNAKE_CASE                 | `MAX_RETRY_COUNT`                 |
| Componentes React/Angular | PascalCase                           | `UserProfileCard`                 |
| Hooks (React)             | Prefixo `use`                        | `useUserPermissions`              |
| Classes                   | PascalCase + substantivo             | `PaymentProcessor`                |
| Arquivos                  | kebab-case                           | `user-profile-card.tsx`           |
| Pastas                    | kebab-case                           | `user-management/`                |

---

## Arquitetura de Pastas — Frontend (React / Next.js / Angular)

Organize por **feature**, não por tipo de arquivo global.

```bash
src/
└── features/
    └── user-management/          # feature ou grande entidade
        ├── api/                  # chamadas HTTP, queries, mutations
        │   └── user.api.ts
        ├── components/           # componentes compostos desta feature
        │   └── UserTable.tsx
        ├── hooks/                # um hook por responsabilidade
        │   ├── useUserList.ts
        │   ├── useUserFilters.ts
        │   └── useUserPermissions.ts
        ├── schemas/              # validação (zod, yup, etc.)
        │   └── user.schema.ts
        ├── ui/                   # componentes puramente visuais/dumb
        │   ├── UserCard.tsx
        │   └── UserAvatar.tsx
        └── types.ts              # tipos e interfaces da feature
```

**Regras:**

- Um hook por finalidade — nunca um `useUser.ts` que faz tudo
- Componentes visuais sem lógica ficam em `ui/`
- Lógica de negócio fica em `hooks/` ou `api/`
- Tabelas, listas grandes e seções complexas viram componentes próprios

---

## Arquitetura de Pastas — Backend (Node.js / NestJS / Express / FastAPI / Spring)

Organize por **módulo/domínio**, espelhando MVC ou Clean Architecture.

```bash
src/
└── modules/
    └── users/
        ├── controllers/          # entrada HTTP, sem lógica de negócio
        ├── services/             # lógica de negócio
        ├── repositories/         # acesso a dados
        ├── dto/                  # Data Transfer Objects
        ├── entities/             # modelos/entidades
        └── users.module.ts       # (NestJS) ou equivalente de registro
```

**Python / FastAPI:**

```bash
app/
└── modules/
    └── users/
        ├── router.py             # rotas
        ├── service.py            # lógica
        ├── repository.py         # banco de dados
        ├── schemas.py            # Pydantic models
        └── models.py             # ORM models
```

---

## Arquitetura de Pastas — Mobile (Flutter)

```bash
lib/
└── features/
    └── user_profile/
        ├── data/
        │   ├── repositories/
        │   └── datasources/
        ├── domain/
        │   ├── entities/
        │   └── usecases/
        └── presentation/
            ├── pages/
            ├── widgets/
            └── controllers/      # ou bloc/, cubit/
```

---

## Refatoração — Quando e Como

| Sinal                                      | Ação                                  |
| ------------------------------------------ | ------------------------------------- |
| Lógica duplicada em 2+ lugares             | Extraia para helper/util/hook         |
| Componente com 100+ linhas                 | Quebre em sub-componentes             |
| Função com 3+ responsabilidades            | Separe em funções únicas              |
| JSX com lógica condicional complexa        | Extraia para componente ou função     |
| Classe com muitos métodos não relacionados | Aplique SRP, separe em classes        |
| Arquivo com 200+ linhas                    | Avalie separação por responsabilidade |

**Refatoração é parte do trabalho, não opcional.** Ao encontrar código que se repete ou funções grandes, refatore sem precisar ser pedido.

---

## Anti-Patterns — Nunca Faça

| ❌ Anti-pattern                            | ✅ Alternativa                                           |
| ------------------------------------------ | -------------------------------------------------------- |
| IIFE em JSX/TSX                            | Função nomeada ou componente                             |
| Função que faz A, B e C                    | Três funções: `doA()`, `doB()`, `doC()`                  |
| Comentário explicando o que o código faz   | Renomeie a função/variável para ser clara                |
| `utils.ts` com 30 funções não relacionadas | Separe por domínio: `date.utils.ts`, `currency.utils.ts` |
| Hook gigante `usePageLogic()`              | Um hook por responsabilidade                             |
| Componente com lógica de API + UI + estado | Separe em hook (lógica) + componente (UI)                |
| Nesting profundo (4+ níveis)               | Guard clauses e early returns                            |
| Magic numbers                              | Constante nomeada                                        |
| Arquivo de 500+ linhas                     | Quebre em módulos menores                                |

---

## Checklist antes de entregar código

- [ ] Nenhuma IIFE em JSX/TSX
- [ ] Cada função tem propósito único e nome claro
- [ ] Funções públicas/exportadas têm JSDoc/TSDoc/equivalente
- [ ] Sem comentários inline explicando "o que fez"
- [ ] Código duplicado foi extraído
- [ ] Arquivos organizados na estrutura de feature correta
- [ ] Nomes de variáveis, funções e arquivos são autoexplicativos
- [ ] POO aplicado onde a lógica é complexa/stateful
- [ ] Princípios SOLID, KISS e DRY respeitados

---

## Referências detalhadas

- `references/documentation-examples.md` — Exemplos de JSDoc, TSDoc, Docstring, Javadoc e DartDoc
- `references/refactoring-patterns.md` — Exemplos antes/depois de refatorações comuns
