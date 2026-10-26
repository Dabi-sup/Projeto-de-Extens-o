const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cosmeticos = require('./clientes/cosmeticos');
const marcenaria = require('./clientes/marcenaria');

// Inicializa o cliente salvando a sessão para não pedir QR Code toda hora
const client = new Client({ authStrategy: new LocalAuth() });

client.on('qr', (qr) => {
    console.log('Escaneie o QR Code abaixo com seu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Robô conectado e pronto para atendimento!');
});

// Controle simples de onde cada usuário está navegando
const estadoUsuarios = {};

client.on('message', async (msg) => {
    const remetente = msg.from;
    const texto = msg.body.toLowerCase();

    // Menu principal
    if (texto === 'oi' || texto === 'olá' || texto === 'menu') {
        estadoUsuarios[remetente] = 'MENU';
        const saudacao = "Olá! Bem-vindo ao atendimento automático.\n\n" +
                         "Escolha a opção desejada:\n" +
                         "1️⃣ - Catálogo Natura (Ana Cláudia)\n" +
                         "2️⃣ - Marcenaria e Móveis (Nilton César)";
        await client.sendMessage(remetente, saudacao);
        return;
    }

    // Roteamento dinâmico
    if (estadoUsuarios[remetente] === 'MENU') {
        if (texto === '1') {
            estadoUsuarios[remetente] = 'COSMETICOS';
            await cosmeticos.iniciar(client, remetente);
        } else if (texto === '2') {
            estadoUsuarios[remetente] = 'MARCENARIA';
            await marcenaria.iniciar(client, remetente);
        } else {
            await client.sendMessage(remetente, "Opção inválida. Digite 1 ou 2.");
        }
        return;
    }

    // Encaminha para as lógicas de negócio independentes
    if (estadoUsuarios[remetente] === 'COSMETICOS') {
        await cosmeticos.responder(client, remetente, texto);
    } else if (estadoUsuarios[remetente] === 'MARCENARIA') {
        await marcenaria.responder(client, remetente, texto);
    }
});

client.initialize();