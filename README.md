## PerguntaAI

O PerguntaAI é um chat com inteligência artificial, onde o usuário pode criar múltiplos chats, enviar mensagens e receber respostas geradas em tempo real pela IA.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Stack](#stack)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Executando o Projeto](#executando-o-projeto)
- [Configurações](#configurações)
- [Autor](#autor)

## Sobre o Projeto

O **PerguntaAI** é um sistema web de chat com IA usando a API da OpenAI. O usuário pode iniciar novos chats, enviar mensagens e receber respostas em tempo real. Todas as conversas são salvas no `localStorage` e acessíveis pelo histórico de chats.

## Funcionalidades

- **Chat com IA**
  - Envio e recebimento de mensagems.
  - IA baseada nos modelos da OpenAi.

- **Gerenciamento de chats**
  - Criação de novos chats com identificação por data e hora de criação.
  - Lista com histórico de chats.
  - Salvamento de todos os chats e mensagens no `localStorage`.

## Stack

- **Frontend**
  - **React**
  - **Vite**
  - **@emoji-mart/react**
  - **uuid**

## Estrutura do Projeto

- **`src/`**
  - **`App.jsx`**
  - **`main.jsx`**
  - **`index.css`**
  - **`Components/ChatBotStart.jsx`**
  - **`Components/ChatBotStart.css`**
  - **`Components/ChatBotApp.jsx`**
  - **`Components/ChatBotApp.css`**

## Instalação

Pré-requisitos:

- **Node.js**
- API key da **OpenAI** ([platform.openai.com](https://platform.openai.com))

1. **Instalar as dependências**

   ```bash
   npm install
   ```

2. **Criar o arquivo `.env` a partir do exemplo**

   ```bash
   cp .env.example .env
   ```

3. **Configurar as variáveis de ambiente no `.env`**

   - `VITE_OPENAI_API_KEY`
   - `VITE_OPENAI_API_URL`

## Executando o Projeto

```bash
npm run dev
```

Após rodar o comando, acesse a aplicação em `http://localhost:5173`.

## Configurações

As variáveis de ambiente estão em `.env.example`:

## Autor

**Guilherme Rocha (CoderRocha)**

- GitHub: [CoderRocha](https://github.com/coderrocha)
- LinkedIn: [Guilherme Rocha](https://www.linkedin.com/in/guilherme-rocha-da-silva)

---
