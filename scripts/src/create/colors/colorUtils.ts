import chalk from "chalk";
import { ColorPreset, ColorScheme } from "../../shared/types";
import chroma from "chroma-js";

const SHADE_SCALE = [
  { shade: 300, lightness: 0.84, chroma: 0.07 },
  { shade: 500, lightness: 0.74, chroma: 0.11 },
  { shade: 700, lightness: 0.64, chroma: 0.15 },
];

const BASE_SHADE = SHADE_SCALE.find(s => s.shade === 500)!;


export const previewColorScheme = (colors: ColorScheme) => {
  console.log("\nYour color scheme preview:");
  Object.values(colors).forEach((color) => {
    console.log(getColorPreview(color));
  });
  console.log();
};

export const getColorPreview = ({ name, hue, preview }: ColorPreset) => {
  const variants = SHADE_SCALE.map(
    ({ shade, lightness, chroma: chromaValue }) => {
      const hex = generateColor(hue, lightness, chromaValue);
      return chalk.hex(hex)(preview);
    }
  ).join(" ");

  return `${name}: ${variants}`;
};

export const generateColor = (
  hue: number,
  lightness: number,
  chromaValue: number
): string => {
  const SATURATION_BOOST = 1.5;
  return chroma.lch(
    lightness * 100, 
    chromaValue * 100 * SATURATION_BOOST,
    hue
  ).hex();
};

export const hueToHex = (hue: number, shade: number = 500): string => {
  const shadeConfig =
    SHADE_SCALE.find((s) => s.shade === shade) || SHADE_SCALE[5];
  return generateColor(hue, shadeConfig.lightness, shadeConfig.chroma);
};

export const hexToHue = (hex: string): number => {
  // Normalize the input color to match 500 shade characteristics
  const normalized = chroma(hex)
    .luminance(BASE_SHADE.lightness)
    .lch();
  return normalized[2]; // Return the hue component
}

export const getShades = (hue: number): string[] => {
  return SHADE_SCALE.map(({ lightness, chroma }) =>
    generateColor(hue, lightness, chroma)
  );
};
