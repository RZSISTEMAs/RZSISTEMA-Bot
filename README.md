# 🤖 RZSISTEMA App (Discord Bot)

O **RZSISTEMA App** é um bot completo para Discord, focado em administração, entretenimento, música e utilitários. Desenvolvido para oferecer uma experiência "premium" e interativa para sua comunidade.

![Preview do Bot](bot_preview_mockup.png)

## 📑 Funcionalidades & Comandos

### 📂 Admin (Administração e Configuração)

Comandos essenciais para a configuração do bot.

- **/ticketsetup**: Cria um painel de atendimento para os membros abrirem tickets.
- **/ticket**: Comandos internos de gerenciamento de tickets.

### 🎲 Fun (Jogos e Diversão)

Jogos interativos para engajar a comunidade.

- **/adivinhar**: Tente adivinhar o número secreto (1 a 100).
- **/bola8**: A bola mágica responde sua pergunta com sabedoria.
- **/dado**: Rola um dado virtual (d6, d20, etc).
- **/forca**: Jogo clássico da Forca (responda no chat).
- **/jokenpo**: Jogue Pedra, Papel ou Tesoura contra o bot com botões interativos.
- **/memoria**: Jogo da Memória para encontrar pares de emojis.
- **/moeda**: Joga uma moeda (Cara ou Coroa).
- **/velha**: Desafie um amigo para uma partida de Jogo da Velha.

### 🛡️ Moderation (Moderação e Segurança)

Ferramentas par manter a ordem no servidor.

- **/ban**: Bane um usuário permanentemente.
- **/clear**: Limpa várias mensagens do chat de uma vez.
- **/kick**: Expulsa um usuário do servidor.
- **/lock**: Tranca o canal atual (impede novas mensagens).
- **/timeout**: Aplica um castigo temporário (silêncio) em um usuário.
- **/unban**: Remove o banimento de um usuário.
- **/unlock**: Destranca o canal atual.
- **Logs**: O bot registra mensagens apagadas automaticamente no canal configurado.
- **Boas-vindas**: O bot envia um cartão de boas-vindas com a foto do novo membro.

### 🎵 Music (Música e Rádio)

Sistema de áudio robusto e de alta qualidade.

- **/radio [url]**: Toca uma rádio online ou stream de áudio via link direto.
- **/stop**: Para a reprodução atual e desconecta o bot da sala.

### 💬 Social (Interação e Roleplay)

Comandos para expressar sentimentos e interagir.

- **/bite**: Dê uma mordidinha em alguém (GIF).
- **/cuddle**: Faça carinho em alguém (GIF).
- **/dance**: Convide para dançar ou dance sozinho (GIF).
- **/hug**: Dê um abraço apertado em alguém (GIF).
- **/kiss**: Dê um beijo em alguém (GIF).
- **/say**: Faz o bot repetir uma mensagem sua.
- **/ship**: Calcule a compatibilidade amorosa entre duas pessoas.
- **/slap**: Dê um tapa (virtual) em alguém.

### 🛠️ Utility (Utilidades Gerais)

Ferramentas úteis para o dia a dia do servidor.

- **/avatar**: Exibe a foto de perfil em alta resolução de um usuário.
- **/help**: Mostra esta lista de comandos organizada.
- **/ping**: Verifica a latência e conexão do bot.
- **/privada**: Cria uma sala de voz temporária exclusiva para você (auto-delete).
- **/reuniao**: Cria uma sala de reunião temporária pública (auto-delete).
- **/serverinfo**: Exibe estatísticas e informações do servidor.
- **/userinfo**: Exibe informações detalhadas sobre um usuário ou bot.

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
   # GUILD_ID= (Deixe comentado para registro global)
   ```
4. **Inicie o Bot**:
   ```bash
   npm start
   ```

## 🌐 Links

- [Adicionar ao Discord](https://discord.com/oauth2/authorize?client_id=SEU_CLIENT_ID&permissions=8&scope=bot%20applications.commands)

---

Desenvolvido por **RZSISTEMA**.
