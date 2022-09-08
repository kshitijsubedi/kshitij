#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import clear from "clear";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import PressToContinuePrompt from "inquirer-press-to-continue";
import open from "open";
import p from "phin";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

let quote = "";
const log = console.log;
const prompt = inquirer.createPromptModule();
inquirer.registerPrompt("press-to-continue", PressToContinuePrompt);

const data = {
  name: chalk.bold.green("Kshitij Subedi"),
  github: chalk.hex("#787878")("https://github.com/kshitijsubedi"),
  website: chalk.hex("#00AB9E")("https://kshitijsubedi.com.np"),
  npx: chalk.green("npx kshitij"),
  labelGitHub: chalk.hex("#9E9E9E").bold("GitHub:"),
  labelWebsite: chalk.hex("#59FFC8").bold("Website:"),
  labelCard: chalk.hex("#FFF976").bold("This card:"),
};

const boxOptions = {
  margin: 1,
  float: "center",
  padding: 1,
  borderStyle: "singleDouble",
  borderColor: "cyan",
  title: "Kshitij Subedi",
  titleAlignment: "center",
  textAlignment: "center",
};

async function card() {
  let box = boxen(
    [
      `${chalk.bold("Hi there! I'm Kshitij")}`,
      `${data.labelGitHub}  ${data.github}`,
      `${data.labelWebsite}  ${data.website}`,
      ``,
      `${data.labelCard}  ${data.npx}`,
      ``,
      `A famous developer once said,
    "${quote}"`,
    ].join("\n"),
    boxOptions
  );
  return log(box);
}

async function question() {
  prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        {
          name: `Toss an ${chalk.bold("email")}?`,
          value: () => {
            open("mailto:2subedikshitij@example.com");
            console.log(
              "\nLooking forward to hearing your message and replying to you!\n"
            );
          },
        },
        {
          name: `Watch my favourite music!`,
          value: () => {
            open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            console.log("\n Got you :)\n");
          },
        },
        {
          name: "Exit",
          value: () => {
            console.log("Good bye, have a nice day!\n");
          },
        },
      ],
    },
  ]).then((answer) => answer.action());
}

async function api() {
  const res = await p({ url: "https://api.devexcus.es", parse: "json" });
  quote = res.body.text;
  return;
}
async function welcome() {
  card();
  const { key: anyKey } = await inquirer.prompt({
    name: "key",
    type: "press-to-continue",
    anyKey: true,
    pressToContinueMessage: "Press any key to exit...",
  });
  await sleep();
  open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  log("Enjoy the music!");
}

clear();
await api();
await welcome();
