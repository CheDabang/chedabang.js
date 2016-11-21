/*
* @Author: chedabang
* @Date:   2016-11-21 23:06:48
* @Last Modified by:   chedabang
*/
'use strict';
var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');
	
gulp.task('dabang',function(){
	gulp.src('js/chedabang.js')
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('js'))
})
