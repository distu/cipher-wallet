const crypto = require('crypto');
const readlineSync = require('readline-sync');

// Função para criptografar o texto
function encrypt(text, password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return salt + ':' + iv.toString('hex') + ':' + encrypted;
}

// Pede ao usuário a string a ser criptografada
const text = readlineSync.question('Digite o texto para criptografar: ');

// Pede ao usuário a senha
const password = readlineSync.question('Digite a senha: ', {
    hideEchoBack: true
});

// Criptografa o texto
const encryptedText = encrypt(text, password);

console.log('Texto criptografado:');
console.log(encryptedText);