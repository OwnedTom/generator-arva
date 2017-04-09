var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    prompting() {
        return this.prompt([{
                type: 'input',
                name: 'appName',
                message: "Name:",
                default: this.appname
            },
            {
                type: 'input',
                name: 'version',
                message: 'Version:',
                default: '1.0.0'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Description:',
                default: ''
            },
            {
                type: 'input',
                name: 'author',
                message: 'Author:',
                default: 'Example Smith <example@smith.com> (http://example.com)',
                store: true
            }
        ]).then((answers) => {
            this.appname = answers.appName;
            this.version = answers.version;
            this.description = answers.description;
            const regEx = /^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)/gm;
            let author = regEx.exec(answers.author);
            this.author = {
                name: author[1],
                email: author[2],
                url: author[3],
                str: author[0]
            }
            this.log(author[1] + "," + author[2] + "," + author[3]);
        })
    }
    
    writing() {
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            {
                appName: this.appname,
                version: this.version,
                description: this.description,
                author: this.author
            }
        )
        this.fs.copyTpl(
            this.templatePath('config.xml'),
            this.destinationPath('config.xml'),
            {
                appName: this.appname,
                version: this.version,
                description: this.description,
                author: this.author
            }
        )
        this.fs.copy(
            this.templatePath('res/'),
            this.destinationPath('res/')
        )
        this.fs.copy(
            this.templatePath('scripts/'),
            this.destinationPath('scripts/')
        )
        this.fs.copy(
            this.templatePath('src/'),
            this.destinationPath('src/')
        )
        this.fs.copy(
            this.templatePath('www/'),
            this.destinationPath('www/')
        )
        this.fs.copy(
            this.templatePath('build.json'),
            this.destinationPath('build.json')
        )
        this.fs.copy(
            this.templatePath('config.js'),
            this.destinationPath('config.js')
        )
        this.fs.copy(
            this.templatePath('jspm.config.js'),
            this.destinationPath('jspm.config.js')
        )
        this.fs.copy(
            this.templatePath('LICENSE'),
            this.destinationPath('LICENSE')
        )
        this.fs.copy(
            this.templatePath('README.md'),
            this.destinationPath('README.md')
        )
    }

    install() {
        this.spawnCommandSync('npm', ['install']);
        this.spawnCommandSync('jspm', ['install']);
        
    }
};