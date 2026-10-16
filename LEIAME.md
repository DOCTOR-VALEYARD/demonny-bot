# 🌹 Demonny Bot — v7 (organizado)


## ✨ Versão DEMONNY — o que mudou

- Bot renomeado para **DEMONNY** (criador: 𝗔𝗡𝗝𝗜𝗡𝗛𝗢 𝗗𝗘𝗠𝗢𝗡𝗡𝗬🇱🇦🇬🇬🇧🇱). Arquivo principal: `demonnybot.js` (`node demonny.js` também funciona).
- Agora é um bot **masculino** (textos e personalidade da IA).
- **Cards removidos**: tudo funciona em modo simples (texto, ou foto com legenda).
- **Música aleatória removida** (a música normal continua). **Reações removidas** por completo.
- **Boas-vindas/despedida** com liga/desliga: `bemvindo on` / `bemvindo off` (só ADM, o bot ou o dono).
- **Level mais difícil**: 0,50 ponto por mensagem, máximo de 4,55 por dia; level 1→2 pede 1500 pontos, 2→3 pede 3000, 3→4 pede 4500... (editável em `config.js` → `LEVEL`).
- **Perfil novo** (`perfil`): foto, nome, número, cargo (dono/VIP/membro comum), grupo, level e barras de gado, fiel, infiel, feio e bonito com frases aleatórias.
- **Comando errado**: o bot marca a pessoa, mostra os comandos parecidos com a porcentagem de semelhança (útil quando o prefixo é outro) e avisa quando o comando não existe.

## Instalar (Termux)
```
bash instalar.sh          # instala tudo sozinho (Node, ffmpeg, yt-dlp, módulos...)
bash iniciar.sh           # liga o bot (reinicia sozinho se cair)
```
`bash instalar.sh --iniciar` instala e já liga. `--limpo` reinstala os módulos do zero.

## Atualizando de uma versão antiga
Copie esta pasta por cima (ou use a nova e traga só `database/`). Na primeira
inicialização o bot **move sozinho** áudios, gifs, figurinhas, imagens e jsons do
layout antigo para `src/midias` e `src/dados` — nada é apagado (sobras vão para `src/_antigos`).

## O que mudou
- `src/` agora tem **uma pasta por módulo** (`src/grupo/grupo.js`). Mapa em `src/LEIAME.md`.
- Botões **Entrar no canal / Falar com o criador** abrem direto, 1 toque.
- `citar` / `cita`: respondendo uma mensagem, reenvia ela marcando todos; `citar texto` reenvia o texto.
- Saudações (bom dia/boa tarde/boa noite) e **anti-amor** por áudio aleatório (`saudacao on`, `antiamor on`).
  Subir/apagar áudios: configurar-bot → SUBIR / APAGAR ÁUDIO, ou direto em `src/midias/audios/<categoria>/`.
- VIP virou **aluguel do bot** (`alugarbot`, `meualuguel`); `alugar` só para admin. Nenhum comando depende de aluguel.
- `criadora` → `criador`; donos extras: `configurar-bot adddono NUMERO`.
- **Anti-bot**: ignora outros bots do grupo (evita loop de prefixo). Desligar: `IGNORAR_OUTROS_BOTS: false` no `config.js`.
- O próprio número do bot e o dono passam por todas as travas.
- **33 efeitos de voz**: responda um áudio com `masculino`, `feminino`, `crianca`, `bebe`, `idoso`, `gigante`, `esquilo`, `grave`, `demonio`, `caverna`, `banheiro`, `igreja`, `estadio`, `tunel`, `agua`, `megafone`, `walkie`, `telefone`, `eco`, `radio`, `alien`, `fantasma`, `bebado`, `8bit`, `distorcao`, `reverso`, `coral`, `dueto`, `robo`, `vaporwave`, `nightcore`, `rapido`, `lento` (lista: `voz`).
- **30 efeitos de imagem**: responda uma foto com `efeitos NUMERO` (lista: `efeitos`).
- **Anti-amor reforçado**: pega abreviações e gírias (amr, mor, tkm, sdds, bjs, mô, 4mor, a m o r...) no meio de qualquer frase.
- **Anti-repetição**: se o bot já respondeu e a mesma pessoa manda o mesmo texto de novo em 60 s, ignora (`ANTI_REPETICAO_SEGUNDOS`).
- **Dica de prefixo**: `!menu` quando o certo é `/menu` → o bot marca a pessoa e mostra o comando certo; `/menuu` → "Você quis dizer /menu?".
- **Música**: sem download antes do clique; API e yt-dlp em corrida depois do clique.
