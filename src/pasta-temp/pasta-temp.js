/* =================================================
   🗂️ DEMONNY BOT — PASTA TEMPORÁRIA PRÓPRIA
   📁 Arquivo: pasta-temp.js

   Em hospedagem o /tmp do sistema costuma ser minúsculo e enche rápido
   ("ENOSPC: no space left on device"), mesmo com o disco do painel livre.
   Aqui o bot passa a usar uma pasta "tmp" DENTRO do próprio disco (onde
   tem espaço) pra TUDO que é temporário: conversão de áudio/figurinha,
   mídia do Baileys, downloads de música etc.

   • Redireciona TMPDIR/TEMP/TMP pro tmp do bot (vale pro os.tmpdir()
     de todo mundo, inclusive do Baileys).
   • Limpa sobras antigas (mais de 30 min) ao ligar e de vez em quando.
   • Se por algum motivo não der pra criar o tmp do bot, cai no /tmp
     do sistema (não quebra nada).
================================================= */
const fs = require("fs");
const os = require("os");
const path = require("path");

const LIMITE_MS = 30 * 60 * 1000; // sobras com mais de 30 min são apagadas

let pasta = null;

function garantirPasta() {
    if (pasta) return pasta;
    const alvo = path.join(process.cwd(), "tmp");
    try {
        fs.mkdirSync(alvo, { recursive: true });
        // testa se dá pra escrever mesmo
        const teste = path.join(alvo, ".escrita-ok");
        fs.writeFileSync(teste, "ok");
        fs.unlinkSync(teste);
        pasta = alvo;
    } catch {
        pasta = os.tmpdir(); // fallback: /tmp do sistema
    }
    return pasta;
}

function limpar() {
    const dir = garantirPasta();
    const limite = Date.now() - LIMITE_MS;
    try {
        for (const nome of fs.readdirSync(dir)) {
            const caminho = path.join(dir, nome);
            try {
                if (fs.statSync(caminho).mtimeMs < limite) fs.rmSync(caminho, { recursive: true, force: true });
            } catch {}
        }
    } catch {}
}

// Chamar UMA vez, bem no começo do bot (antes de carregar o resto).
function instalar() {
    const dir = garantirPasta();
    process.env.TMPDIR = dir;
    process.env.TEMP = dir;
    process.env.TMP = dir;
    limpar();
    // Faxina periódica, pra nunca acumular sobra e encher o disco.
    try { setInterval(limpar, 15 * 60 * 1000).unref?.(); } catch {}
    return dir;
}

// Caminho de um arquivo temporário novo dentro da pasta do bot.
function arquivoTemp(nome) {
    const dir = garantirPasta();
    const seguro = nome || `tmp_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    return path.join(dir, seguro);
}

module.exports = { instalar, arquivoTemp, pastaTemp: garantirPasta, limpar };
