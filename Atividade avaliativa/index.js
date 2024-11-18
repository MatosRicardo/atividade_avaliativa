
function Aluno(nome, rgm, curso, notas) {
    this.nome = nome;
    this.rgm = rgm;
    this.curso = curso;
    this.notas = notas.map(Number);  
    this.calcularMedia = function() {
        const soma = this.notas.reduce((total, nota) => total + nota, 0);
        return soma / this.notas.length;
    };
}


let listaAlunos = [];


function adicionarAluno(nome, rgm, curso, notas) {
    const aluno = new Aluno(nome, rgm, curso, notas);
    listaAlunos.push(aluno);  
    mostrarAlunos();  
}


function mostrarAlunos() {
    const tabela = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';  

    listaAlunos.forEach(function(aluno) {
        const linha = tabela.insertRow(); 

        linha.insertCell(0).textContent = aluno.nome;
        linha.insertCell(1).textContent = aluno.rgm;
        linha.insertCell(2).textContent = aluno.curso;
        linha.insertCell(3).textContent = aluno.calcularMedia().toFixed(2);

        const acoes = linha.insertCell(4);
        acoes.innerHTML = `
            <button class="editar" onclick="editarAluno('${aluno.rgm}')">Editar</button>
            <button class="excluir" onclick="removerAluno('${aluno.rgm}')">Excluir</button>
        `;
    });
}


function removerAluno(rgm) {
    listaAlunos = listaAlunos.filter(function(aluno) {
        return aluno.rgm !== rgm;  
    });
    mostrarAlunos();  
}


function editarAluno(rgm) {
    const aluno = listaAlunos.find(function(a) {
        return a.rgm === rgm;  
    });

    if (aluno) {
        aluno.nome = prompt('Novo nome:', aluno.nome);
        aluno.curso = prompt('Novo curso:', aluno.curso);
        aluno.notas = prompt('Novas notas (separadas por vírgula):', aluno.notas.join(',')).split(',').map(Number);
        mostrarAlunos(); 
    }
}


document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();  

    const nome = document.getElementById('nome').value;
    const rgm = document.getElementById('rgm').value;
    const curso = document.getElementById('curso').value;
    const notas = document.getElementById('notas').value.split(',');  

    adicionarAluno(nome, rgm, curso, notas);

    document.getElementById('formCadastro').reset();  
});

