// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from HelloWorld!');
	});

	const provider2 = vscode.languages.registerCompletionItemProvider(
		'embuild',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

			let completeitems: vscode.CompletionItem[] = [];
			const predefnames: string[] = [
				'abstract',
				'module',
				'static',
				'source'
			];
			predefnames.forEach(function (name){
				const smplcomplete = new vscode.CompletionItem(name);
				smplcomplete.insertText = name + ' ';
				completeitems.push(smplcomplete);
			});

			const adnames: string[] = [
				'App',
				'Cmd',
				'AutoCmd',
				'Build',
				'BuildArtifactPath',
				'BuildDepends',
				'DefaultImpl',
				'LinkerSection',
				'AddPrefix',
				'IncludeExport',
				'InitFS',
				'Genereted'
			];
			adnames.forEach(function(name){
				const defname = '@' + name;
				const smplcomplete = new vscode.CompletionItem(defname);
				smplcomplete.insertText = defname + ' ';
				if (name === 'IncludeExport')
				{
					smplcomplete.insertText = new vscode.SnippetString(defname + '(path="${1}")');
					smplcomplete.documentation = new vscode.MarkdownString("Insert path to header");
				}
				else if (name === 'Cmd')
				{
					smplcomplete.insertText = new vscode.SnippetString( defname +
						"(name=\"${1}\", help=\"${2}\", man=\'\'\'\n${3}\n\'\'\')"
					);
					smplcomplete.documentation = new vscode.MarkdownString(
						"You can specify name, help and man"
						);
				}
				completeitems.push(smplcomplete);
			});
			const dependsnames: string[] = [
				'depends',
				'depends @NoRuntime'
			];
			dependsnames.forEach(function (name){
				const smplcomplete = new vscode.CompletionItem(name);
				smplcomplete.insertText = name + ' ';
				completeitems.push(smplcomplete);
			});
			return completeitems;	
			}
		},
		'.' // triggered whenever a '.' is being typed
	);

	context.subscriptions.push(disposable, provider2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
