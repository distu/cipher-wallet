const crypto = require('crypto');
const readlineSync = require('readline-sync');

// Função para descriptografar o texto
function decrypt(encryptedText, password) {
    const parts = encryptedText.split(':');
    const salt = parts[0];
    const iv = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];
    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Pede ao usuário a string criptografada
const encryptedText = readlineSync.question('Digite o texto criptografado: ');

// Pede ao usuário a senha
const password = readlineSync.question('Digite a senha: ', {
    hideEchoBack: true
});

// Descriptografa o texto
try {
    const decryptedText = decrypt(encryptedText, password);
    console.log('Texto descriptografado:');
    console.log(decryptedText);
} catch (err) {
    console.error('Erro ao descriptografar o texto:', err.message);
}