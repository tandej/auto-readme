import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('auto-readme.createReadme', () => {
        const projectName = path.basename(vscode.workspace.workspaceFolders?.at(0)?.uri.toString() || '');
        const readmeContent = `# ${projectName}`;
        const readmePath = path.join(vscode.workspace.workspaceFolders?.at(0)?.uri.path || '', 'README.md');

		if (fs.existsSync(readmePath)) {
            vscode.window.showInformationMessage(`README.md already exists`);
            return;
        }
		
        fs.writeFileSync(readmePath, readmeContent);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
