module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      all: ['test/**/*.html']
    },
    copy: {
      all: {
        files: [{
                expand: 'true',
                cwd: 'src',
                src: '*',
                dest: 'temp',
                ext: '.min.js',
                extDot: 'last',
                filter: 'isFile',
               /* rename: function(dist, src){
                  
                  return "dist.js"
                },
                flatten: true*/
        }]
      },
    },
    transport: {
      options: {
        idleading: 'util/<%= pkg.version%>/',
        debug: false
      },
      all: {
        files: [{
                expand: 'true',
                cwd: 'src',
                src: '**/*',
                dest: 'dist',
                extDot: 'last',
                filter: 'isFile'
        },{
                expand: 'true',
                cwd: 'temp',
                src: '**/*',
                dest: 'dist',
                filter: 'isFile'
        }]
      }
    },
    uglify: {
      all: {
        files: {
          'dist/util.cmd.min.js': ['dist/util.cmd.min.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  
  grunt.registerTask('default', ['copy','transport','uglify']);

};