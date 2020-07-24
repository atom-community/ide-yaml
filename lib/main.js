const path = require("path");
const { AutoLanguageClient } = require("atom-languageclient");
class YAMLLanguageClient extends AutoLanguageClient {
  constructor() {
    super();
  }

  // According to yaml-language
  getGrammarScopes() {
    return ["source.yaml"];
  }

  // Should be fixed to YAML which will allow integration with yaml-language.
  getLanguageName() {
    return "YAML";
  }

  // Probably have 0 impact for application.
  getServerName() {
    return "REDHAT-YAML-LANG-SERVER";
  }

  // Connection type actually is fine, but I've seen that VS-Code uses an IPC for communication so maybe it should be considered.
  getConnectionType() {
    return "stdio";
  } // ipc, socket, stdio

  // NOTE: Changing execution to bin doesn't provide any change for files, maybe I'll test it in outline.
  startServerProcess() {
    return super.spawnChildNode([
      // TODO: Replace that with reqiure function istead providing path, that's unsafe method.
      path.join(
        __dirname,
        "../node_modules/yaml-language-server/out/server/src/server.js"
      ),
      "--stdio"
    ]); // --node-ipc, stdio, socket={number}
  }

  // TODO: Provide autocomplete sugesstions, missing documentation on atom-languageclient, so we have to reverse engineer a repository to figure how that shit works.

  // NOTE: I have no idea why this function is needed there.
  preInitialization(connection) {
    connection.onCustom("$/partialResult", () => { }); // Suppress partialResult until the language server honours 'streaming' detection
  }
}

module.exports = new YAMLLanguageClient();
