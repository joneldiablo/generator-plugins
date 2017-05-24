'use strict';
//copiar archivos de configuracion los que inician con punto, averiguar como colocar el nombre del plugin en los archivos
//reemplazar todos los textos template por el nombre del nuevo plugin
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

function camelCase(string) {
    return string.replace(/[\.-]([a-z])/ig, function(all, letter) {
        return letter.toUpperCase();
    });
}
module.exports = Generator.extend({
    prompting: function() {
        var pathName = process.cwd().substr(process.cwd().lastIndexOf("\\") + 1)
            // Have Yeoman greet the user.
        this.log(yosay(
            'jquery plugins template generator v1.1!'
        ));
        var prompts = [{
            type: 'text',
            name: 'projectName',
            message: 'Project name',
            default: pathName
        }, {
            type: 'text',
            name: 'pluginName',
            message: 'Plugin name, camel case is automatic',
            default: camelCase(pathName)
        }];
        return this.prompt(prompts).then(function(props) {
            // To access props later use this.props.someAnswer;
            props.pluginName = camelCase(props.pluginName);
            this.props = props;
        }.bind(this));
    },
    writing: function() {
        this.fs.copyTpl(
            this.templatePath("demo/index.html"),
            this.destinationPath("demo/index.html"), {
                pluginName: this.props.pluginName,
                projectName: this.props.projectName
            }
        );
        this.fs.copy(
            this.templatePath("src/DB.json"),
            this.destinationPath("src/DB.json")
        );
        this.fs.copy(
            this.templatePath("src/DB_routes.json"),
            this.destinationPath("src/DB_routes.json")
        );
        this.fs.copy(
            this.templatePath("src/template.css"),
            this.destinationPath("src/" + this.props.projectName + ".css")
        );
        this.fs.copyTpl(
            this.templatePath("src/template.js"),
            this.destinationPath("src/" + this.props.projectName + ".js"), {
                pluginName: this.props.pluginName
            }
        );
        this.fs.copyTpl( //se usa para reemplazar textos
            this.templatePath("_bower.json"),
            this.destinationPath("bower.json"), {
                projectName: this.props.projectName
            }
        );
        this.fs.copy(
            this.templatePath("_Gruntfile.js"),
            this.destinationPath("Gruntfile.js")
        );
        this.fs.copyTpl(
            this.templatePath("_karma.conf.js"),
            this.destinationPath("karma.conf.js"), {
                projectName: this.props.projectName
            }
        );
        this.fs.copyTpl(
            this.templatePath("_package.json"),
            this.destinationPath("package.json"), {
                projectName: this.props.projectName
            }
        );
        this.fs.copy(
            this.templatePath("_.editorconfig"),
            this.destinationPath(".editorconfig")
        );
        this.fs.copy(
            this.templatePath("_.jscsrc"),
            this.destinationPath(".jscsrc")
        );
        this.fs.copy(
            this.templatePath("_.jshintrc"),
            this.destinationPath(".jshintrc")
        );
        this.fs.copy(
            this.templatePath("_.npmignore"),
            this.destinationPath(".npmignore")
        );
    },
    install: function() {
        this.installDependencies();
    },
    end: function() {
        this.log('you can give and get help using $.' + this.props.pluginName + '("help");');
    },
});