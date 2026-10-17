<div align="center">

<img src="assets/banner.svg" alt="Demonny Bot" width="100%">

<br>

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Termux](https://img.shields.io/badge/Termux-Android-000000?style=for-the-badge&logo=android&logoColor=3DDC84)
![Módulos](https://img.shields.io/badge/M%C3%B3dulos-Inclusos-0a6cff?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Online-00b7ff?style=for-the-badge)

[Instalação](#-instalação-rápida) •
[Manter online](#️-manter-online) •
[Atualizar](#-atualizar) •
[Problemas](#️-solução-de-problemas)

</div>

---

## 💀 Sobre

O **Demonny Bot** é um bot em Node.js feito para rodar direto no **Termux (Android)**, sem precisar de computador ou servidor.

Este repositório já inclui todos os módulos (`node_modules`). Você só baixa e inicia, sem instalar dependências.

| | |
|:--|:--|
| 📱 **Plataforma** | Android via Termux |
| ⚙️ **Tecnologia** | Node.js |
| 📦 **Módulos** | Já incluídos no repositório |

---

## 🚀 Instalação rápida

**1️⃣ Preparar o Termux** *(só na primeira vez)*

```bash
pkg update -y && pkg upgrade -y && pkg install -y git nodejs ffmpeg
```

**2️⃣ Baixar o bot**

```bash
git clone https://github.com/DOCTOR-VALEYARD/demonny-bot.git && cd demonny-bot
```

**3️⃣ Iniciar**

```bash
npm start
```

---

## ♻️ Manter online

Reinício automático se o bot cair:

```bash
while true; do npm start; sleep 2; done
```

Evitar que o Android suspenda o Termux:

```bash
termux-wake-lock
```

---

## 🔄 Atualizar

```bash
cd ~/demonny-bot && git pull
```

---

## 🛠️ Solução de problemas

| Problema | Solução |
|:--|:--|
| `git: command not found` | Rode o passo **1️⃣** novamente |
| `node: command not found` | `pkg install -y nodejs` |
| Bot não inicia | Entre na pasta: `cd ~/demonny-bot` |
| Parar o bot | Aperte **CTRL + C** |

---

## ⚠️ Aviso

Use com responsabilidade. Nunca compartilhe a sessão de login nem tokens com ninguém.

---

<div align="center">

### 💀 DEMONNY BOT

*Domine as sombras. Controle o caos.*

</div>
