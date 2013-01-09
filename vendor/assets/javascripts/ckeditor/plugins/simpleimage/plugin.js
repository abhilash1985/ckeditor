/**
 * Basic sample plugin inserting current date and time into CKEditor editing area.
 */
(function(){
// Register the plugin with the editor.
// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.plugins.html
CKEDITOR.plugins.add( 'simpleimage',
{
	// The plugin initialization logic goes inside this method.
	// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.pluginDefinition.html#init
	init: function( editor )
	{
		// Define an editor command that inserts a timestamp. 
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.editor.html#addCommand
		editor.addCommand( 'insertImage',
			{
				// Define a function that will be fired when the command is executed.
				// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.commandDefinition.html#exec
				exec : function( editor )
				{    
					var timestamp = new Date();
					// Insert the timestamp into the document.
					// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.editor.html#insertHtml
					editor.insertHtml( 'The current date and time is: <em>' + timestamp.toString() + '</em>' );
				}
			});
		// Create a toolbar button that executes the plugin command. 
		// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.html#addButton
		editor.ui.addButton( 'Simple Image',
		{
			// Toolbar button tooltip.
			label: 'Insert Image',
			// Reference to the plugin command name.
			command: 'insertImage',
			// Button's icon file path.
			icon: this.path + 'images/timestamp.png'
		} );
	}
} 

)();
