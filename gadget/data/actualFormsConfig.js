/*
 * Mirros the dict on meta
 */
  var formsGadgetConfig = {
  		'default':{
  			'config': {
  					'post-edit': 'Thank You for commenting',
  					'new-page': true,
  					'namespace': 'Grants',
  					'portal-page': '',
  					'page-template': '',
  					'infobox': 'Probox/IEG',
  					'talkpage-template': '',
                    'page-home':  'Grants:IEG/Test/'
  			},
  			'step-1':{
  					'projectNameTextbox': {
  							'type': 'smallTextBox',
  							'placeholder': "<translate>
                                                                        <!--T:1-->
Title</translate>",
  							'title': "<translate>
                                                                 <!--T:2-->
Enter the project title</translate>",
  							'characterLength':100,
  							'mandatory':true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'infobox',
  							'infobox-param':'project',
  							'validate': 'doesNotExists',
                            'page-title':true
  						},
  					'projectSummaryTextbox': {
  							'type': 'largeTextBox',
  							'placeholder': 'Click here to add summary',
  							'title': 'Tell us about your idea in a sentence or two',
  							'characterLength':400,
  							'section': 'Summary',
  							'mandatory': true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'section',
  							'section-header': 'Summary'
  						},
  					'projectProblemSolvedTextbox': {
  							'type': 'largeTextBox',
  							'placeholder': 'Click here to add summary',
  							'title': 'What are you trying to solve?',
  							'characterLength':400,
  							'section': 'Problem Solved',
  							'mandatory': false,
  							'add-to': 'section',
  							'section-header': 'Problems Solved'
  						},
  					'cancelButton':{
  							'type': 'cancelButton',
  							'title':'Cancel'
  						},
  					'nextButton':{
  							'type':'nextButton',
  							'title':'Next'
  						},
  				},
  				'step-2':{
  					'roleSelectionList':{
  							'title': 'Would you like to invite others?',
  							'type': 'stepperList',
  							'roles': 'community_organizer,volunteer,designer,developer,project_manager,researcher',
  							'add-to': 'infobox',
  							'infobox-param': 'list'
  						},
  					'projectImage':{
  							'type': 'image',
  							'title': 'Select an image for your project',
			'url':"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Persian_Cat_%28kitten%29.jpg/205px-Persian_Cat_%28kitten%29.jpg",
							'add-to': 'infobox',
							'infobox-param': 'image',
							'validate': true
  						},
  					'cancelButton':{
  							'type': 'cancelButton',
  							'title':'Cancel'
  						},
					'backButton':{
  							'type':'backButton',
  							'title':'Back'
  						},
  					'nextButton':{
  							'type':'doneButton',
  							'title':'Done'
  						},
  				}
  			},
  		'Learning_patterns':{
  			'config': {
  					'post-edit': 'Thank You for creating a pattern',
  					'new-page': true,
  					'namespace': 'Grants',
  					'portal-page': '',
  					'page-template': '',
  					'infobox': 'Probox/Patterns',
  					'talkpage-template': '',
                    'page-home':  'Grants:Learning_patterns/test/'
  			},
  			'step-1':{
  					'projectNameTextbox': {
  							'type': 'smallTextBox',
  							'placeholder': "Title",
  							'title': "Enter the pattern title",
  							'characterLength':100,
  							'mandatory':true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'infobox',
  							'infobox-param':'pattern',
  							'validate': 'doesNotExists',
                            'page-title':true
  						},
  					'projectSummaryTextbox': {
  							'type': 'largeTextBox',
  							'placeholder': 'Click here to add summary of the problem',
  							'title': 'Describe the problem in a sentence or two',
  							'characterLength':200,
  							'mandatory': true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'infobox',
  							'infobox-param':'problem',
  						},
  					'projectProblemSolvedTextbox': {
  							'type': 'largeTextBox',
  							'placeholder': 'Click here to add summary of the solution',
  							'title': 'Describe the solution in a sentence or two',
  							'characterLength':200,
  							'mandatory': true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'infobox',
  							'infobox-param':'solution',
  						},  						
  					'cancelButton':{
  							'type': 'cancelButton',
  							'title':'Cancel'
  						},
  					'nextButton':{
  							'type':'nextButton',
  							'title':'Next'
  						},
  				},
  				'step-2':{
  					'roleSelectionList':{
  							'title': 'What type of pattern is this?',
  							'type': 'stepperList',
  							'roles': 'gender_gap,surveys,events,online_engagement,',
  							'add-to': 'infobox',
  							'infobox-param': 'pattern_type'
  						},
  					'projectImage':{
  							'type': 'image',
  							'title': 'Select an image for your project',
			'url':"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Persian_Cat_%28kitten%29.jpg/205px-Persian_Cat_%28kitten%29.jpg",
							'add-to': 'infobox',
							'infobox-param': 'image',
							'validate': true
  						},
  					'cancelButton':{
  							'type': 'cancelButton',
  							'title':'Cancel'
  						},
					'backButton':{
  							'type':'backButton',
  							'title':'Back'
  						},
  					'nextButton':{
  							'type':'doneButton',
  							'title':'Done'
  						},
  				}
  			},
  		'TPS':{
  			'config': {
  					'post-edit': 'Thank You for submitting your request',
  					'new-page': true,
  					'namespace': 'Grants',
  					'portal-page': '',
  					'page-template': '',
  					'infobox': 'Probox/TPS',
  					'talkpage-template': '',
                    'page-home':  'Grants:TPS/Test/'
  			},
  			'step-1':{
  					'eventTitleTextbox': {
  							'type': 'smallTextBox',
  							'placeholder': "Request title",
  							'title': "Enter the request title",
  							'characterLength':100,
  							'mandatory':true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'infobox',
  							'infobox-param':'event',
  							'validate': 'doesNotExists',
                            'page-title': true
  						},
  					'requesterNameTextbox': {
  							'type': 'smallTextBox',
  							'placeholder': "Requester",
  							'title': "Enter your username",
  							'characterLength':100,
  							'mandatory':true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'infobox',
  							'infobox-param':'requester',
  						},   
  					'requesterCountryTextbox': {
  							'type': 'smallTextBox',
  							'placeholder': "example: USA",
  							'title': "Enter your country where you live",
  							'characterLength':100,
  							'mandatory':true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'infobox',
  							'infobox-param':'country',
  						},   	
  					'requestAmountTextbox': {
  							'type': 'smallTextBox',
  							'placeholder': "price in USD",
  							'title': "Enter the amount you are requesting",
  							'characterLength':100,
  							'mandatory':true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'infobox',
  							'infobox-param':'amount',
  						},   	  						  												 										
  					'cancelButton':{
  							'type': 'cancelButton',
  							'title':'Cancel'
  						},
  					'nextButton':{
  							'type':'nextButton',
  							'title':'Next'
  						},
  				},
  				'step-2':{
  					'eventLocationTextbox': {
  							'type': 'smallTextBox',
  							'placeholder': "Event location",
  							'title': "Enter the event location",
  							'characterLength':100,
  							'mandatory':true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'infobox',
  							'infobox-param':'location',
  						},   				
  					'eventDateTextbox': {
  							'type': 'smallTextBox',
  							'placeholder': "example: July 14 2014",
  							'title': "Enter the date(s) of the event",
  							'characterLength':100,
  							'mandatory':true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'infobox',
  							'infobox-param':'dates',
  						},   	  
  					'eventWebsiteTextbox': {
  							'type': 'smallTextBox',
  							'placeholder': "e.g http://meta.wikimedia.org",
  							'title': "Enter the website",
  							'characterLength':100,
  							'mandatory':true,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'infobox',
  							'infobox-param':'website',
  						}, 
  					'projectSummaryTextbox': {
  							'type': 'largeTextBox',
  							'placeholder': 'Click here to add summary of the event',
  							'title': 'Tell us about your event in a sentence or two',
  							'characterLength':400,
  							'section': 'Summary',
  							'mandatory': false,
  							'error-messageLength': 'Max length reached',
  							'error-notFilled': 'Mandatory field',
  							'add-to': 'section',
  							'section-header': 'Summary'
  						},	  						  	    						
  					'cancelButton':{
  							'type': 'cancelButton',
  							'title':'Cancel'
  						},
					'backButton':{
  							'type':'backButton',
  							'title':'Back'
  						},
  					'nextButton':{
  							'type':'doneButton',
  							'title':'Done'
  						},
  				}
  			}		  					
  	};
