"use strict";

var gulp = require("gulp");

//SASS
var sass = require("gulp-sass");

gulp.task("sass", function() {
  //here sass is the task name
  return gulp
    .src("./sass/*.scss")
    .pipe(sass().on("error", sass.logError)) //if any error occurs
    .pipe(gulp.dest("./css")); //if no error occurs
}); // the above code is a task runner code.  it will take the "sass" in the first line replace the src with our foldername

// gulp.task("sass:watch", function() {
//   gulp.watch("./sass/**/*.scss", ["sass"]);
// });

//minifying CSS

var uglifycss = require("gulp-uglifycss");

gulp.task("css", function() {
  gulp
    .src("./css/*.css") //always change the folder name as ours
    .pipe(
      uglifycss({
        // maxLineLen: 80,
        uglyComments: true
      })
    )
    .pipe(gulp.dest("./dist/")); //dist is the folder in which the minified file saves
});

//jQuery

var jquery = require("gulp-jquery");
gulp.task("jquery", function() {
  return gulp
    .src("./node_modules/jquery/src")
    .pipe(
      jquery({
        flags: [
          "-deprecated",
          "-event/alias",
          "-ajax/script",
          "-ajax/jsonp",
          "-exports/global"
        ]
      })
    )
    .pipe(gulp.dest("./public/vendor/"));
  // creates ./public/vendor/jquery.custom.js
});

//to make everything automatic (ie, to exclude the extra steps of running gulp sass or gulp css on everytime we make a change)
gulp.task("run", [("sass", "css", "jquery")]); //we can use any name for the task, i used the name 'run' here

//this is the real code for that
gulp.task("watch", function() {
  //this is the watch function
  gulp.watch("./sass/*.scss", ["sass"]); //when ever a change in the watch file occurs(see the src path), it will run the task sass and same theory works for the css too
  gulp.watch("./css/*.css)", ["css"]);
});

//the default task (it will invoke every other task)
gulp.task("default", ["run", "watch"]);
