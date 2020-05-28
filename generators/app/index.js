const chalk = require('chalk');

const AppGenerator = require('generator-jhipster/generators/app');

const entandoBlueprintPromptingPhase = require('./phases/prompting');

module.exports = class extends AppGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true , ...opts}); // fromBlueprint variable is important

        this.jhipsterContext = this.options.jhipsterContext;
        const jhContext = this.jhipsterContext;

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints entando')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupEntityOptions(this, jhContext, this);
    }


    get initializing() {
        // initializing - Your initialization methods (checking current project state, getting configs, etc)
        return super._initializing();
    }

    get prompting() {
        // prompting - Where you prompt users for options (where you’d call this.prompt())
        
        // overriding askForApplicationType prompt to skip reactive with Spring WebFlux question
        const { askForApplicationType, ...jhipsterPromptingPhase } = super._prompting();
        
        return { ...entandoBlueprintPromptingPhase, ...jhipsterPromptingPhase };
    }

    get configuring() {
        // configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
        return super._configuring();
    }

    get default() {
        // default - If the method name doesn’t match a priority, it will be pushed to this group.
        return super._default();
    }

    get writing() {
        // writing - Where you write the generator specific files (routes, controllers, etc)
        return super._writing();
    }

    get end() {
        // end - Called last, cleanup, say good bye, etc
        return super._end();
    }
};
