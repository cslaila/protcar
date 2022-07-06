const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// automação de compilação do sass
function compileSass() {
  return gulp.src('src/scss/**/*.scss') //seleciona todos os arquivos sass
    .pipe(sass({outputStyle : 'compressed'})) //compila os arquivos sass minificados
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'], //prefixa os arquivos sass para os últimos 2 versões do navegador
        cascade: false //não faz o prefixo para os arquivos sass que não foram modificados
    })) //adiciona prefixos aos arquivos
    .pipe(gulp.dest('dist/css/')) //salva os arquivos em css
    .pipe(browserSync.stream()); //atualiza o navegador assim que atualiza o arquivo
}
gulp.task('sass', compileSass); //executa a tarefa

// automação css para plugins
function pluginsCSS() {
    return gulp
    .src(['src/css/lib/aos.css', 'src/css/lib/swiper.min.css']) //seleciona os arquivos individualmente
    .pipe(concat('plugins.css')) //concatena os arquivos
    .pipe(gulp.dest('dist/css/')) //salva o arquivo em css
    .pipe(browserSync.stream()); //atualiza o navegador assim que atualiza o arquivo
}
gulp.task('pluginscss', pluginsCSS); //executa a tarefa

// automação de concatenação dos arquivos js
function gulpConcat() {
  return gulp.src('src/js/**/*.js') //seleciona todos os arquivos js
    .pipe(concat('script.js')) //concatena os arquivos js em um arquivo
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify()) //minifica o arquivo
    .pipe(gulp.dest('dist/js/')) //salva o arquivo em js
    .pipe(browserSync.stream()); //atualiza o navegador assim que atualiza o arquivo
}
gulp.task('scripts', gulpConcat); //executa a tarefa

// automação js para plugins
function pluginsJS() {
    return gulp
    .src(['src/js/lib/aos.min.js', 'src/js/lib/swiper.min.js']) //seleciona os arquivos individualmente
    .pipe(concat('plugins.js')) //concatena os arquivos
    .pipe(gulp.dest('dist/js/')) //salva o arquivo em js
    .pipe(browserSync.stream()); //atualiza o navegador assim que atualiza o arquivo
}
gulp.task('pluginsjs', pluginsJS);

// automação de atualizaçao do navegador
function browser() {
    browserSync.init({
        server: {
            baseDir: './' //pasta que será monitorada
        }
    });
}
gulp.task('browser-sync', browser); 

// automação do watch
function watch() {
  gulp.watch('src/scss/**/*.scss', compileSass); //monitora os arquivos alterados
  gulp.watch('*.html').on('change', browserSync.reload); //monitora os arquivos html e atualiza o navegador
  gulp.watch('src/js/**/*.js', gulpConcat); //monitora os arquivos alterados
  gulp.watch('src/js/lib/*.js', pluginsJS); //monitora os arquivos alterados
  gulp.watch('src/css/lib/*.css', pluginsCSS); //monitora os arquivos alterados
}
gulp.task('watch', watch);

gulp.task('default', gulp.parallel('sass', 'pluginscss', 'pluginsjs', 'scripts', 'watch', 'browser-sync')); //executa as tarefas em paralelo