//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	var container = Ti.UI.createView({
		top: 10,
		center: {x:'50%'},
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		layout: 'vertical',
		bubbleParent: false
	});
	self.add(container);
	self.addEventListener('singletap', function (e) {
		textAreaKey.blur();
		textAreaText.blur();
	});

	
	var labelHeadLine = Ti.UI.createLabel({
		color:'#999',
		text: 'NoteCryption',
		font: {fontSize:'45sp', fontWeight:'bold'},
		center: {x: '50%'},
		height: 100,
		width: Ti.UI.SIZE
	});
	container.add(labelHeadLine);
	
	var textAreaKey = Ti.UI.createTextField({
		borderWidth: 2,
		borderColor: '#bbb',
		borderRadius: 5,
		color: '#000',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		textAlign: 'center',
		hintText: 'Enter Key',
		value: '',
		width: 200,
		height: 30,
		font: {fontSize: '16sp'}
	});
	container.add(textAreaKey);
	
	var spacer = Ti.UI.createView({
		height: 20
	});
	container.add(spacer);
	
	var textAreaText = Ti.UI.createTextField({
		borderWidth: 2,
		borderColor: '#bbb',
		borderRadius: 5,
		color: '#000',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		textAlign: 'center',
		hintText: 'Enter Text',
		value: '',
		width: 200,
		height: 30,
		font: {fontSize: '16sp'}
	});
	container.add(textAreaText);
	
	var buttonContainer = Ti.UI.createView({
		top: 20,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		center: {x: '50%'},
		layout: 'horizontal'
	});
	container.add(buttonContainer);
	
	var btnEncrypt = Ti.UI.createButton({
		title: 'Encrypt',
		width: 60,
		height: 30,
		font: {fontSize: '16sp'}
	});
	buttonContainer.add(btnEncrypt);
	btnEncrypt.addEventListener('singletap', function (e) {
		var encrypted = encrypt(textAreaText.value, textAreaKey.value);
		alert('encrypted: ' + encrypted);
		textAreaText.value = encrypted;
	});
	var btnDecrypt = Ti.UI.createButton({
		title: 'Decrypt',
		width: 60,
		height: 30,
		font: {fontSize: '16sp'}
	});
	buttonContainer.add(btnDecrypt);
	btnDecrypt.addEventListener('singletap', function (e) {
		var decrypted = decrypt(textAreaText.value, textAreaKey.value);
		alert('decrypted: ' + decrypted);
		textAreaText.value = decrypted;
	});
	
	// use ECB Blowfish plugin @TODO fix trailing zeros
	var Blowfish = require("com.dmrsolutions.blowfish").Blowfish;
	function encrypt(text, key) {
		var bfEnc = new Blowfish(key);
		var encryptedText = bfEnc.encrypt(text);
		return encryptedText;
	}
	
	function decrypt(text, key) {
		var bfDec = new Blowfish(key);
		var decryptedText = bfDec.decrypt(text);
		return decryptedText;
	}
	
	return self;
}

module.exports = FirstView;
