const unlinkCssFile = require("../unlinkCssFile");
const cssToScss = require("../cssToScss");
const success = require("../logs/success");
const path = require("path");
const packagePath = path.join(process.cwd(), "package.json");
const paths = require("../paths");
const fs = require("fs-extra");

module.exports = async (answers) => {
  const { name, scss, styled, storybook, context, svgr } = answers;
  try {
    await fs.copy("lib/react/default", "");
    const myPackage = JSON.parse(fs.readFileSync(packagePath));
    myPackage.name = name;
    context && (await fs.copy("lib/react/store", ""));
    if (styled) {
      await fs.copy("lib/react/styled/default", "");
      myPackage.dependencies = {
        ...myPackage.dependencies,
        "styled-components": "5.1.1",
      };
    }
    if (svgr) {
      await fs.copy("lib/react/svgr", "");
      myPackage.scripts.icon =
        'svgr public/static/svgs -d src/components/icons --icon --replace-attr-values "#fff=currentColor"';
      myPackage.devDependencies["@svgr/cli"] = "5.4.0";
    }
    if (storybook) {
      await fs.copy("lib/react/storybook/default", "");
      myPackage.devDependencies = {
        ...myPackage.devDependencies,
        "@storybook/addon-actions": "5.3.19",
        "@storybook/addon-links": "5.3.19",
        "@storybook/addons": "5.3.19",
        "@storybook/preset-create-react-app": "3.1.4",
        "@storybook/react": "5.3.19",
      };
      myPackage.scripts = {
        ...myPackage.scripts,
        storybook: "start-storybook -p 9009 -s public",
        "build-storybook": "build-storybook -s public",
      };
    }
    storybook && context && (await fs.copy("lib/react/storybook/store", ""));
    styled && context && (await fs.copy("lib/react/styled/store", ""));
    styled && storybook && (await fs.copy("lib/react/styled/storybook", ""));
    styled &&
      storybook &&
      context &&
      (await fs.copy("lib/react/styled/storybook-store", ""));

    if (scss) {
      await fs.copy("lib/react/scss", "");
      myPackage.dependencies["node-sass"] = "4.14.1";

      if (storybook) {
        await fs.copy("lib/react/storybook/scss", "");
      }
      unlinkCssFile("");
      await cssToScss(paths);
      await fs.writeFile(packagePath, JSON.stringify(myPackage, null, 4));
      success();
      process.exit(0);
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
