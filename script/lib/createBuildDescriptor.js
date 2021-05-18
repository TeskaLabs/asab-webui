const fs = require("fs");
const { exec } = require("child_process");

function createBuildDescriptor(config) {
    let yarnLockContent = fs.readFileSync("yarn.lock");

    let dir = "dist/";

    if (config["dirs"] && config["dirs"]["dist"]) {
        dir = config["dirs"]["dist"];
        if (!dir.endsWith("/")) dir += "/";
    }

    fs.writeFile(dir + "yarn.lock", yarnLockContent, err => {
        if (err) throw err;
        console.log("yarn.lock descriptor has been created");
    })

    exec("git describe --abbrev=7 --tags --dirty=+dirty --always", (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            fs.writeFile(dir + "version.txt", stderr, err => {
                if (err) throw err;
                console.log("version.txt descriptor has been created with errors");
            })
        } else {
            fs.writeFile(dir + "version.txt", stdout, err => {
                if (err) throw err;
                console.log("version.txt descriptor has been created");
            })
        }
    })
}

module.exports = createBuildDescriptor;
