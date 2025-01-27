export type Theme = {
    prefix: string | { idle: string; done: string };
    spinner: {
      interval: number;
      frames: string[];
    };
    style: {
      answer: (text: string) => string;
      message: (text: string, status: 'idle' | 'done' | 'loading') => string;
      error: (text: string) => string;
      defaultAnswer: (text: string) => string;
      highlight: (text: string) => string;
    };
  };

  export type Project = {
    created: string
    id: string
    name: string
    deployed: boolean
  }

  /**
   * COLOR SCHEMES
   */


  export type ColorPreset = {
    name: string;
    hue: number;
    preview: string;
  }

  export enum ColorTypes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    TERTIARY = 'tertiary',
    ACCENT = 'accent',
    TEXT = 'text',
    TEXT_LIGHT = 'text-light',
    TEXT_DARK = 'text-dark',
    BACKGROUND = 'background',
    BACKGROUND_ALT = 'background-alt',
    LINK = 'link',
    LINK_HOVER = 'link-hover',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    INFO = 'info',
    HIGHLIGHT = 'highlight'
  }

  export type ColorScheme = { [key in ColorTypes]: ColorPreset }  