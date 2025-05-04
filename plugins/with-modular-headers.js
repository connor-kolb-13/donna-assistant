const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

module.exports = function withModularHeaders(config) {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const podfilePath = path.join(
        config.modRequest.projectRoot,
        "ios",
        "Podfile"
      );

      if (!fs.existsSync(podfilePath)) {
        throw new Error(
          "Podfile not found. Has the native iOS project been prebuilt?"
        );
      }

      let contents = fs.readFileSync(podfilePath, "utf8");

      if (!contents.includes("use_modular_headers!")) {
        contents = contents.replace(
          "require_relative",
          "use_modular_headers!\n\nrequire_relative"
        );
        console.log("[withModularHeaders] Injected global modular headers.");
      }

      if (!contents.includes("pod 'GoogleUtilities'")) {
        contents = contents.replace(
          /target '.*' do/,
          (match) =>
            `${match}\n  pod 'GoogleUtilities', :modular_headers => true`
        );
        console.log(
          "[withModularHeaders] Forced modular headers for GoogleUtilities."
        );
      }

      fs.writeFileSync(podfilePath, contents);
      return config;
    },
  ]);
};
