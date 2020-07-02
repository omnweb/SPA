//Servidor para ajudar a automatizar o fluxo de desenvolvmento

const gulp = require('gulp')
const webserver = require('gulp-webserver')
const watch = require('gulp-watch') // Será usado para monitorar arquivos

function servidor(cb) {
    return gulp.src('build')//Vai ficar acompanhando a pasta build
        .pipe(webserver({
            port: 8080, //Porta que o servido vai usar
            open: true, // Se eu quero que abra o browser 
            livereload: true, // Refresh em tempo real
        }))
}

// Monitorar arquivos vai servir para verificar se houveram alterações no build da aplicação, ele chama uma das tasks

function monitorarArquivos(cb) {
    watch('src/**/*.html', () => gulp.series('appHTML')()) // Sempre que for alterado algum arquivo html, essa função arrow é executada para chamar a task de html e efetuar a alteração.
        return cb()
}

module.exports = {
    monitorarArquivos,
    servidor
}