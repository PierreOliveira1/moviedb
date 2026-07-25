# MovieDB

Uma SPA responsiva para descobrir filmes, pesquisar o catálogo do TMDB, consultar detalhes e organizar uma lista local de favoritos.

O projeto foi construído com React 19, React Router 7 e TypeScript, com foco em navegação fluida, estados explícitos de interface e uma arquitetura que separa domínio, integração externa e apresentação.

## Funcionalidades

- Catálogo de filmes populares com carregamento infinito.
- Busca por título sincronizada com a URL em `/search?q=...`.
- Retorno automático ao início quando o campo de busca é limpo.
- Página de detalhes com backdrop, pôster, gêneros, duração, nota e sinopse.
- Favoritos persistidos no navegador.
- Ordenação dos favoritos por título ou nota.
- Estados de carregamento, vazio, erro e página não encontrada.
- Layout adaptado para desktop e dispositivos móveis.
- View Transitions entre cards e detalhes e durante a ordenação dos favoritos.
- Respeito à preferência `prefers-reduced-motion` do sistema.

## Stack

| Área | Tecnologia |
| --- | --- |
| Interface | React 19, Tailwind CSS 4 e Lucide React |
| Rotas | React Router 7 com file-system routes |
| Estado remoto | TanStack Query 5 |
| Linguagem | TypeScript em modo estrito |
| Build | Vite 8 |
| Testes | Jest 30, Testing Library e MSW |
| Qualidade | Biome e Husky |
| Dados | TMDB API |

## Rotas

| Rota | Responsabilidade |
| --- | --- |
| `/` | Lista paginada de filmes populares |
| `/search?q=termo` | Resultados de busca com carregamento infinito |
| `/movie/:id` | Detalhes de um filme |
| `/favorites` | Filmes favoritos, remoção e ordenação |
| `*` | Página 404 para rotas desconhecidas |

## Como executar

### Requisitos

- Node.js 22.12 ou superior.
- pnpm 10 ou superior.
- Um Read Access Token da API do TMDB.

### Configuração

Instale as dependências:

```bash
pnpm install
```

Crie um arquivo `.env.local` na raiz do projeto:

```text
VITE_TMDB_ACCESS_TOKEN=seu_read_access_token
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
```

Inicie o ambiente de desenvolvimento:

```bash
pnpm dev
```

O endereço local será exibido pelo Vite no terminal.

> Variáveis prefixadas com `VITE_` fazem parte do bundle do cliente. Use somente um token de leitura do TMDB e aplique as restrições disponibilizadas pelo provedor. Para um produto com requisitos mais rígidos de segurança, as chamadas devem passar por um backend próprio.

## Scripts

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Gera o build de produção |
| `pnpm preview` | Serve localmente o conteúdo de `build/client` |
| `pnpm typecheck` | Gera os tipos das rotas e valida o TypeScript |
| `pnpm check` | Verifica formatação, lint e imports com Biome |
| `pnpm lint` | Executa apenas o lint do Biome |
| `pnpm format` | Formata os arquivos do projeto |
| `pnpm test` | Executa a suíte de testes |
| `pnpm test:watch` | Executa os testes em modo interativo |
| `pnpm test:coverage` | Gera o relatório de cobertura |
| `pnpm validate` | Executa Biome, TypeScript, testes e build |

Antes de enviar alterações, execute:

```bash
pnpm validate
```

O mesmo comando é executado pelo Husky antes de cada `git push`.

## Arquitetura

O código segue uma arquitetura **feature-first em camadas**. Cada domínio concentra seu modelo, integração e interface, enquanto as rotas permanecem como uma camada fina de composição.

```text
src/
|-- root.tsx                 # Providers e layout raiz
|-- routes.ts               # Descoberta das rotas por filesystem
|-- query-client.ts         # Configuração global do TanStack Query
|-- app.css                 # Tema, tokens e transições globais
|-- routes/                  # Composição das páginas
|   |-- _index/
|   |-- search/
|   |-- movie.$id/
|   |-- favorites/
|   `-- $/
|-- components/
|   |-- common/              # Shell e header da aplicação
|   `-- ui/                  # Primitivos visuais genéricos
|-- features/
|   |-- movies/
|   |   |-- api/             # DTOs, mappers, API e queries
|   |   |-- model/           # Tipos e regras puras de domínio
|   |   |-- components/      # Cards, grids e listagens
|   |   |-- search/          # Caso de uso de busca
|   |   `-- details/         # Caso de uso de detalhes
|   `-- favorites/
|       |-- context/         # Estado e persistência
|       `-- components/      # Interface específica de favoritos
`-- shared/
    |-- api/                 # Cliente HTTP e erros de infraestrutura
    |-- config/              # Leitura centralizada do ambiente
    |-- routing/             # Utilitários de navegação
    `-- testing/             # MSW, fixtures e helpers de testes
```

A direção principal das dependências é:

```text
routes -> features -> shared
components/common -> components/ui + shared
feature UI -> feature api + feature model
feature api -> feature model + shared
```

## Decisões importantes

### SPA com rotas tipadas

O projeto usa React Router em modo SPA (`ssr: false`) e descobre as rotas a partir de `src/routes/`. Isso mantém cada página isolada e gera tipos para parâmetros de rota sem exigir um servidor Node em produção.

Como consequência, a hospedagem estática precisa redirecionar URLs desconhecidas para `build/client/index.html`. Assim, acessos diretos como `/movie/693134` são entregues ao React Router em vez de retornarem 404 pelo servidor.

### Rotas finas e domínio dentro das features

Arquivos em `src/routes/` interpretam URL e parâmetros e compõem os casos de uso. Regras de filmes, busca e favoritos permanecem dentro de `src/features/`.

Essa divisão evita que componentes conheçam detalhes do roteador e reduz o impacto de mudanças na API ou na estrutura das páginas.

### Estado remoto pertence ao TanStack Query

Listagens, busca e detalhes não são copiados para contextos React. O TanStack Query controla cache, carregamento, erro, retry e invalidação.

As chaves são centralizadas em `movies-queries.ts`, as consultas têm `staleTime` de 30 segundos e uma nova tentativa em caso de falha. Popular e busca usam infinite queries; detalhes reutilizam o mesmo cache quando um filme aparece em mais de uma tela.

As funções de API recebem o `AbortSignal` da query, permitindo cancelar requisições que deixaram de ser relevantes.

### DTOs não chegam à interface

Respostas do TMDB usam convenções como `poster_path` e `vote_average`. Esses DTOs ficam restritos à camada `api/` e são convertidos para modelos internos em camelCase antes de chegar aos componentes.

Isso desacopla a interface do formato externo e deixa formatação e regras de domínio testáveis sem React ou rede.

### Favoritos persistem somente IDs

O `localStorage` armazena apenas uma lista de IDs em `moviedb:favorite-ids`. Os detalhes são resolvidos pela API e reaproveitados pelo cache do TanStack Query.

Essa escolha evita manter cópias desatualizadas dos filmes no navegador. O trade-off é que abrir os favoritos sem cache requer conexão para recuperar os detalhes atuais.

A leitura do storage valida os dados persistidos e descarta valores inválidos. Componentes não acessam `localStorage` diretamente; toda persistência fica isolada em `favorites-storage.ts`.

### URL como fonte da busca

O termo pesquisado vive no parâmetro `q`, não em um estado global duplicado. Isso permite atualizar a página, usar voltar/avançar e compartilhar a URL mantendo a mesma busca.

Ao limpar o campo, a aplicação volta para `/`, evitando uma rota de busca sem termo.

### View Transitions progressivas

Pôsteres e títulos recebem nomes de transição estáveis baseados no ID do filme. Isso permite continuidade visual entre o grid e a página de detalhes.

Na ordenação dos favoritos, a transição é limitada aos cards; o restante da página permanece estático. Navegadores sem suporte continuam funcionando normalmente, e usuários com redução de movimento ativada não recebem animações.

### Design por tokens semânticos

As cores e superfícies são definidas como tokens semânticos no tema do Tailwind, como `brand`, `canvas`, `surface`, `content` e `danger`. Componentes expressam intenção em vez de repetir valores de cor.

Isso mantém consistência entre estados, facilita ajustes visuais e evita acoplamento dos componentes a uma paleta específica.

## Testes

Os testes ficam próximos ao código testado e priorizam comportamento observável:

- Regras de domínio e mappers usam testes unitários puros.
- Componentes e rotas usam Testing Library.
- Requisições são simuladas com MSW no nível HTTP.
- Favoritos cobrem estado vazio, carregamento, ordenação, remoção e persistência.
- A busca cobre sincronização com a URL e retorno ao início ao limpar o campo.

Essa estratégia testa as fronteiras reais da aplicação sem acoplar a suíte aos detalhes internos dos componentes.

## Build e deploy

Gere e visualize o build local:

```bash
pnpm build
pnpm preview
```

Os arquivos estáticos são gerados em `build/client`. Em produção, configure o fallback de SPA para servir `build/client/index.html` em todas as rotas que não correspondam a um arquivo estático.

## Créditos

Este produto utiliza a API do TMDB, mas não é endossado ou certificado pelo TMDB.
