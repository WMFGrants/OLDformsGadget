window.onload = function(){
/*
 * Elements being supported
 * Small textbox
 * Large textbox
 * Checkbox list
 * Radio button list
 * Stepper list
 * Image/s
 */
var dialog = $('<div id="formsDialog"></div>').dialog({
							dialogClass: 'formsGadget',
							autoOpen: true,
							title: 'Form',
							width: '495px',
							modal: true,
							closeOnEscape: true,
							resizable: false,
							draggable: false,
						});
var utility = function(){
	this.found;
	var that = this;
	this.checkTitle = function(string,exists){
		/*
		var apiUrl = 'https://meta.wikimedia.org/w/api.php?callback=?';
		var searchDict = {
				'action':'opensearch',
				'format':'json',
				'search':string,
				'namespace':0,
				'suggest':'',
				'limit':5
			};
		*/
		var apiUrl = 'https://meta.wikimedia.org/w/api.php?callback=?';
		var searchDict = {
				'action':'query',
				'format':'json',
				'titles':string,
				'prop':'imageinfo'
			};
			return $.getJSON(apiUrl,searchDict,function(data){
				var query = data['query'];
				var pages = data['query']['pages'];
				var pageId = Object.keys(pages);
				var pageExists = pageId != -1 ? true : false;
				var imageExists = pages[pageId]['imagerepository'] ? true : false;
				that.found = !( ( pageExists ^ imageExists ) ^ exists );
			});
			/*
		return $.getJSON(apiUrl,searchDict,function(data){
			console.log(data);
				 // Not of XOR 
				 
			this.stringValidatedClass = !(data[1].length ^ exists) ? 'stringNotSatisfying' : 'stringSatisfying';
			
		});
		*/
		
	};
};
var formElement = {
	'defaultTextBoxConfig': {
		'type': 'smallTextBox',
		'placeholder': 'Enter the text',
		'title': 'Textbox',
		'characterLength':100,
		'mandatory':false,
		'error-messageLength': 'Max length reached',
		'error-notFilled': 'Mandatory field'
	},
	'utility': new utility(),
	'inputList': function(type,list,title,dict){
		var div = document.createElement('div');
		div = this.addText(div,title,'title');
		for (elem in list){
			var label = document.createElement('div');
			var checkbox = document.createElement('input');
			checkbox.type = type;
			checkbox.value = type == 'number' ? 0 : list[elem];
			checkbox.setAttribute('data-add-to',dict['add-to']);
			var conditionalAttr = dict['add-to'] == 'infobox' ? dict['infobox-param'] : dict['section-header'];
			//checkbox.setAttribute('data-add-to-attribute',conditionalAttr);
			checkbox.setAttribute('data-add-to-attribute',list[elem]);
			var descriptionText = list[elem].replace(/_/g,' ');
			descriptionText = descriptionText.slice(0,1).toUpperCase() + descriptionText.slice(1);
			var description = document.createTextNode(descriptionText);
			label.appendChild(description);
			label.appendChild(checkbox);			
			div.appendChild(label);
		}
		return div;
	},
	'createTextBoxConfig':function(defaultConfig,actualConfig){
		var config = {};
		for (key in defaultConfig){
			actualConfig[key] = key in actualConfig? actualConfig[key] : defaultConfig[key];
		}
		return actualConfig;
	},
	'textBox': function(dict,type,callback,element){
		var config = this.createTextBoxConfig(this.defaultTextBoxConfig,dict);
 		var className  = type == 'small'? 'smallTextBox': 'largeTextBox';
 		var div = document.createElement('div');
 		div = this.addText(div,config['title'],'title');
 		var input = document.createElement('input');
 		//var api = new mw.Api();
 		input.setAttribute('type','textbox');
 		input.setAttribute('class',className);
 		input.setAttribute('placeholder',config['placeholder']);
 		input.setAttribute('data-character-length',config['characterLength']);
 		input.setAttribute('data-mandatory',config['mandatory']);
 		input.setAttribute('data-add-to',config['add-to']);
 		var conditionalAttr = config['add-to'] == 'infobox' ? config['infobox-param'] : config['section-header'];
 		input.setAttribute('data-add-to-attribute',conditionalAttr);
		var that = this;
 		/* Word limit */
 		$(input).on('change keyup paste',function(){
 			/* Checking if link/file/page exists */
 			var enteredString = $(this).val();
 			if( 'validate' in dict){
 				var exists = dict['validate'] == 'exists' ? 1:0;
 				//$(this).addClass(checkTitle(enteredString,exists));
 				$.when(that.utility.checkTitle(enteredString,exists)).then(function(){
 					$(this).addClass(that.utility.found ? 'stringNotSatisfying' : 'stringSatisfying');
 					if(typeof(callback) === 'function' && that.utility.found){
 						var apiUrl = 'https://meta.wikimedia.org/w/api.php?callback=?';
 						$.getJSON({'action':'parse',
 									'format':'json',
 									'text':'[['+enteredString+']]'
 								}, apiUrl,function(data){
 									console.log(data['parse']['text']['*']); 
 									var src = $('<div>').html(data['parse']['text']['*']).find('img').attr('src');
 									callback(element,'https:'+src);
 									});
 						
 					} 
 				});
 			}
 			$(this).removeClass('mandatoryClass');
 			if ($(this).val().length > config['characterLength']){
 				$('#formsDialog [elemType="button"]').trigger('characterLimitCrossed');
 				$(this).val() = $(this).substring(0,config['characterLength']);
 			}
 			else{
 				var flag = 0;
 				$('#formsDialog [type="textbox"]').each(function(){
 					var elem = $(this);
 					if (elem.val().length > elem.attr('data-character-length')){
 						flag++;
 					}
 				});
 				if(!flag){
 					$('#formsDialog [elemType="button"]').trigger('characterLimitOk');
 				}
 			}
 		});
 		div.appendChild(input);
 		div.appendChild(this.addText(div,config['error-messageLength'],'error'));
		return div;
	},
	'smallTextBox': function (dict,callback,element) {
		return this.textBox(dict,'small',callback,element);
	},
	'largeTextBox': function (dict,callback,element) {
		return this.textBox(dict,'large',callback,element);
	},
	'checkboxList': function (dict) {
		var list = dict['roles'].split(',');
		return this.inputList('checkbox',list,dict['title'],dict);
	}, 
	'addText': function(container,text,type){
		var textHolder = document.createElement('p');
		textHolder.innerText = text;
		if (type == 'title'){
			textHolder.className = '';
		}
		else{
			textHolder.className = '';
			textHolder.style['display'] = 'none';
		}
		return container.appendChild(textHolder);
	},
	'stepperList': function (dict) {
		var list = dict['roles'].split(',');
		return this.inputList('number',list,dict['title'],dict);
	},
	'image': function (dict) {
		var url = dict['url'];
		var text = dict['title'];
		dict['add-to'] = 'infobox';
  		dict['infobox-param'] = 'image';
  		dict['validate'] = 'exists';
		var div = document.createElement('div');
		var img = document.createElement('img');
		img.src = url;
		var textbox = this.smallTextBox(dict,function(elem,src){
			img.src = src;
		},img);
		var description = document.createTextNode(text);
		div.appendChild(img);
		div.appendChild(description);
		div.appendChild(textbox);
		return div;
	},
	'button': function(type,text){
		var a = document.createElement('a');
		a.setAttribute('elemType','button');
		a.href = '#';
		if(type == 'cancel'){
			a.className = 'mw-ui-button cancel mw-ui-quiet';
		}
		else if (type == 'next'){
			a.className = 'mw-ui-button mw-ui-constructive';
		}
		else {
			a.className = 'mw-ui-button mw-ui-constructive';
		}
		a.innerText = text;
		$(a).on('characterLimitCrossed',function(){
			$(this).attr('disabled',true);
		});
		$(a).on('characterLimitOk',function(){
			$(this).attr('disabled',false);
		});
		return a;
	},
	'cancelButton': function(dict){
		var button = this.button('cancel',dict['title']);
		button.onclick = function(){
			dialog.dialog('close');
		};
		return button;
	},
	'doneButton': function(dict){ 
		var button = this.button('done',dict['title']);
		button.onclick = function(){
			var counter = 0;
			var firstElem;
			$('[data-mandatory="true"]').each(function(){
				var elem = $(this);
				if(!elem.val()){
					if (counter == 0){
						firstElem = elem;
					}
					counter++;
					elem.addClass('mandatoryInput');
				}
			});
			if(firstElem){
				$('#formsDialog [step]').hide();
				while(true){
					if (firstElem.attr('step')){
						firstElem.show();
						break;
					}
					firstElem = firstElem.parent();
				}
			}
			else{
				createWikiPage();
			}
		};
		return button;
	},
	'nextButton': function(dict){
		var button = this.button('next',dict['title']);
		button.onclick = function(){
			$('#formsDialog [step]').hide();
			$('#'+ dict['step']).next().show();
		};
		return button;
	},
	'backButton': function(dict){
		var button = this.button('back',dict['title']);
		button.onclick = function(){
			$('#formsDialog [step]').hide();
			$('#'+dict['step']).prev().show();
		};
		return button;
	}
};


  	/*
  	 * Validate all mandatory fields are
  	 * filled.
  	 */
var validateForm = function(){
	$('[data-mandatory="true"]').each(function(){
		var counter = 0;
		var firstElem;
		var elem = $(this);
		if(!elem.val()){
			if (counter == 0){
				firstElem = elem;
			}
			counter++;
			elem.addClass('mandatoryInput');
		}
	});
	if(firstElem){
		$('#formsDialog [step]').hide();
		while(true){
			if (elem.attr('step')){
				elem.show();
			}
			elem = elem.parent();
		}
	}
};

var createForm = function(formDict){
	var dialogInternal = document.createElement('div');
	var counter = 0;
	for (step in formDict){
		if (step != 'config'){
			counter++;
			var stepDict = formDict[step];
			var panel = document.createElement('div');
			panel.id = step;
			if(counter != 1){
				panel.style['display'] = 'none';
			}
			panel.setAttribute('step',step);
			for (elem in stepDict){
				elemDict = stepDict[elem];
				elemDict['elem'] = elem;
				elemDict['step'] = step;
				panel.appendChild(formElement[elemDict.type](elemDict));			
			}
			dialogInternal.appendChild(panel);
		}
	}
	$('#formsDialog').append(dialogInternal);
	return true;
};	
var createWikiPage = function(){
	var probox = [];
	var page = '';
	$('#formsDialog [data-add-to]').each(function(index,elem){
		var elem = $(elem);
		if(elem.attr('data-add-to') == 'section' ){
			var section = '==' + elem.attr('data-add-to-attribute') + '==' + '\n' + elem.val() + '\n';
			page = page + section;
		}
		else{
			probox[index] = '|'+ elem.attr('data-add-to-attribute') + '=' + elem.val() + '\n';
		}
	});
	probox = probox.join('');
	probox = '{{Probox/Idealab \n' + probox + '}} \n';
	page = probox + page;
	
	/*
	 * Creating a new page
	 */
	/*
	api.post({
							'action': 'edit',
							'title': 'User:Jeph_paul/ApiTest',
							'summary': 'Creating a new page',
							'text': 'jfjfjgfjgfjgjhg',
							'watchlist':'watch',
							token: mw.user.tokens.get('editToken')
						}).then(function () {
								console.log('Successfully created new page');
						});
	*/
	console.log(page);
};
createForm(form['default']);

$('#formData').text(JSON.stringify(form,undefined,2)).width(400).height(400).css('overflow','scroll');
};
/*
 * Notes
 * Default values for all textboxes/ input elements
 * 
 */