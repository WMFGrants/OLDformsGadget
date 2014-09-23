//<languages/>
/*  IdeaLab - new idea form wizard configuration file  */
var formsGadgetConfig = {
  			"config":{
  					"post-edit": "<translate>
<!--T:2-->
Thank you for creating your idea! Visit the toolkit page (linked below the infobox) to expand your idea further.</translate>",
  					"new-page": true,
  					"namespace": "Grants",
  					"portal-page": "IdeaLab",
  					"page-template": "",
  					"infobox": "Probox",
  					"talkpage-template": "",
                    "page-home": "Grants:IdeaLab",
                    "dialog-title": "<translate>
<!--T:3-->
Let's create your idea!</translate>",
                    "toolkit-name": "Toolkit",
                    "toolkit-template": "subst:Grants:IdeaLab/Build/Idea_toolkit",
                    "error-not-logged-in": "<translate>
<!--T:4-->
Not logged in.</translate>"
					"edit-comment-prefix": "<translate>
					Created a </translate>",
					"edit-comment-suffix": "<translate>
					Using this tool</translate>"
  			},
  			"step-1":{
  					"projectNameTextbox": {
  							"type": "smallTextBox",
  							"placeholder": "<translate>
<!--T:5-->
What should we call your idea?</translate>",
  							"title": "<translate>
<!--T:6-->
Idea title</translate>",
  							"characterLength":100,
  							"mandatory":true,
  							"add-to": "infobox",
  							"infobox-param":"project",
  							"validate": "doesNotExists",
                            "page-title":true
  						},
  					"projectSummaryTextbox": {
  							"type": "largeTextBox",
  							"placeholder": "<translate>
<!--T:7-->
Briefly summarize your idea in one sentence</translate>",
  							"title": "Summary",
  							"characterLength":300,
  							"mandatory": true,
  							"add-to": "infobox",
  							"infobox-param":"summary",
  						},
  					"projectIdeaSection": {
  							"type": "largeTextBox",
  							"placeholder": "leave this blank!",
  							"title": "<translate>
<!--T:8-->
This is the 'project idea' section header</translate>",
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
  							"title": "<translate>
                                                        <!--T:9-->
This is the 'project idea' section header</translate>",
  							"characterLength":1000,
  							"section": "Goals",
  							"mandatory": "false",
  							"add-to": "section",
                            "visibility": "hidden",
  							"section-header": "Goals",
                            "value": "",
                            "comment": "<!--In this section: briefly explain what are you trying to accomplish with this project, or what do you expect will change as a result of this idea.-->"
  						}, 
  					"getInvolvedSection": {
  							"type": "largeTextBox",
  							"placeholder": "leave this blank!",
  							"title": "<translate>
<!--T:10-->
This is the 'get involved' section header</translate>",
  							"characterLength":1000,
  							"section": "Project idea",
  							"mandatory": "false",
  							"add-to": "section",
                            "visibility": "hidden",
  							"section-header": "Get Involved",
                            "value": "",
                            "comment" :"<!--In this section: volunteers are welcome to join or endorse - using the buttons in the infobox is the easiest way to add yourself to this section!.-->",
  						}, 
                       "participantsSection": {
  							"type": "largeTextBox",
  							"placeholder": "leave this blank!",
  							"title": "<translate>
<!--T:11-->
This is the 'participants' section header</translate>",
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
  							"title": "<translate>
<!--T:12-->
This is the 'endorsements' section header</translate>",
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
  							"title": "<translate>
<!--T:13-->
What is the problem you're trying to solve?</translate>",
  							"characterLength":2000,
  							"section": "What is the problem you're trying to solve?",
  							"mandatory": false,
  							"add-to": "section",
  							"parent" : "projectIdeaSection",
  							"section-header": "What is the problem you're trying to solve?"
  						},
  					"projectSolutionTextbox": {
  							"type": "largeTextBox",
  							"placeholder": "Explain how your idea might address the issue",
  							"title": "<translate>
<!--T:14-->
What is your solution?</translate>",
  							"characterLength":2000,
  							"section": "What is your solution?",
  							"mandatory": false,
  							"add-to": "section",
							"parent" : "projectIdeaSection", 							
  							"section-header": "What is your solution?",
"comment": "{{TOC_right}}",
  						},
                    "nextButton":{
  							"type":"nextButton",
  							"title":"<translate>
<!--T:15-->
Next</translate>"
  						},
  					"cancelButton":{
  							"type": "cancelButton",
  							"title":"<translate>
<!--T:16-->
Cancel</translate>"
  						},
  				},
  				"step-2":{
  					"roleSelectionList":{
  							"title": "<translate>
<!--T:17-->
Optional: Want your idea page to invite people with specific skills to join? Example: to ask for 2 researchers, select the number next to the researcher role below.</translate>",
                            "text-1": "<translate>
<!--T:18-->
If you're not sure yet, just skip this step for now.</translate>",
							"url": "https://meta.wikimedia.org/wiki/Grants:IdeaLab/Roles",
							"link": "Learn more about roles",
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
  					"hiddenPortal": {
                            "type": "smallTextBox",
                            "visibility": "hidden",
                            "add-to": "infobox",
                            "infobox-param": "more_participants",
                            "value": "YES"
					},
					"hiddenMoreParticipats": {
							"type": "smallTextBox",
                            "visibility": "hidden",
                            "add-to": "infobox",
                            "infobox-param": "portal",
                            "value": "IEG"
					},
					"hiddenTranslations":{
							"type": "smallTextBox",
	                        "visibility": "hidden",
	                        "add-to": "infobox",
	                        "infobox-param": "translations",
	                        "value": "Probox/Idealab/Content"
					},
  					"projectImage":{
  							"type": "image",
  							"title": "<translate>
<!--T:19-->
Want a custom image to represent your project?</translate>",
  							"imageTitleBox": "<translate>
<!--T:20-->
To use a different image from Wikimedia Commons, enter 'File:' followed by the filename below</translate>",
                            "text-1": "<translate>
<!--T:21-->
This is the default image that will appear</translate>",
                            "placeholder": "File:IdeaLab_beaker_and_flask.svg",
							"url":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/IdeaLab_beaker_and_flask.svg/200px-IdeaLab_beaker_and_flask.svg.png",
							"add-to": "infobox",
							"infobox-param": "image",
							"validate": true,
                            "link":"<translate>
<!--T:22-->
Search Wikimedia Commons for an image</translate>"
  						},
                    "nextButton":{
  							"type":"doneButton",
  							"title":"<translate>
<!--T:23-->
Create my idea</translate>"
  						},
					"backButton":{
  							"type":"backButton",
  							"title":"<translate>
<!--T:24-->
Back</translate>"
  						},
  				} 
					
  	};
