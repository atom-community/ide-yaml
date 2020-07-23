const path = require("path");
const { AutoLanguageClient } = require("atom-languageclient");

// Class that stands for extension
class YAMLLanguageClient extends AutoLanguageClient {
  constructor() {
    super();
  }

  // ?
  getGrammarScopes() {
    return ["source.yaml"];
  }

  // Provides language name for Atom
  getLanguageName() {
    return "YAML";
  }

  // Provides language server name for languageclient
  getServerName() {
    return "REDHAT-YAML-LANG-SERVER";
  }

  // Connection type
  getConnectionType() {
    return "stdio";
  }

  // Starts languageserver
  startServerProcess() {
    return super.spawnChildNode([
      path.join(
        __dirname,
        "../node_modules/yaml-language-server/out/server/src/server.js"
      ),
      "--stdio"
    ]);
  }

  // TODO: Autocompletion based on YAML schema provided in $schema key.

  // idk
  preInitialization(connection) {
    connection.onCustom("$/partialResult", () => {}); // Suppress partialResult until the language server honours 'streaming' detection
  }
}

module.exports = new YAMLLanguageClient();
