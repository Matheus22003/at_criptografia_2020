const notas = require('./notas.js');

const senha = require(`./senhas`)

//notas.listarNotas();

//notas.lerNota("um titulo qualquer");
//notas.adicionarNota("Um novo titulo", "abcdefg USAUSHAUS");
//notas.removerNota("Um novo titulo");

// console.log(process.argv);

//Adicionar uma nota
const comando = process.argv[2];
const senha_nova = process.argv[3];

if (comando == "exibir") {
    senha.mostrarSenhas();
    // notas.listarNotas()
}
else if(comando == `add`){
    senha.addSenha(senha_nova)
}
else if(comando == `del`){
    senha.removeSenha(senha_nova)
}
else if (comando == null) {
    console.log(`Comandos:node app.js add <colocar a nova senha>`);
    console.log(`node app.js del <senha que desja deletar>`);
    console.log(`node app.js exibir <"nao escreva nada" exibe todas as senhas>`);
    
    

}
else {
    console.log("comando incorreto");
}



//remover nota

//listar todas

//ler uma em especifico

//trabalhar argumentos