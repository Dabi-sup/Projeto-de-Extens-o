async function iniciar(client, remetente) {
    const menu = "💄 *Revenda de Cosméticos - Ana Cláudia*\n\n" +
                 "1 - Ver Catálogo Digital Natura\n" +
                 "2 - Fazer um pedido automatizado\n" +
                 "3 - Falar diretamente com a Ana Cláudia\n\n" +
                 "0 - Voltar ao menu principal";
    await client.sendMessage(remetente, menu);
}

async function responder(client, remetente, texto) {
    if (texto === '1') {
        await client.sendMessage(remetente, "Acesse nosso catálogo interativo aqui: [Seu Link Aqui].\nPara pedir, digite 2.");
    } else if (texto === '2') {
        await client.sendMessage(remetente, "📝 Digite o NOME ou CÓDIGO dos produtos que deseja pedir em uma única mensagem.");
    } else if (texto === '3') {
        await client.sendMessage(remetente, "Aguarde um momento, a Ana Cláudia já vai te responder!");
    } else if (texto === '0') {
        await client.sendMessage(remetente, "Digite 'menu' para recomeçar.");
    } else {
        await client.sendMessage(remetente, "Não entendi. Digite 1, 2, 3 ou 0.");
    }
}

module.exports = { iniciar, responder };