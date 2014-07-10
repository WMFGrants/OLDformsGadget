/*  ______________________________________________________________________________________
 * |                                                                                     |
 * |                    === WARNING: GADGET FILE ===                                     |
 * |                  Changes to this page affect many users.                            |
 * | Please discuss changes on the talk page or on [[MediaWiki_talk:Gadgets-definition]] |
 * |	 before editing.                                                                 |
 * |_____________________________________________________________________________________|
 *
 * "Forms" feature, to be used by the Wikimedia Foundation's Grants Programme
 */
//<nowiki>
importStylesheet('User:Jeph_paul/formsGadget.css');
var formsGadget = {
	'that' : this,
	'createDialog' : function(){
		var that = this;
		this.dialog = $('<div id="formsDialog"></div>').dialog({
							dialogClass: 'formsGadget',
							autoOpen: false,
							title: that.formDict.config['dialog-title'],
							width: '495px',
							modal: true,
							closeOnEscape: true,
							resizable: false,
							draggable: false,
						});	
	},
	'dialog' : null,
	'openDialog' : function () {
		if (this.dialog === null){
			this.createDialog();
		}
		else{
			this.dialog.dialog('open');
		}
	},
	'utilities' : {
		'configPath' : 'User:Jeph_paul/formsGadgetConfig',
		'grantType' : function(config){
			var grant = mw.config.get('wgTitle').split('/')[0].replace(/ /g,'_');
			if (grant in config){
				return config[grant];
			}
			else{
				return config['default'];
			}
		},
		/*
	 	 * To detect the users default language
		 */
		'userLanguage' : function(){
			return mw.config.get('wgUserLanguage');
		},
		/*
		 * To detect the language of the page
		 */
		'contentLanguage' : function(){
			return mw.config.get('wgContentLanguage');
		},
		/*
		 * To remove extra spaces & cleanup the comment string
		 */
		'cleanupText' : function(text){
				text = $.trim(text)+' ';
				var indexOf = text.indexOf('~~~~');
				if ( indexOf == -1 ){
					return text;
				}
				else{
					return text.slice(0,indexOf)+text.slice(indexOf+4);
				}	
		},
		/*
		 * The config files which can be translated with the help of the 
		 * translation tool generates the dict with the values having a 
		 * lot of space in the key value pairs. This function strips the 
		 * whitespace.
		 */
		'stripWhiteSpace' : function(dict){
			for (key in dict){
				dict[key] = typeof(dict[key]) == 'object' ? this.stripWhiteSpace(dict[key]) : $.trim(dict[key]);
			}
			return dict;
		}
	},
	'formElement' : {
		/*
		 * Elements being supported
		 * Small textbox
		 * Large textbox
		 * Checkbox list
		 * Radio button list
		 * Stepper list
		 * Image/s
		 */
		'hiddenInfoboxFields' : [],
		'found' : false,
		'defaultTextBoxConfig': {
			'type': 'smallTextBox',
			'placeholder': 'Enter the text',
			'title': 'Textbox',
			'characterLength':100,
			'mandatory':false,
			'error-messageLength': 'Max length reached',
			'error-notFilled': 'Mandatory field',
			'value': '',
			'parent': ''
		},
		'checkTitle' : function(string,exists){
			var that = this;
			var apiUrl = 'https://meta.wikimedia.org/w/api.php?callback=?';
			var title = this.formDict.config['page-home'] + string;
			var searchDict = {
					'action':'query',
					'format':'json',
					'titles':title,
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
		},
		'inputList': function(type,list,title,dict){
		 	var div = document.createElement('div');
			div = this.addText(div,title,'title');
			for (elem in list){
				var label = document.createElement('div');
				var checkbox = document.createElement('input');
				var key = list[elem]['key'];
				var value = list[elem][value];
				checkbox.type = type;
				
				checkbox.value = value;
				checkbox.setAttribute('data-add-to',dict['add-to']);
				checkbox.className = 'inputListItem';
				
				checkbox.setAttribute('data-add-to-attribute',key);
				var descriptionText = key.replace(/_/g,' ');
				descriptionText = descriptionText.slice(0,1).toUpperCase() + descriptionText.slice(1);
				var description = document.createElement('span');
				description.className = 'inputListItemDescription';
				description.textContent = descriptionText;
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
	 		if (type == 'large'){
	 			var input = document.createElement('textarea');
	 		}
	 		else{
	 			var input = document.createElement('input');
	 		}
	 		//var api = new mw.Api();
	 		//cleanup
	 		if(dict['visibility'] == 'hidden'){
	 			div.style['display'] = 'none';
	 			input.value = dict['value'];
	 		}
	 		//Cleanup
	 		if('page-title' in dict){
	 			input.setAttribute('page-title',true);
	 		}
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
	 			if( 'validate' in dict && enteredString){
	 				var exists = dict['validate'] == 'exists' ? 1:0;
	 				//$(this).addClass(checkTitle(enteredString,exists));
	 				$.when(that.checkTitle(enteredString,exists)).then(function(){
	 				$(this).addClass(that.found ? 'stringNotSatisfying' : 'stringSatisfying');
	 					if (that.found){
	 						$('#formsDialog [elemType="button"]').trigger('enableButtons');
		 					if(typeof(callback) === 'function' && that.found){
		 						var apiUrl = 'https://meta.wikimedia.org/w/api.php?callback=?';
		 						$.getJSON(apiUrl,{'action':'parse',
		 									'format':'json',
		 									'text':'[['+enteredString+']]'
		 								},function(data){
		 									console.log(data['parse']['text']['*']); 
		 									var src = $('<div>').html(data['parse']['text']['*']).find('img').attr('src');
		 									if(src){
		 										callback(element,'https:'+src);
		 									}
		 									});
		 					}
	 					}
	 					else{
	 						$('#formsDialog [elemType="button"]').trigger('disableButtons');
	 					} 
	 				});
	 			}
	 			//Cleanup & trigger event for limit reached
	 			$(this).removeClass('mandatoryClass');
	 			if ($(this).val().length > config['characterLength']){
	 				//$('#formsDialog [elemType="button"]').trigger('disableButtons');
	 				$(this).val($(this).val().substring(0,config['characterLength']));
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
	 					//$('#formsDialog [elemType="button"]').trigger('enableButtons');
	 				}
	 			}
	 		});
	 		div.appendChild(input);
	 		this.addText(div,config['error-messageLength'],'error');
			return div;
		},
		'smallTextBox': function (dict,callback,element) {
			return this.textBox(dict,'small',callback,element);
		},
		'largeTextBox': function (dict,callback,element) {
			return this.textBox(dict,'large',callback,element);
		},
		'checkboxList': function (dict) {
			var list = dict['choiceList'];
			var hidden = dict['hidden'];
			this.hiddenInfoboxFields = this.hiddenInfoboxFields.concat(dict['hidden']);
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
			container.appendChild(textHolder);
			return container;
		},
		'stepperList': function (dict) {
			var list = dict['choiceList'];
			this.hiddenInfoboxFields = this.hiddenInfoboxFields.concat(dict['hidden']);
			return this.inputList('number',list,dict['title'],dict);
		},
		'image': function (dict) {
			var url = dict['url'];
			var text = dict['title'];
			dict['add-to'] = 'infobox';
	  		dict['infobox-param'] = 'image';
	  		dict['validate'] = 'exists';
	  		//cleanup
	  		dict['placeholder'] = 'placeholder' in dict ? dict['placeholder'] : 'File:Test.png';
			var div = document.createElement('div');
			this.addText(div,dict['title'],'title');
			for (key in dict){
				if(key.indexOf('text') != -1){
					this.addText(div,dict[key],'text');
				}
			}
			var img = document.createElement('img');
			img.src = url;
			dict['title'] = dict['textbox-title'];
			var textbox = this.smallTextBox(dict,function(elem,src){
				img.src = src;
			},img);
			var description = document.createTextNode(text);
			div.appendChild(img);
			//div.appendChild(description);
			div.appendChild(textbox);
			return div;
		},
		'button': function(type,text){
			var a = document.createElement('input');
			a.type='submit';
			a.setAttribute('elemType','button');
			//a.href = '#';
			if(type == 'cancel'){
				a.className = 'mw-ui-button cancel mw-ui-quiet';
			}
			else if (type == 'next'){
				a.className = 'mw-ui-button mw-ui-constructive';
			}
			else {
				a.className = 'mw-ui-button mw-ui-constructive';
			}
			a.value = text;
			$(a).on('disableButtons',function(){
				$(this).attr('disabled',true);
			});
			$(a).on('enableButtons',function(){
				$(this).attr('disabled',false);
			});
			return a;
		},
		'cancelButton': function(dict){
			var button = this.button('cancel',dict['title']);
			button.onclick = function(){
				formsGadget.dialog.dialog('close');
			};
			return button;
		},
		'doneButton': function(dict){ 
			var that = this;
			var button = this.button('done',dict['title']);
			button.onclick = function(){
				that.validateForm();
			};
			return button;
		},
		'nextButton': function(dict){
			var button = this.button('next',dict['title']);
			var that = this;
			button.onclick = function(){
				$('#formsDialog [step]').hide();
				$('#'+ dict['step']).next().show();
			};
			return button;
		},
		'backButton': function(dict){
			var button = this.button('back',dict['title']);
			var that = this;
			button.onclick = function(){
				$('#formsDialog [step]').hide();
				$('#'+dict['step']).prev().show();
			};
			return button;
		},
		'validateForm': function(){
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
			//Add mandatory filed Event & styling
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
				this.createWikiPage();
			}
		},
		'createWikiPage' :  function(){
			var infobox = '';
			var page = '';
			var api = new mw.Api();
			var pageTitle = $('#formsDialog [page-title]').val();
			
			$('#formsDialog [data-add-to]').each(function(index,elem){
				var elem = $(elem);
				if(elem.attr('data-add-to') == 'section' ){
					//var value = elem.val() ? elem.val() : '';
					var section = '==' + elem.attr('data-add-to-attribute') + '==' + '\n' + elem.val() + '\n';
					page = page + section;
				}
				else{
					//Cleanup & Simplify
					var value = parseInt(elem.val()) || parseInt(elem.val()) == 0 ? parseInt(elem.val()) : null;
					if (typeof(value) == 'number'){
						for (var i=0;i<value; i++){
							infobox = infobox + '|'+ elem.attr('data-add-to-attribute') + i + '=\n';
						}	
					}else if(elem.attr('type') == 'checkbox' && elem.attr('checked')){
							infobox = infobox + '|'+ elem.attr('data-add-to-attribute') + '=' + elem.val() + '\n';
					}
					else{
						infobox = infobox + '|'+ elem.attr('data-add-to-attribute') + '=' + elem.val() + '\n';
					}
				}
			});
			/*
			* infobox entries
			*/
			for(entry in this.hiddenInfoboxFields){
				infobox = infobox + '|' + entry['key'] + '=' + entry['value'] + '\n';
			}
			//infobox = infobox.join('');
			var probox = this.formDict.config['infobox'] ? this.formDict.config['infobox'] : 'Probox/Idealab';
			infobox = '{{' + probox + '\n' + infobox + '}} \n';
			page = infobox + page;
			
			/*
			 * Creating a new page
			 *
			 */
			var title = formsGadget.formDict['config']['page-home'] + pageTitle;
			api.post({
						'action': 'edit',
						//Cleanup
						'title': title,
						'summary': 'Creating a test grant',
						'text': page,
						'watchlist':'watch',
						token: mw.user.tokens.get('editToken')
					}).then(function () {
						console.log('Successfully created new page');
						//Cleanup
						formsGadget.dialog.dialog('close');
						window.location.href = location.origin + '/wiki/' + title;
					});
			console.log(page);
		}
	},
	'createForm' : function(formDict){
		//cleanup fixing the fallbacks
		if( !formDict.config['page-home'].match(/\/$/) ){
			formDict.config['page-home'] = formDict.config['page-home'] + '/';
		} 
		this.formDict = formDict;
		this.formElement.formDict = formDict;
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
					panel.appendChild(this.formElement[elemDict.type](elemDict));			
				}
				dialogInternal.appendChild(panel);
			}
		}
		$('#formsDialog').append(dialogInternal);
		return true;
	},
	'tree' : function(){
		var rootList = {};
		var nodeList = {};
		this.page = '';
		this.roots = rootList;
		var node = function(parent,child,id){
			this.parent = parent;
			this.id = id;
			this.child = child;
		};
		var getNode = function(id){
			if (id in nodeList){
				return nodeList[id];
			}
			else{
				var Node = new node(null,null,id);
				nodeList[id] = Node;
				rootList[id] = Node;
				return Node;
			}
		};
		this.addLink = function(startId,endId){
			if (endId){
				var startNode = getNode(startId);
				var endNode = getNode(endId);
				endNode.parent = startNode;
				if (startNode.child){
					startNode.child.push(endNode);
				}
				else{
					startNode.child = [endNode];
				}
				delete rootList[endNode.id]; 
			}
			else{
				getNode(startId);
			}
		};
		var sectionLevel = function(indent){
			var string = '';
			for (var i=0;i<indent;i++){
				string = string + '=';
			}
			return string;
		};
		this.traverse = function(rootList,level,callback){
			if(!rootList){
				return;
			}
			level++;
			var wikiSection = sectionLevel(level);
			for (elem in rootList){
				var root = rootList[elem];
				var line = wikiSection + root.id + wikiSection + '\n';
				this.page = this.page + line;
				root = root.child;
				this.traverse(root,level);
			}
		};
	}
};

mw.loader.using( ['jquery.ui.dialog', 'mediawiki.api', 'mediawiki.ui','jquery.chosen'], function() {	
	$(function() {
		(function(){
			var namespace = mw.config.get('wgCanonicalNamespace');
			if(mw.config.get('wgPageContentLanguage') == 'en'){
				var api = new mw.Api();
				var utility = formsGadget.utilities;
				var configFullPath = utility.configPath+'/'+utility.contentLanguage();
				api.get({'action':'query','titles':configFullPath,'format':'json'}).then(function(data){	
					for (id in data.query.page){
							if (id == -1){
								configFullPath = util.configPath+'/en';
							}
					}
						var configUrl = 'https://meta.wikimedia.org/w/index.php?title='+configFullPath+'&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400';
						//Get the config for the detected language
				$.when(jQuery.getScript(configUrl)).then(function(){
					var config = utility.stripWhiteSpace(utility.grantType(formsGadgetConfig));
					formsGadget['formDict'] = config;
					formsGadget.openDialog();
					formsGadget.createForm(config);
					$('.wp-formsGadget-button').click(function(e){
													e.preventDefault();
													formsGadget.openDialog();
												});
				});
				});
			}
			else{
					$('.wp-formsGadget-button').hide();
				}
		})();
	});
});
			
/*
 * Notes
 * Default values for all textboxes/ input elements
 * 
 */
//</nowiki>
/*
 * Todo
 * 1.) Default value for image 
 * 2.) Styling for Mandatory field, Limit reached, Exists/ Does not exist
 * 3.) Write test cases
 * 4.) Dropdowns
 * 5.) Cleanup the dialog when closed & opened.
 * 6.) Fix the nowiki ~~~~ in hidden field timestamp
 */