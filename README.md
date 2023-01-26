# DEVin[Philips]: Módulo Front-end · Projeto Final
Este é o projeto final do módulo de front-end do programa DEVinHouse turma Philips, uma parceria entre SESI SENAI/SC, LAB365, e Philips.

## Como rodar
Este projeto foi construído utilizando o framework Angular. É necessário rodar o comando `npm install` para instalar os pacotes do node. Depois disso, o comando `ng serve --o` abre o aplicativo no browser.

## Como utilizar

### Aviso inicial
Um requisito do projeto era simular loading e transições. O aplicativo está artificialmente lento para que as transições fiquem evidentes. Ele não é lento.

### Login
O aplicativo vem com um usuário cadastrado por padrão. É possível fazer login com as credenciais dele, ou criar suas próprias. As credenciais do usuário são:
- Email: medico@philips.com
- Senha: medico123

### Cadastro
O usuário pode cadastrar pacientes, e também pode cadastrar consultas e exames para os pacientes já cadastrados. Basta usar os botões de navegação à esquerda.

### Edição e Exclusão
Para editar o cadastro de um paciente, deve-se clicar em "ver mais" no seu card na página "INÍCIO". O formulário de cadastro é aberto com a opção de edição habilitada. Caso não haja consultas e exames vinculados ao paciente, a opção de deletar também estará habilitada.

Para editar ou deletar o cadastro de uma consulta ou exame, a página "LISTAR PRONTUÁRIO" deve ser acessada. Nela, cada usuário possui um ">" que exibe todas as consultas e exames vinculadas ao paciente. Cada item possui seu botão de editar que permite tanto editar quanto deletar.

### Busca
As páginas "INÍCIO" e "LISTAR PRONTUÁRIO" permitem um filtro de pacientes. As páginas de cadastro de consulta e de exame requerem uma busca para vincular o paciente.

### Persistência
O local storage do browser é utilizado para persistência entre sessões. Usuários para login, pacientes, consultas, exames, e os ids autoincrementados são persistidos.

### Utilidade
A ideia do sistema é agilizar o registro de consultas e exames, de forma que o médico ganhe produtividade, e a informação sobre o paciente não seja perdida.

## Desafios e Aprendizados
O maior desafio foi o tempo. Não foi fácil realizar o projeto em duas semanas conciliando trabalho, estudos, e as outras facetas da vida. Foi uma boa oportunidade prática para se pensar sobre como reutilizar código, de forma a produzir mais com menos linhas, e facilitar a manutenção posterior.

### Conceitos utilizados
Sem nenhuma ordem em particular:
- Serviços globais, reutilizando código;
- Gerenciamento de banco de dados relacional com chaves primárias e estrangeiras, com todas as operações de CRUD;
- Roteamento, inclusive com guardas de rota e redirecionamento;
- Geração de componentes dinâmicos com informações do banco de dados;
- Validação de formulários, inclusive de datas, máscaras com regex, autenticação;
- UI bonita, responsiva, e acessível.

## Agradecimentos
Primeiramente à Philips, por proporcionar a oportunidade dessa educação gratuita. Em segundo lugar a toda a equipe do SENAI, dando destaque aos professores Kelvis, Rayane, Romeu e Thais.
