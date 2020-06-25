const {series, parallel} = require('gulp')
const gulp = require('gulp')

// Importando as funções

const { appHTML, appCSS, appJS, appIMG } = require('./gulpTasks/app')
const { depsCSS, depsFonts } = require('./gulpTasks/deps')
const { monitorarArquivos, servidor} = require('./gulpTasks/servidor')

// definindo o workflow das funções

module.exports.default = series(
    parallel( 
        //Definindo a construção de arquivos como fluxo paralelo
        series(appHTML, appCSS, appJS, appIMG),
        series(depsCSS, depsFonts)
    ),
    //Depois segue o fluxo em série
    servidor,
    monitorarArquivos

)
