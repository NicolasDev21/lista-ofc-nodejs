/* Desafio |: 

    *Criar um algoritmo que simule uma calculadora de gorjetas para dividir a conta entre um grupo de pessoas.

    O programa deve conter:

       1 - Imprimir o valor total da compra; ?
       2 - Imprimir a quantidade de pessoas no grupo; | Status: CHECK
       3 - Solicitar ao usuário que insira o nome de cada pessoa e o valor de contribuição; | Status: CHECK
       4 - Calcular e imprimir a quantia que cada pessoa deverá pagar; | Status: CHECK
       5 - Aplicar um valor de 10% de desconto no valor total a pagar;

*/

const inquirer = require('inquirer');
const chalk = require('chalk');
const fileSystem = require('fs');
const { type } = require('os');


const actionForUser = [
    {
        type: 'list',
        name: 'actionUser',
        message: 'Selecione qual ação deseja executar:',
        choices: ['Cadastrar produto', 'Cadastrar contribuinte', 'Ver todos os produtos', 'Ver todas as contribuições', 'Realizar pagamento']
    }
];
// Capturando a ação selecionada pelo usuário:
function optionUser() {

    inquirer
        .prompt(actionForUser)
        .then((answers) => {
            const actionResponse = answers['actionUser'];

            console.log(`${chalk.bold('Ação selecionada:')} ${actionResponse}`);

            if (actionResponse === 'Cadastrar contribuinte') {
                cadasterUser();
            } else if (actionResponse === 'Cadastrar produto') {
                cadasterProduct();
            } else if (actionResponse === 'Ver todos os produtos') {
                readProduct();
            } else if (actionResponse === 'Ver todas as contribuições') {
                readUsers();
            } else if (actionResponse === 'Realizar pagamento') {
                calculateProducts();
            } else {
                console.log(`Selecione uma opção.`);
            }

        })
        .catch((err) => { console.error(`Ocorreu um erro: ${err}`) });
}
optionUser();



const formCadasterUser = [
    { name: 'nome', message: 'Digite o nome do usuário:' },
    { name: 'contribuicao', message: 'Digite a quantidade que deseja contribuir (R$):' }
];
// Function | Cadastrar novo usuário no sistema:
function cadasterUser() {

    if (!fileSystem.existsSync('users')) {
        fileSystem.mkdirSync('users');
    };

    inquirer
        .prompt(formCadasterUser)
        .then((answers) => {

            const username = String(answers['nome']);
            const userContribuicao = parseFloat(answers['contribuicao'].replace(',', '.'));

            console.log(` ------- Novo usuário: ------- 
            Nome do contribuinte: ${chalk.yellow.bold(`${username}`)}.
            Valor de contribuição: ${chalk.green.bold(`R$${userContribuicao}`)}`);

            if (validateUser(username) === true) {
                console.warn(`${chalk.red.bold(`Aviso |:`)} Contribuinte: "${username}", já se encontra registrado em nosso sistema! Favor, inserir outro nome.`);

                console.log(`-----------------------------------------------------------------------------------------------`);
            } else {
                registerUserJSON();

                function registerUserJSON() {
                    fileSystem.writeFileSync(
                        `users/${username}.json`,
                        `{"username":"${username}","valor":${userContribuicao}}`,
                        function (error) {
                            console.log(`Ocorreu um erro: ${error}`);
                        }
                    );
                }
                console.info(`Contribuinte: "${username}", cadastrado com sucesso!`);

                console.log(`--------------------------------------------------`);
            };
            return questionUserExit();
        })
        .catch((error) => {
            console.error(` ${chalk.red.bold('Aviso |:')} Ocorreu um erro inesperado! ${error}`);
        });
};
// Function | Validando se o usuário ja tem cadastro:
function validateUser(username) {
    if (fileSystem.existsSync(`users/${username}.json`)) {
        return true;
    } else {
        return false;
    }
}



const formCadasterProduct = [
    { name: 'nameProduct', message: 'Digite o nome do produto que está comprando:' },
    { name: 'priceProduct', message: 'Digite o valor total do produto que está comprando (R$):' }
];
// Function | Cadastrar novo produto no sistema:
function cadasterProduct() {

    if (!fileSystem.existsSync('product')) {
        fileSystem.mkdirSync('product');
    };

    inquirer
        .prompt(formCadasterProduct)
        .then((answers) => {
            const nameProduct = String(answers['nameProduct']);
            const priceProduct = parseFloat(answers['priceProduct'].replace(',', '.'));

            if (validateProduct(nameProduct) == true) {
                console.warn(`${chalk.red.bold(`Aviso |:`)} O produto: "${nameProduct}", já está cadastrado em nosso sistema! Favor, cadastre outro produto.`);
            } else {
                fileSystem.writeFileSync(
                    `product/${nameProduct}.json`,
                    `{"productName":"${nameProduct}","price":${priceProduct}}`,
                    function (error) {
                        console.erro(`${chalk.red.bold(`Error |: Ocorreu um erro inesperado! ${error}`)}`);
                    }

                );
                console.info(`Produto: "${nameProduct}", cadastrado com sucesso!`);
            };


            console.log(`-----------------------------------------------------------------------------------------------`);
            return questionUserExit();
        })
        .catch((err) => {
            console.erro(`${chalk.red.bold(`Error |:`)} ${err}`);
        })
};
// Function | Validando se o produto ja está cadastrado:
function validateProduct(nameProduct) {
    if (fileSystem.existsSync(`product/${nameProduct}.json`)) {
        return true;
    } else {
        return false;
    };
};



// Function | Quest usuario: Deseja sair ?
function questionUserExit() {
    const questionExit = [
        {
            type: 'list',
            name: 'questionExit',
            message: 'Deseja sair?',
            choices: ['Sim', 'Não']
        }
    ];

    inquirer
        .prompt(questionExit)
        .then((answers) => {
            const questionResponse = answers['questionExit'];
            console.log(`---------------------------------------------`);

            if (questionResponse === 'Sim') {
                exitSystem();
            };
        })
        .catch((err) => {
            console.log(`${chalk.red.bold('Alert |:')} Ocorreu um erro: ${err}`);
        })
}
// Função | Sair do sistema:
function exitSystem() {
    return optionUser();
};



// Function | Ler todos os contribuintes cadastrados
function readUsers() {
    fileSystem.readdir('./users', (err, data) => {

        if (err) {
            console.log(err);
            optionUser();
        } else {
            const usersStringify = data;
            const arrayUsers = usersStringify;

            if (arrayUsers) {
                if (arrayUsers.length > 0) {
                    console.log(`Total de contribuições: ${chalk.yellow.bold(arrayUsers.length)}`);
                    console.log(`----------------------------------`);
                    console.log(`Tabela de contribuintes cadastrados:`);
                    console.table(arrayUsers);
                } else {
                    console.log(`Nenhum contribuinte cadastrado no sistema: ${chalk.red.bold(`${arrayUsers.length}`)}`);
                    console.log(`---------------------------------------------`);
                    console.log(`Tabela de contribuintes cadastrados:`);
                    console.table(arrayUsers);
                }
                optionDetailUser();
            };
        }
    });

};

// Function | Opção para detalhar o usuário:
function optionDetailUser() {
    const optionDetailUser = [
        {
            type: 'list',
            name: 'detailUser',
            message: 'Selecione a ação que deseja realizar:',
            choices: ['Ver detalhes do contribuinte', 'Sair']
        }
    ];

    inquirer
        .prompt(optionDetailUser)
        .then((answers) => {
            const optionSelected = answers['detailUser'];
            console.log(optionSelected)

            if (optionSelected === 'Ver detalhes do contribuinte') {
                showDetailsUsers();
            } else {
                questionUserExit();
            }
        })
};

// Function | Retornar detalhes de dados do usuário
function showDetailsUsers() {
    const inputUser = [
        {
            name: 'username',
            message: 'Digite o nome do contribuinte cadastrado:'
        }
    ];

    inquirer
        .prompt(inputUser)
        .then((answers) => {
            const username = answers['username'];

            fileSystem.readFile(`./users/${username}.json`, (err, data) => {
                if (err) {
                    console.error(`${chalk.red.bold('Error |:')} Ocorreu um erro inesperado: ${err}`);
                    console.log('-------------------------------------------------------------');
                    exitSystem();
                } else {
                    const userData = data;

                    const arrayUserData = JSON.parse(userData);
                    console.table(arrayUserData);

                    const name = arrayUserData.username;
                    const valor = arrayUserData.valor;

                    console.log('-------------------------------------------------------------');
                    console.log(`${chalk.yellow.bold('Dados do contribuinte:')} Nome: ${name} | Valor: ${chalk.green.bold(`R$ ${valor}`)} `);
                    console.log('-------------------------------------------------------------');
                    questionUserExit();
                }
            })
        })

};


// Function | Ler todos os produtos cadastrados:
function readProduct() {
    fileSystem.readdir('./product', (err, data) => {

        if (err) {
            console.log(err);
            optionUser();
        } else {
            const productStringify = data;
            const arrayProducts = productStringify;

            if (arrayProducts) {
                if (arrayProducts.length > 0) {
                    console.log(`Total de produtos cadastrados: ${chalk.yellow.bold(arrayProducts.length)}`);
                    console.log(`----------------------------------`);
                    console.log(`Tabela de produtos cadastrados:`);
                    console.table(arrayProducts);
                } else {
                    console.log(`Nenhum contribuinte cadastrado no sistema: ${chalk.red.bold(`${arrayProducts.length}`)}`);
                    console.log(`---------------------------------------------`);
                    console.log(`Tabela de produtos cadastrados:`);
                    console.table(arrayProducts);
                }
                optionDetailProduct();
            };
        }
    });

};

// Function | Opção para detalhar produtos:
function optionDetailProduct() {
    const optionDetailProduct = [
        {
            type: 'list',
            name: 'detailProduct',
            message: 'Selecione a ação que deseja realizar:',
            choices: ['Ver detalhes do produto', 'Sair']
        }
    ];

    inquirer
        .prompt(optionDetailProduct)
        .then((answers) => {
            const optionSelected = answers['detailProduct'];
            console.log(optionSelected)

            if (optionSelected === 'Ver detalhes do produto') {
                showDetailsProduct();
            } else {
                questionUserExit();
            }
        })
};

// Function | Retornar detalhes do produto:
function showDetailsProduct() {
    const viewProductDetails = [
        {
            name: 'productName',
            message: 'Digite o nome do produto cadastrado:'
        }
    ];

    inquirer
        .prompt(viewProductDetails)
        .then((answers) => {
            const name = answers['productName'];

            fileSystem.readFile(`./product/${name}.json`, (err, data) => {
                if (err) {
                    console.log(`${chalk.red.bold('Error |:')} Ocorreu um erro de sistema: ${err} `);
                    console.log('-------------------------------------------------------------');
                    exitSystem();

                } else {
                    const productData = data;

                    const arrayProductData = JSON.parse(productData);

                    console.table(arrayProductData);
                    const nameProduct = arrayProductData.productName;
                    const valorProduct = arrayProductData.price;

                    console.log('-------------------------------------------------------------');
                    console.log(`${chalk.yellow.bold('Dados do produto:')} Nome: ${nameProduct} | Valor: ${chalk.green.bold(`R$ ${valorProduct}`)} `);
                    console.log('-------------------------------------------------------------');
                    questionUserExit();
                };
            });
        })
};
























