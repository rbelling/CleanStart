var dest = "./build";
var src = './src';
var templateData = require('./data/template');
module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  sass: {
    src: src + "/sass/**/*.{sass,scss}",
    dest: dest,
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'images' // Used by the image-url helper
    }
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  markup: {
    src: src + "/htdocs/**",
    dest: dest
  },
  app: {
    breakpoints: {
      small: 767,
      medium: 1024,
      large: 1280 
    }
  },
  templates: {
    baseFolder: src + "/templates/**/*",
    src: src + "/templates/base/",
    dest: src + "/htdocs/",
    templateExtension: '.handlebars',
    myPage: 'index', //the entry point page: this file includes other templates
    templateData: templateData,
    templateOptions : {
        //https://www.npmjs.com/package/gulp-compile-handlebars
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false 
        partials : {
            footer : '<footer>the end</footer>'
        },
        batch : [src + '/templates/partials/'],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    }
  },  
  modernizr: { 
    //complete list of options available at: https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json
    "options": [
      "html5shiv",
      "html5printshiv",
      "mq"
    ],
    "feature-detects": [
      "touchevents",
    ]
  },
  iconFonts: {
    name: 'Gulp Starter Icons',
    src: src + '/icons/*.svg',
    dest: dest + '/fonts',
    sassDest: src + '/sass',
    template: './gulp/tasks/iconFont/template.sass.swig',
    sassOutputName: '_icons.sass',
    fontPath: 'fonts',
    className: 'icon',
    options: {
      fontName: 'Post-Creator-Icons',
      appendCodepoints: true,
      normalize: false
    }
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [
    {
      entries: src + '/javascript/page.js',
      dest: dest,
      outputName: 'page.js',
      // list of modules to make require-able externally
      require: ['jquery'],
      // list of externally available modules to exclude from the bundle
      // external: ['underscore']
    }]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
