/* =================================================
   🔗 DEMONNY BOT — LINKS DO BOT (canal, grupo e contato)
   📁 Arquivo: links.js

   Muda os links do bot pelo WhatsApp, sem mexer em arquivo nenhum.
   Fica salvo em database/botconfig.json e vale na hora pra todos os
   botões (menu, entrada/saída, música, aluguel...).

   <prefixo>setlink                     → mostra os links atuais
   <prefixo>setlink canal <link>        → botão "📢 ENTRAR NO CANAL"
   <prefixo>setlink grupo <link>        → botão "👥 ENTRAR NO GRUPO"
   <prefixo>setlink grupo atual         → usa o link DESTE grupo (bot precisa ser admin)
   <prefixo>setlink contato <número>    → botão "💬 FALAR COM O CRIADOR"
   <prefixo>setlink canal apagar        → tira o link (vale pra grupo e contato também)

   Só o dono do bot pode usar.
================================================= */
const fs = require("fs");
const path = require("path");
const config = require("../../config");
const { ehDono } = require("../utils-validacao/utils-validacao");

const ARQUIVO = path.join(__dirname, "../../database/botconfig.json");

const CHAVES = {
    canal: "CHANNEL_URL",
    grupo: "GROUP_URL",
    contato: "CONTACT_NUMBER"
};

function lerDB() {
    try {
        const conteudo = fs.readFileSync(ARQUIVO, "utf8").trim();
        return conteudo ? JSON.parse(conteudo) : {};
    } catch { return {}; }
}

function salvarDB(db) {
    fs.mkdirSync(path.dirname(ARQUIVO), { recursive: true });
    fs.writeFileSync(ARQUIVO, JSON.stringify(db, null, 2), "utf8");
}

// 🔄 Faz config.CHANNEL_URL / GROUP_URL / CONTACT_NUMBER lerem sempre o valor
// salvo pelo comando (se tiver), senão o que está no config.js.
function instalarLinksDinamicos(cfg = config) {
    for (const chave of Object.values(CHAVES)) {
        const padrao = cfg[chave] || "";
        try {
            Object.defineProperty(cfg, chave, {
                enumerable: true,
                configurable: true,
                get() {
                    const db = lerDB();
                    if (Object.prototype.hasOwnProperty.call(db, chave)) return db[chave] || "";
                    return padrao;
                }
            });
        } catch {}
    }
}

function numeroDoContato() {
    return String(config.CONTACT_NUMBER || config.OWNER_NUMBER || "").replace(/\D/g, "");
}

function normalizarLink(valor) {
    let v = String(valor || "").trim();
    if (!v) return "";
    if (!/^https?:\/\//i.test(v)) v = `https://${v}`;
    return v;
}

async function cmdSetLink(sock, msg, args) {
    const from = msg.key.remoteJid;
    const autor = msg.key.participant || msg.key.participantAlt || from;
    const P = config.PREFIX;

    if (!msg.key.fromMe && !ehDono([autor, msg.key.participantAlt, from], config.OWNER_NUMBER)) {
        return sock.sendMessage(from, { text: "🚫 Só o dono do bot pode mudar os links." }, { quoted: msg });
    }

    const tipo = String(args[0] || "").toLowerCase();
    const valor = args.slice(1).join(" ").trim();

    if (!CHAVES[tipo]) {
        const contato = numeroDoContato();
        return sock.sendMessage(from, {
            text:
                `🔗 *LINKS DO BOT*\n\n` +
                `> 📢 Canal: ${config.CHANNEL_URL || "_sem link_"}\n` +
                `> 👥 Grupo: ${config.GROUP_URL || "_sem link_"}\n` +
                `> 💬 Contato: ${contato ? `+${contato}` : "_sem número_"}\n\n` +
                `*Como mudar:*\n` +
                `🌸 ${P}setlink canal <link do canal>\n` +
                `🌸 ${P}setlink grupo <link do grupo>\n` +
                `🌸 ${P}setlink grupo atual _(pega o link deste grupo)_\n` +
                `🌸 ${P}setlink contato <número com DDD>\n` +
                `🌸 ${P}setlink canal apagar _(tira o link)_\n\n` +
                `🌸 ${config.BOT_NAME}`
        }, { quoted: msg });
    }

    const chave = CHAVES[tipo];
    const db = lerDB();

    if (["apagar", "remover", "tirar", "off"].includes(valor.toLowerCase())) {
        db[chave] = "";
        salvarDB(db);
        return sock.sendMessage(from, { text: `🗑️ Link de *${tipo}* removido. O botão some até você colocar outro.` }, { quoted: msg });
    }

    let novo = "";
    if (tipo === "contato") {
        novo = valor.replace(/\D/g, "");
        if (novo.length < 10 || novo.length > 15) {
            return sock.sendMessage(from, { text: `❌ Número inválido. Use com DDI e DDD.\nEx.: *${P}setlink contato 5511999999999*` }, { quoted: msg });
        }
    } else if (tipo === "grupo" && valor.toLowerCase() === "atual") {
        if (!from.endsWith("@g.us")) {
            return sock.sendMessage(from, { text: "❌ Use *grupo atual* dentro do grupo que você quer." }, { quoted: msg });
        }
        try {
            novo = `https://chat.whatsapp.com/${await sock.groupInviteCode(from)}`;
        } catch {
            return sock.sendMessage(from, { text: "❌ Não consegui pegar o link deste grupo. O bot precisa ser *admin* aqui." }, { quoted: msg });
        }
    } else {
        novo = normalizarLink(valor);
        const certo = tipo === "canal" ? /whatsapp\.com\/channel\//i : /chat\.whatsapp\.com\//i;
        if (!novo || !certo.test(novo)) {
            const ex = tipo === "canal" ? "https://whatsapp.com/channel/..." : "https://chat.whatsapp.com/...";
            return sock.sendMessage(from, { text: `❌ Esse não parece um link de ${tipo} do WhatsApp.\nEx.: *${P}setlink ${tipo} ${ex}*` }, { quoted: msg });
        }
    }

    db[chave] = novo;
    salvarDB(db);
    const mostrado = tipo === "contato" ? `+${novo}` : novo;
    return sock.sendMessage(from, {
        text: `✅ Link de *${tipo}* atualizado!\n\n${mostrado}\n\nJá vale pra todos os botões do bot, sem reiniciar.`
    }, { quoted: msg });
}

module.exports = { instalarLinksDinamicos, cmdSetLink, numeroDoContato };
