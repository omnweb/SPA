// tasks relacionadas ao código da aplicação.
const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')

function appHTML() {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'))
}

function appCSS() {
    return gulp.src('src/assets/sass/index.scss') // Pegando o caminho do arquivo raiz que possui a referência para outros arquivos
        .pipe(sass().on('error', sass.logError)) // pega todo o saas e transforma em Css, Caso aconteça um erro ele mostra no log
        .pipe(uglifycss({ "uglyComments": true })) // Acrescenta os arquivos de comentários ao arquivo final
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('build/assets/css'))
}

function appJS() {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(babel({ presets: ['env'] }))
        .pipe(uglify()) // Não precisa usar parâmentros, ele vai pegar o código e minificar
        //Usando quando quer obter uma execução disparada por um evento 
        // .on("error", err => console.log(err))  // Tratando evento de erro, é possível concatenar pipes e on
        .pipe(concat('app.min.js')) // Pega todos os arquivos que foram transpilados usando o babel e minificados usando uglify e concatena em outro arquivo, neste caso o codigo.min.js
        .pipe(gulp.dest('build/assets/js'))
}

function appIMG() {
    return gulp.src('src/assets/imgs/**/*.*') //Pega tudo dentro da pasta, sem distição por extensão de arquivo
        .pipe(gulp.dest('build/assets/imgs'))
}

//Declarando a task e apontado para a função

gulp.task('appHTML', appHTML)
gulp.task('appCSS', appCSS)
gulp.task('appJS', appJS)
gulp.task('appIMG', appIMG)

//  Exportar funções usando sistema de modulos do node

module.exports = {
    appHTML,
    appCSS,
    appJS,
    appIMG
}