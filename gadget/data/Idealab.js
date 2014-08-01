var formsGadgetConfig = {
	"create":{
  			"config":{
  					"post-edit": "Thank you for creating your idea! Visit the toolkit page (linked at the bottom of the infobox) for some next steps to turn your idea into action.",
  					"new-page": true,
  					"namespace": "Grants",
  					"portal-page": "IdeaLab",
  					"page-template": "",
  					"infobox": "Probox",
  					"talkpage-template": "",
                    "page-home": "Grants:IdeaLab/Build",
                    "dialog-title": "Let's create your idea!",
                    "toolkit-name": "Toolkit",
                    "toolkit-template": "subst:Grants:IdeaLab/Build/Idea_toolkit",
                    "error-not-logged-in": "Not logged in."
  			},
  			"step-1":{
  					"projectNameTextbox": {
  							"type": "smallTextBox",
  							"placeholder": "<translate>
                                                                       <!--T:2-->
What should we call your idea?</translate>",
  							"title": "Idea title",
  							"characterLength":100,
  							"mandatory":true,
  							"add-to": "infobox",
  							"infobox-param":"project",
  							"validate": "doesNotExists",
                            "page-title":true
  						},
  					"projectSummaryTextbox": {
  							"type": "largeTextBox",
  							"placeholder": "Briefly summarize your idea in a sentence",
  							"title": "Summary",
  							"characterLength":200,
  							"mandatory": true,
  							"add-to": "infobox",
  							"infobox-param":"summary",
  						},
  					"projectIdeaSection": {
  							"type": "largeTextBox",
  							"placeholder": "leave this blank!",
  							"title": "This is the 'project idea' section header",
  							"characterLength":1000,
  							"section": "Project idea",
  							"mandatory": "false",
  							"add-to": "section",
				            "visibility": "hidden",
					        "section-header": "Project idea"
  						},
                         "projectGoalsSection": {
  							"type": "largeTextBox",
  							"placeholder": "leave this blank!",
  							"title": "This is the 'project goals' section header",
  							"characterLength":1000,
  							"section": "Goals",
  							"mandatory": "false",
  							"add-to": "section",
                            "visibility": "hidden",
  							"section-header": "Goals",
                            "value": "",
                            "comment": "<!--In this section: briefly explain what are you trying to accomplish with this project, or what do you expect will change as a result of this idea.-->__TOC__"
  						}, 
  					"getInvolvedSection": {
  							"type": "largeTextBox",
  							"placeholder": "leave this blank!",
  							"title": "This is the 'get involved' section header",
  							"characterLength":1000,
  							"section": "Project idea",
  							"mandatory": "false",
  							"add-to": "section",
                            "visibility": "hidden",
  							"section-header": "Get Involved",
                            "value": "",
                            "comment" :"<!--In this section: volunteers are welcome to join or endorse.-->",
  						}, 
                       "participantsSection": {
  							"type": "largeTextBox",
  							"placeholder": "leave this blank!",
  							"title": "This is the 'participants' section header",
  							"characterLength":1000,
  							"section": "Participants",
  							"mandatory": "false",
  							"add-to": "section",
                            "visibility": "hidden",
  							"section-header": "Participants",
  							"parent" : "getInvolvedSection",
                            "value": "",
                            "comment": "<!-- Want to join this idea? Add your name by clicking the button in the infobox, or edit this section directly. -->",
  						},    	
                       "endorsementsSection": {
  							"type": "largeTextBox",
  							"placeholder": "leave this blank!",
  							"title": "This is the 'endorsements' section header",
  							"characterLength":1000,
  							"section": "Endorsements",
  							"mandatory": "false",
  							"add-to": "section",
                            "visibility": "hidden",
  							"section-header": "Endorsements",
                            "parent" : "getInvolvedSection",
                            "value": "",
                            "comment": "<!-- Want to endorse this as a good idea? Add your name by clicking the button in the infobox, or edit this section directly. -->"
  						},     												  						
  					"projectProblemSolvedTextbox": {
  							"type": "largeTextBox",
  							"placeholder": "Explain the issue you want to address with this idea",
  							"title": "What is the problem you're trying to solve?",
  							"characterLength":1000,
  							"section": "What is the problem you're trying to solve?",
  							"mandatory": false,
  							"add-to": "section",
  							"parent" : "projectIdeaSection",
  							"section-header": "What is the problem you're trying to solve?"
  						},
  					"projectSolutionTextbox": {
  							"type": "largeTextBox",
  							"placeholder": "Explain how your idea might address the issue",
  							"title": "What is your solution?",
  							"characterLength":1000,
  							"section": "What is your solution?",
  							"mandatory": false,
  							"add-to": "section",
							"parent" : "projectIdeaSection", 							
  							"section-header": "What is your solution?"
  						},
                    "nextButton":{
  							"type":"nextButton",
  							"title":"Next"
  						},
  					"cancelButton":{
  							"type": "cancelButton",
  							"title":"Cancel"
  						},
  				},
  				"step-2":{
  					"roleSelectionList":{
  							"title": "Do you want to ask for any specific types of helpers to join this idea?",
                            "text-1": "If you're not sure yet, we'll just add a volunteer role for now.",
  							"type": "stepperList",
  							"choiceList": [
                                    {
  										"key": "advisor",
  										"value": 0
  									},
  									{
  										"key": "community_organizer",
  										"value": 0
  									},
                                    {
  										"key": "project_manager",
  										"value": 0
  									},
  									{
  										"key": "researcher",
  										"value": 0
  									},
  									{
  										"key": "designer",
  										"value": 0
  									},
  									{
  										"key": "developer",
  										"value": 0
  									},
  							],
  							"hidden": [						
  									{
  										"key": "portal",
  										"value": "Idealab"
  									},
  									{
  										"key": "translations",
  										"value": "Probox/Idealab/Content"
  									},
  									{
  										"key": "more_participants",
  										"value": "YES"
  									}
  							],
  							"add-to": "infobox",
  						},
  					"projectChangeValuesDropdown": {
  							"type": "dropdownList",
  							"placeholder": "Select a status",
  							"title": "Move it to the appropriate Status",
  							"add-to": "infobox",
  							"infobox-param": "status",
  							"values":[
  										"withdrawn",
  										"active",
  										"postponed",
  										"something"
  									]
  						
  					},
  					"projectImage":{
  							"type": "image",
  							"title": "Want a custom image to represent your project?",
  							"imageTitleBox": "To use a different image from Wikimedia Commons, enter the filename below",
                            "text-1": "This is the default image that will appear",
                            "placeholder": "IdeaLab_beaker_and_flask.svg",
							"url":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/IdeaLab_beaker_and_flask.svg/200px-IdeaLab_beaker_and_flask.svg.png",
							"add-to": "infobox",
							"infobox-param": "image",
							"validate": true,
                            "link":"Search Wikimedia Commons for an image"
  						},
                    "nextButton":{
  							"type":"doneButton",
  							"title":"Create my idea"
  						},
					"backButton":{
  							"type":"backButton",
  							"title":"Back"
  						},
  				} 
		},
		"expand":{
			
		}			
  	};