// Creating a new Bruhost app
import { input, select } from "@inquirer/prompts";
import { theme } from "../shared/theme";
import ora from "ora";
import { addAppId } from "../db/management";
import { setupColors } from "./colors/setupColors";

export const createApp = async (): Promise<void> => {
  console.log(
    theme.style.message("\n\n------ Creating a new Project ------\n\n", "idle")
  );

  const appId = await input({
    message: "Enter your app ID:",
    validate: (value) => {
      if (!value) {
        return "Please enter your app ID";
      }
      return true;
    },
    theme: theme,
  });
  if (process.env.NODE_ENV === "development") {
    console.log(theme.style.message(`Your app ID is ${appId}`, "done"));
  } else {
    const spinner = ora("Adding App ID...").start();
    await addAppId(appId);
    spinner.succeed(`${appId} app created successfully`);
  }

  const setupType = (await select({
    message: "Choose setup type:",
    choices: [
      {
        name: "Guided setup",
        value: "guided",
        description: "Step by step guided setup process",
      },
      {
        name: "Manual setup",
        value: "manual",
        description: "Configure everything manually",
      },
    ],
  })) as "guided" | "manual";

  if (setupType === "guided") {
    // Add guided setup logic here
    console.log(theme.style.answer("Setting up your guided app setup!"));
    console.log(theme.style.error("Nothing else coded!"));
  } else if (setupType === "manual") {
    console.log(theme.style.answer("Express Setup Enabled!"));
    // Add manual setup logic here
    console.log(theme.style.error("Nothing else coded!"));
  }

  const selectedColors = await setupColors();

  process.exit(0);

  // Add logic to create the app
};
