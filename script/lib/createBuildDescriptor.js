const fs = require("fs");

function createBuildDescriptor(config) {
    let yarnLockContent = fs.readFileSync("yarn.lock");

    let dir = "dist/";

    if (config["dirs"] && config["dirs"]["dist"]) {
        dir = config["dirs"]["dist"];
        if (!dir.endsWith("/")) dir += "/";
    }

    fs.writeFile(dir + "app_descriptor.lock", yarnLockContent, (err) => {
        if (err) throw err;
        console.log("Build descriptor has been created");
    })
}

module.exports = createBuildDescriptor;