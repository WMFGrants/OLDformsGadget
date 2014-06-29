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

var formsGadget = {
	'that' : this,
	'createDialog' : function(){
		$('<div id="formsDialog"></div>').dialog({
							dialogClass: 'formsGadget',
							autoOpen: true,
							title: 'Form',
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
	'formElement' : {
		'found' : false,
		'defaultTextBoxConfig': {
			'type': 'smallTextBox',
			'placeholder': 'Enter the text',
			'title': 'Textbox',
			'characterLength':100,
			'mandatory':false,
			'error-messageLength': 'Max length reached',
			'error-notFilled': 'Mandatory field'
		},
		'checkTitle' : function(string,exists){
			var that = this;
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
		},
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
	 			$(this).removeClass('mandatoryClass');
	 			if ($(this).val().length > config['characterLength']){
	 				$('#formsDialog [elemType="button"]').trigger('disableButtons');
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
	 					$('#formsDialog [elemType="button"]').trigger('enableButtons');
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
				dialog.dialog('close');
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
			var probox = '';
			var page = '';
			var api = new mw.Api();
			var pageTitle = $('#formsDialog [infobox-param="project"]').val();
			
			$('#formsDialog [data-add-to]').each(function(index,elem){
				var elem = $(elem);
				if(elem.attr('data-add-to') == 'section' ){
					var section = '==' + elem.attr('data-add-to-attribute') + '==' + '\n' + elem.val() + '\n';
					page = page + section;
				}
				else{
					var number = parseInt(elem.val()) ? parseInt(elem.val()) : null;
					if (number){
						for (var i =0;i<number; i++){
							probox = probox + '|'+ elem.attr('data-add-to-attribute') + '=\n';
						}	
					}else{
						probox = probox + '|'+ elem.attr('data-add-to-attribute') + '=' + elem.val() + '\n';
					}
				}
			});
			/*
			*
			* Probox entries
			*/
			probox = probox + '| more_participants = Yes \n';
			probox = probox + '| status =  withdrawn  \n';
			//probox = probox.join('');
			probox = '{{Probox/Idealab \n' + probox + '}} \n';
			page = probox + page;
			
			/*
			 * Creating a new page
			 *
			 */
			api.post({
						'action': 'edit',
						'title': 'Grants:IEG/Test/' + pageTitle,
						'summary': 'Creating a test grant',
						'text': page,
						'watchlist':'watch',
						token: mw.user.tokens.get('editToken')
					}).then(function () {
						console.log('Successfully created new page');
					});
			
			console.log(page);
		}
	},
	'createForm' : function(formDict){
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
	} 
};

  	/*
  	 * Validate all mandatory fields are
  	 * filled.
  	 */
formsGadget.createDialog();
formsGadget.createForm(form['default']);

//$('#formData').text(JSON.stringify(form,undefined,2)).width(400).height(400).css('overflow','scroll');
};
/*
 * Notes
 * Default values for all textboxes/ input elements
 * 
 */