const fs = require('fs');
const bcrypt = require(`bcrypt`)

// Inicio Pré feitos
const carregarSenhas = () => {
    const dados = fs.readFileSync(`senhas.json`);
    const formatDados = dados.toString();
    const dadosJson = JSON.parse(formatDados);

    return dadosJson;
}

const salvarSenhas = (senhas) => {
    //transformo objeto em String
    const dadosJSON = JSON.stringify(senhas);
    //Escrevo essa string no arquivo.json
    fs.writeFileSync('senhas.json', dadosJSON);

}
// Fim Pré feitos
const mostrarSenhas = () => {
    const senhas = carregarSenhas();

    senhas.forEach((senha) => {
        console.log(`Senha: ${senha.senha}`);
        console.log(`Senha Criptografada: ${senha.senhaCripto}`);
        console.log(`---------------------------------------------------------------------------------`);
    })
}

const addSenha = (nova_senha) => {
    const senhas = carregarSenhas();
    const senhasDuplicadas = senhas.filter((senha) => {
        return senha.senha === nova_senha;
    })

    if (senhasDuplicadas == 0) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(nova_senha, salt, (err, hash) => {
                senhas.push({
                    senha: nova_senha,
                    senhaCripto: hash
                })
                salvarSenhas(senhas);
                console.log(`A senha foi adicionada!`);

            })
        })

    } else {
        console.log(`A senha já existe!`);

    }
}

const removeSenha = (senha_remove) =>{
    const senhas = carregarSenhas();
    const senhas_para_manter = senhas.filter( (senha) => {
        //returna apenas as notas que o titulo
        //não é igual ao "nota_titulo"
        return senha.senha != senha_remove;
    });

    if ( senhas.length > senhas_para_manter.length ){
        console.log("Senha removida!");
        salvarSenhas(senhas_para_manter);
    }else{
        console.log("Nenhum nota encontrada para remover!");
    }
}

module.exports = {
    mostrarSenhas: mostrarSenhas,
    addSenha: addSenha,
    removeSenha: removeSenha
}