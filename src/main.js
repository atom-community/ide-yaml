const path = require('path')
const { AutoLanguageClient } = require('atom-languageclient')

class HTMLLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return ['source.yaml'] }
  getLanguageName () { return 'YAML' }
  getServerName () { return 'REDHAT-YAML-LANG-SERVER' }
  getConnectionType() { return 'stdio' } // ipc, socket, stdio

  startServerProcess () {
    return super.spawnChildNode([
      path.join(
        __dirname,
        '../node_modules/yaml-language-server/out/server/src/server.js'
      ),
      '--stdio',
    ]) // --node-ipc, stdio, socket={number}
  }

  preInitialization (connection) {
    connection.onCustom('$/partialResult', () => {}) // Suppress partialResult until the language server honours 'streaming' detection
  }
}

module.exports = new HTMLLanguageClient()
