#!/usr/bin/env node
import ora from 'ora';
import { input, select  } from '@inquirer/prompts';
import { createApp } from './create';
import { authenticate } from './auth';
import { theme } from './shared/theme';

const spinner = ora('Creating new Bruhost app...').start();

async function init() {
  try {
      // Test if spinner works
      spinner.succeed('Successfully initialized Bruhost');

      const tokenId = await authenticate()

      // Get initial action
      const action = await select({
        message: 'What would you like to do?',
        choices: [
          {
            name: 'Create a new app',
            value: 'create',
            description: 'Create a new Bruhost application'
          },
          {
            name: 'Update an old app',
            value: 'update',
            description: 'Update an existing Bruhost application'
          },
        ],
        theme: theme
      });

      if (action == 'update') {
        console.log('App Updating is pending implementation, sorry.');
        return
      } else if (action == 'create') {
        
        createApp();
        return
      }

  } catch (error) {
    spinner.fail('Operation failed');
    console.error(theme.style.error(`\n${error.message}`));
    process.exit(1);
  }
}

init();