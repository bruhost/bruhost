import { input, select } from '@inquirer/prompts';
import { theme } from '../../shared/theme';
import { getColorPreview, hexToHue, previewColorScheme } from './colorUtils';
import { ColorPreset, ColorScheme, ColorTypes } from '../../shared/types';
import chalk from 'chalk';

const colorOptions: ColorPreset[] = [
  { name: 'Blue', hue: 250, preview: '■ Example Text' },
  { name: 'Red', hue: 30, preview: '■ Example Text' },
  { name: 'Green', hue: 142, preview: '■ Example Text' },
  { name: 'Purple', hue: 300, preview: '■ Example Text' },
  { name: 'Orange', hue: 85, preview: '■ Example Text' },
  { name: 'Custom', hue: -1, preview: '?' }
];

const colorScheme1: ColorScheme = {
  [ColorTypes.PRIMARY]: { name: 'Primary', hue: 250, preview: '■ Example Text' },
  [ColorTypes.SECONDARY]: { name: 'Secondary', hue: 180, preview: '■ Example Text' },
  [ColorTypes.TERTIARY]: { name: 'Tertiary', hue: 210, preview: '■ Example Text' },
  [ColorTypes.ACCENT]: { name: 'Accent', hue: 320, preview: '■ Example Text' },
  [ColorTypes.TEXT]: { name: 'Text', hue: 0, preview: '■ Example Text' },
  [ColorTypes.TEXT_LIGHT]: { name: 'Text Light', hue: 0, preview: '■ Example Text' },
  [ColorTypes.TEXT_DARK]: { name: 'Text Dark', hue: 0, preview: '■ Example Text' },
  [ColorTypes.BACKGROUND]: { name: 'Background', hue: 0, preview: '■ Example Text' },
  [ColorTypes.BACKGROUND_ALT]: { name: 'Background Alt', hue: 0, preview: '■ Example Text' },
  [ColorTypes.LINK]: { name: 'Link', hue: 250, preview: '■ Example Text' },
  [ColorTypes.LINK_HOVER]: { name: 'Link Hover', hue: 260, preview: '■ Example Text' },
  [ColorTypes.SUCCESS]: { name: 'Success', hue: 142, preview: '■ Example Text' },
  [ColorTypes.WARNING]: { name: 'Warning', hue: 85, preview: '■ Example Text' },
  [ColorTypes.ERROR]: { name: 'Error', hue: 30, preview: '■ Example Text' },
  [ColorTypes.INFO]: { name: 'Info', hue: 200, preview: '■ Example Text' },
  [ColorTypes.HIGHLIGHT]: { name: 'Highlight', hue: 60, preview: '■ Example Text' }
};

const colorSchemes: Record<string, ColorScheme> = {
  'Default': colorScheme1,
  'Custom': colorScheme1
};

export const setupColors = async () => {
    console.log('\nLet\'s set up your brand colors');
  
    const selectedHue = await select({
      message: 'Choose your primary brand color:',
      choices: Object.keys(colorSchemes).map(scheme => ({
        value: scheme,
        name: `${scheme}`,
        key: scheme.toLowerCase().charAt(0),
      })),
      theme: theme
    });
  
    const colorScheme = selectedHue === 'Custom' ? colorSchemes[selectedHue] : await customColorFlow(colorSchemes[selectedHue])
    
    // Preview the generated scheme
    previewColorScheme(colorScheme);
    
    const confirmed = await select({
      message: 'Are you happy with this color scheme?',
      choices: [
        { name: 'Yes, continue', value: true },
        { name: 'No, let me choose again', value: false }
      ],
      theme: theme
    });
  
    return confirmed ? colorScheme : setupColors();
  }
  
  const customColorFlow = async (colorScheme: ColorScheme): Promise<ColorScheme> => {

    const selectedColor = await select({
      loop: false,
      message: 'Choose a color to customize:',
      choices: [
        ...Object.entries(colorScheme).map(([key, color]) => ({
          value: key,
          name: `${getColorPreview(color)}`,
          description:  theme.style.highlight(`${key}`)
        })),
        {
          value: 'exit',
          name: theme.style.highlight(`Exit and use default colors`)
        }
      ],
      theme: theme
    })

    if (selectedColor === 'exit') {
      return colorScheme
    }
    
    const hexColor = await input({
      message: 'Enter your brand color (hex format, e.g. #FF0000):',
      validate: (value) => {
        if (!/^#[0-9A-F]{6}$/i.test(value)) {
          return 'Please enter a valid hex color (e.g. #FF0000)';
        }
        return true;
      },
      transformer: (value, { isFinal }) => {
        value.toUpperCase()

        if (isFinal) {
          return value
        } else if (/^#[0-9A-F]{6}$/i.test(value)) {
          return chalk.hex(value)(value)
        } else {
          return value
        }
        
      },
    });
    console.log(`Selected type: ${selectedColor}`)
    console.log(`Selected Color: ${hexColor}`)
    
    const hue = hexToHue(hexColor)
    console.log(`Selected hue: ${hue}`)
    const colorPreset: ColorPreset = { name: selectedColor, hue, preview: '■ Example Text' }

    console.log(`Old Scheme: ${getColorPreview(colorScheme[selectedColor])}`)
    console.log(`New Scheme: ${getColorPreview(colorPreset)}`)

    const updatedColorScheme = { ...colorScheme, [selectedColor]: colorPreset }
    return customColorFlow(updatedColorScheme)
  }