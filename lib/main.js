import { AutoLanguageClient } from "atom-languageclient";

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
    return "RedHat YAML Language Server";
  }

  // Starts languageserver
  startServerProcess() {
    return super.spawnChildNode([
      require.resolve("yaml-language-server/bin/yaml-language-server")
    ]);
  }

  // TODO: Autocompletion based on YAML schema provided in $schema key.
  AutocompleteAdapter() {}

  // TODO: Settings in Atom packages
}

module.exports = new YAMLLanguageClient();
