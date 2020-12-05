/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.ts can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
export default function plugins(on, config) {
	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config

	on('before:browser:launch', (browser, launchOptions) => {
		if (browser.name === 'electron' && browser.isHeadless) {
			launchOptions.preferences.width = 1280;
			launchOptions.preferences.height = 720;
		}
		return launchOptions;
	});

	addMatchImageSnapshotPlugin(on, config);
}
