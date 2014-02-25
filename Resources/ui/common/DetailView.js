//FirstView Component Constructor
function FirstView(args, parent) {
	
	var title = args.title;
	var text = args.text;
	var key = args.key;
	var filePath = args.filePath;
	
	var self = Ti.UI.createView({
		top: (Ti.App.iOS7) ? 20 : 0,
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});
	
	var labelHeadLine = Ti.UI.createLabel({
		top: 5,
		color:'#999',
		text: 'NoteCryption',
		font: {fontSize:'30sp', fontWeight:'bold'},
		center: {x: '50%'},
		height: 40,
		width: Ti.UI.SIZE
	});
	self.add(labelHeadLine);
	
	var titleFieldContainer = Ti.UI.createView({
		top: 55,
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		backgroundColor: '#dedede',
		zIndex: 2
	});
	var titleField = Ti.UI.createTextField({
		width: Ti.UI.FILL,
		height: (Ti.App.isAndroid) ? 40 : 30,
		color: '#fff',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		textAlign: 'left',
		hintText: L('enterTitle'),
		autocapitalization: false,
		autocorrect: false,
		value: title,
		font: {fontSize: '20sp'},
		ellipsize: true,
		backgroundColor: '#883AC23F',
	});
	titleFieldContainer.add(titleField);
	self.add(titleFieldContainer);
	
	var scrollView = Ti.UI.createScrollView({
		backgroundColor: '#dedede',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		bottom: 40,
		top: (Ti.App.isAndroid) ? 90 : 80
	});
	self.add(scrollView);
	
	var textArea = Ti.UI.createTextArea({
		hintText: L('enterText'),
		value: ( text ) ? Ti.App.Blowfish.decrypt( text, key ) : '',
		textAlign: 'left',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: 10,
		bottom: 5,
		left: 5,
		right: 5,
		backgroundColor: '#fff',
		borderWidth: 0,
		borderRadius: (Ti.App.isAndroid) ? 10 : 5,
		font: {fontSize: '18sp'},
		color: '#000'
	});
	scrollView.add(textArea);
	
	var btnContainer = Ti.UI.createView({
		backgroundColor: '#22dedede',
		bottom: 0,
		width: Ti.UI.FILL,
		height: 40,
	});
	
	var enableDelete = ( filePath ) ? true : false;
	
	// save button
	var lblSave = Ti.UI.createLabel({
		text: L('save'),
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		font: {fontSize: '16sp'},
		color: '#3AC23F',
		left: 0,
		width: ( enableDelete ) ? '33%' : '50%'
	});
	lblSave.addEventListener('click', function () {// @TODO fix saving changes to new file
		Ti.API.log('filePath: '+filePath);
		if ( !filePath ) {
			var file = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), 'entries', 'entry_' + new Date().getTime() + '.json');
		} else {
			var file = Ti.Filesystem.getFile(filePath);
		}
		file.write( JSON.stringify({title: titleField.value, text: Ti.App.Blowfish.encrypt( textArea.value, key )}) );
		parent.shouldClose();
	});
	btnContainer.add(lblSave);
	
	if ( enableDelete ) {
		// delete button
		var lblDelete = Ti.UI.createLabel({
			text: L('delete'),
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			font: {fontSize: '16sp'},
			color: '#EB2A2A',
			center: {x: '50%'},
			width: '34%'
		});
		lblDelete.addEventListener('click', function () {
			var file = Ti.Filesystem.getFile(filePath);
			if ( file.exists() ) {
				file.deleteFile();
			}
			parent.shouldClose();
		});
		btnContainer.add(lblDelete);
	}
	
	// cancel button
	var lblCancel = Ti.UI.createLabel({
		text: L('cancel'),
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		font: {fontSize: '16sp'},
		color: '#000000',
		right: 0,
		width: ( enableDelete ) ? '33%' : '50%'
	});
	lblCancel.addEventListener('click', function () {
		parent.shouldClose();
	});
	btnContainer.add(lblCancel);
	
	self.add(btnContainer);
	
	return self;
}

module.exports = FirstView;
