const fs = require("fs-extra");

module.exports = (paths) =>
  paths.forEach(async (path) => {
    if (fs.existsSync(path)) {
      const data = await fs.readFile(path, "utf8");
      var result = data.replace(/.css/g, ".scss");
      await fs.writeFile(path, result, "utf8");
    }
  });
