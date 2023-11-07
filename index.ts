#! /usr/bin/env node
import Currency_Exchange from "./currencys.js";
import inquirer from "inquirer";
import axios from "axios";
import figlet from "figlet";
import chalk from "chalk";
import Animation from "chalk-animation";

async function CurrencyConversions() {
  // Define a type for the currency conversion data
  type DataofCurrencyConversion = {
    ConvertCurrency: string;
    ConvertionCurrency: string;
    ConvertionAmount: number;
  };

  // Animation
  const Animation1 = () =>
    new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
  const Animationtitle = Animation.rainbow("Starting Your Currency Conversion:");
  await Animation1();
  Animationtitle.stop();

  const Title1 = figlet.textSync("Currency Converter!", {
    font: "Slant",
  });
  console.log(chalk.bold(chalk.redBright(Title1)));

  const Animation2 = () =>
    new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
  const Animationtitle1 = Animation.rainbow("Start Converting Your Currency:");
  await Animation2();
  Animationtitle1.stop();

  console.log(
    chalk.bold(
      chalk.greenBright(`

      ___________________________________
      |#######====================#######|
      |#(1)*UNITED STATES OF AMERICA*(1)#|
      |#**          /===\   ********  **#|
      |*# {G}      | (") |             #*|
      |#*  ******  | /v\ |    O N E    *#|
      |#(1)         \===/            (1)#|
      |##=========ONE DOLLAR===========##|
      ------------------------------------

                    
      `)
      )
    );      
  


  const CurrencyExchanger: DataofCurrencyConversion = await inquirer.prompt([
    {
      message: chalk.bold(chalk.hex("#008744")("Select Your Currency To Convert")),
      type: "list",
      name: "ConvertCurrency",
      choices: Currency_Exchange,
    },
    {
      message: chalk.bold(chalk.hex("#008744")("Select Your Conversion Currency")),
      type: "list",
      name: "ConvertionCurrency",
      choices: Currency_Exchange,
    },
    {
      message: chalk.bold(chalk.hex("#ccff66")("Enter Your Conversion Amount")),
      type: "number",
      name: "ConvertionAmount",
    },
  ]);

  const { ConvertCurrency, ConvertionCurrency, ConvertionAmount } = CurrencyExchanger;

  const API_KEY_Data = `https://v6.exchangerate-api.com/v6/0ce23c0056f4be96e118a0b1/latest/${ConvertCurrency}`;

  try {
    const CurrencyConverting = await axios.get(API_KEY_Data);
    const CurrencyAmount = CurrencyConverting.data;
    const LatestRates = CurrencyAmount.conversion_rates;
    const ConvertedRates = LatestRates[ConvertionCurrency];
    const convertedAmount = ConvertionAmount * ConvertedRates;

    if (CurrencyAmount.result === "success" && ConvertedRates !== undefined) {
      console.log(
        chalk.bold(
          chalk.blueBright(
            `${ConvertionAmount} ${ConvertCurrency} To ${ConvertionCurrency} = (${convertedAmount})`
          )
        )
      );
    } else {
      console.log(chalk.bold(chalk.redBright("Please enter a valid number or currency."))); 
    }
  } catch (error) {
    console.log(chalk.bold(chalk.redBright("An error occurred. Please try again later.")));
  }
}

CurrencyConversions();
