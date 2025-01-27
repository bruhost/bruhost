import { Theme } from "./types";

export const theme: Theme = {
    prefix: {
        idle: '?',
        done: '✔'
    },
    spinner: {
        interval: 80,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    },
    style: {
        answer: (text) => `\x1b[36m${text}\x1b[0m`,
        message: (text, status) => {
            switch (status) {
                case 'idle':
                    return `\x1b[1m${text}\x1b[0m`;
                case 'done':
                    return `\x1b[32m${text}\x1b[0m`;
                case 'loading':
                    return `\x1b[90m${text}\x1b[0m`;
            }
        },
        error: (text) => `\x1b[31m${text}\x1b[0m`,
        defaultAnswer: (text) => `\x1b[90m${text}\x1b[0m`,
        highlight: (text) => `\x1b[1m${text}\x1b[0m`
    }
}