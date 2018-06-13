var grunt = require("grunt");
grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    'create-windows-installer': {
        x64: {
            appDirectory: './titan-proxy-win32-x64',
            authors: 'yeoman',
            exe: 'titan-proxy.exe',
            description:"Titan Proxy.",
        }
    }
})

grunt.loadNpmTasks('grunt-electron-installer');
grunt.registerTask('default', ['create-windows-installer']);
