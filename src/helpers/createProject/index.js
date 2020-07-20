const unlinkCssFile = require("../unlinkCssFile");
const cssToScss = require("../cssToScss");
const success = require("../logs/success");
const path = require("path");
const packagePath = path.join(process.cwd(), "package.json");
const paths = require("../paths");
const fs = require("fs-extra");

module.exports = async (answers) => {
  const { name, scss, styled, storybook, context, svgr, router } = answers;
  try {
    await fs.copy("lib/react/default", "");
    const myPackage = await JSON.parse(fs.readFileSync(packagePath));
    myPackage.name = name;

    if (router) {
      await fs.copy("lib/react/router", "");
      myPackage.dependencies["react-router-dom"] = "5.2.0";
    }
    if (styled) {
      await fs.copy("lib/react/styled/default", "");
      myPackage.dependencies = {
        ...myPackage.dependencies,
        "styled-components": "5.1.1",
      };
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
    if (context) {
      await fs.copy("lib/react/store/default", "");
      if (styled) {
        await fs.copy("lib/react/styled/store", "");
        if (router) {
          await fs.copy("lib/react/styled/store-router", "");
        } else if (!router) {
          if (storybook) {
            await fs.copy("lib/react/styled/storybook-store", "");
          }
        }
        if (storybook) {
          await fs.copy("lib/react/styled/storybook-store", "");
        }
      } else if (!styled) {
        if (storybook) {
          await fs.copy("lib/react/storybook/store", "");
        }
        if (router) {
          await fs.copy("lib/react/store/router", "");
        }
      }
    } else if (!context) {
      if (styled) {
        if (storybook) {
          await fs.copy("lib/react/styled/storybook", "");
        }
        if (router) {
          await fs.copy("lib/react/styled/router", "");
        }
      }
    }

    if (svgr) {
      await fs.copy("lib/react/svgr", "");
      myPackage.scripts["icon"] =
        'svgr public/static/svgs -d src/components/icons --icon --replace-attr-values "#fff=currentColor"';
      myPackage.devDependencies = {
        ...myPackage.devDependencies,
        "@svgr/cli": "5.4.0",
      };
    }

    if (scss) {
      await fs.copy("lib/react/scss", "");
      myPackage.dependencies["node-sass"] = "4.14.1";
      if (storybook) {
        await fs.copy("lib/react/storybook/scss", "");
      }

      unlinkCssFile("");
      await cssToScss(paths);
      await fs.writeFile(packagePath, JSON.stringify(myPackage, null, 4));
    }
    success();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
