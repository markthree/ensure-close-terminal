import * as vscode from 'vscode';
import * as child_process from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.executeCommand('setContext', 'extension.isVSCodeClosing', false);
  vscode.commands.registerCommand('workbench.action.quit', () => {
    vscode.commands.executeCommand('setContext', 'extension.isVSCodeClosing', true);
    vscode.commands.executeCommand('workbench.action.closeAllEditors').then(() => {
      const terminals = vscode.window.terminals;
      terminals.forEach((terminal) => {
        child_process.exec(`echo '' | kill -SIGINT ${terminal.processId}`);
      });
      vscode.commands.executeCommand('workbench.action.quit');
    });
  });
}
