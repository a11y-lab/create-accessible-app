const chalk = require("chalk");
const commander = require("commander");
const packageInfo = require("../package.json");

const init = async () => {
  const program = new commander.Command(packageInfo.name);

  program
    .version(packageInfo.version)
    .arguments("[project-directory]")
    .usage(`${chalk.white("<project-directory>")}`)
    .action((name) => {
      if (!name) {
        console.error("Please specify the project directory:");
        console.log(
          `  ${program.name()} ${chalk.white("<project-directory>")}`
        );
        console.log();
        console.log("For example:");
        console.log(`  ${program.name()} new-app`);
        process.exit(1);
      }
    });

  await program.parseAsync(process.argv);
};

module.exports = {
  init,
};
