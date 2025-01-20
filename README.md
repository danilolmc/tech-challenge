# Loanship - Simulador de Crédito

![Loanship](projectexample.gif)

# Tecnologias

- React
- Typescript
- Zod
- Shadcn/UI
- TailwindCSS
- Recharts
- Vite
- Vitest
- Testing Library
- EsLint
- PWA

# Rodando a aplicação

Para isso você precisa garantir que tenha o git instalado e configurado, para clonar esse repositório, além do NodeJS
- [Git](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git)
- [NodeJS](https://nodejs.org/en/download)

Tendo isso configurado, é só seguir os passos abaixo:

1. Clone o repositório
```bash
git clone https://github.com/danilolmc/tech-challenge.git
```
2. Navegue até o diretório e instale as dependências
```bash
npm install
```
3. E por fim, é so rodar a aplicação 
```bash
npm run dev
```

### Building
```bash
npm run build
```

### Testing
```bash
npm run test
```

## Suporte a PWA

Esse aplicação possui suporte à Aplicação Web Progressiva, para entender mais siga os passos abaixo:

1. Faça o build do projeto
2. Depois execute-o com `npm run preview`
3. Quando abrir no navegador, logo na extremidade da barra de navegação estará indicando que a aplicação pode ser instalada
4. Clique nele e siga as instrunções


# Estrutura do projeto

Esse projeto faz uso dos conceitos de MVVM, com o objetivo de separar as responsabilidades entre as regras de negócio, a interface, e a intermediação entre esses dois através da camada conhecida como ViewModel.

O projeto possui a seguinte estrutura de arquivos:
```bash 
  public/ #arquivos estáticos
  src/ # código fonte da aplicação
    components/ #armazena os componentes de UI reutilizáveis
    features/ #organiza as funcionalidades por seus domínios (ex. simulador)
      model/ #Camada responsável pela lógica da aplicação
      view/ #Camada responsável pelo que esta relacionado com interface visual e interação com o usuário
      viewmodel/ # Camada que atua como meio de campo entre as duas anteriores, 
                 # descaoplando e abstraindo a comunicação através de inversão de dependência
```

O grande benefício do MVVM para esse projeto está relacionado com a separação clara de responsavilidades:

- O Model só se preocupa com as regras do sistema 
- A ViewModel interage com a model, gerencia estados e formulários 
- E a view só se preocupa com o que tem direito, a interface do usuário

E para desacoplar essa comunicação, facilitando a testabilidade e manutenibilidade, o princípio de Inversão de Dependência do SOLID é essencial
