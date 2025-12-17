# 🤖 RZSISTEMA App (Discord Bot)

O **RZSISTEMA App** é um bot completo para Discord, focado em administração, entretenimento, música e utilitários. Desenvolvido para oferecer uma experiência "premium" e interativa para sua comunidade.

![Preview do Bot](bot_preview_mockup.png)

## 📑 Funcionalidades & Comandos

### 📂 Admin (Administração)

Comandos para gerenciar o servidor e o bot.

- **/ticketsetup**: Envia o painel de tickets para o canal atual (cria botão de atendimento).

### 🎲 Fun (Diversão)

Joguinhos para interagir com os membros.

- **/8ball**: A bola mágica responde sua pergunta com sabedoria.
- **/adivinhar**: Tente adivinhar o número secreto (1 a 100).
- **/moeda**: Joga uma moeda (Cara ou Coroa).
- **/dado**: Rola um dado (você escolhe os lados).
- **/jokenpo**: Jogue Pedra, Papel ou Tesoura contra o bot (com botões!).
- **/velha**: Inicia um Jogo da Velha contra outro membro.

### 🛡️ Moderation (Moderação)

Ferramentas para manter a ordem.

- **/ban**: Bane um usuário do servidor.
- **/kick**: Expulsa um usuário.
- **/timeout**: Aplica castigo (tempo de silêncio) em um usuário.
- **/unban**: Remove o banimento de um usuário.
- **/lock**: Tranca o canal (impede mensagens).
- **/unlock**: Destranca o canal.
- **/clear**: Limpa várias mensagens do chat de uma vez.

### 📂 Music (Música & Rádio)

Sistema de som de alta qualidade.

- **/radio [url]**: Toca uma rádio online ou link de stream.
- **/stop**: Para a música e desconecta o bot do canal.
- **Auto-Join**: O bot se conecta automaticamente ao canal de rádio configurado ao iniciar.

### 📂 Social (Interação)

Comandos de RPG e carinho.

- **/b-hug**: Dê um abraço (com GIF).
- **/b-kiss**: Dê um beijo.
- **/b-slap**: Dê um tapa!
- **/ship**: Calcule o amor entre duas pessoas.
- **/say**: Faz o bot repetir uma mensagem sua.

### 🛠️ Utility (Utilidades)

Ferramentas úteis para o dia a dia.

- **/privada**: Cria uma sala de voz temporária exclusiva para você (com auto-delete).
- **/reuniao**: Cria uma sala de reunião temporária.
- **/help**: Mostra esta lista de comandos.
- **/avatar**: Mostra a foto de perfil de alguém.
- **/serverinfo**: Informações do servidor.
- **/userinfo**: Informações de um usuário.
- **/ping**: Mostra a latência do bot.

---

## 🚀 Instalação e Uso

1. **Clone este repositório**
2. **Instale as dependências**:
   ```bash
   npm install
   ```
3. **Configure o arquivo .env**:
   Crie um arquivo `.env` na raiz com:
   ```env
   DISCORD_TOKEN=seu_token_aqui
   CLIENT_ID=seu_client_id_aqui
   GUILD_ID=id_do_servidor_de_teste
   ```
4. **Inicie o Bot**:
   ```bash
   npm start
   ```

## 🌐 Links

- [Adicionar ao Discord](https://discord.com/oauth2/authorize?client_id=SEU_CLIENT_ID&permissions=8&scope=bot%20applications.commands)

---

Desenvolvido por **RZSISTEMA**.
