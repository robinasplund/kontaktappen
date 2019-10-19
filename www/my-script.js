
//localStorage.clear();

function createElement(daddyElement, element, innerHTMLString, attribute, attributeName) {
	element = document.createElement(element);
	element.innerHTML = innerHTMLString ? innerHTMLString : '';
	element.setAttribute(attribute, attributeName);
	daddyElement.append(element);
	return element
  }
  
/********** CREATING THE HTML BODY **********/

let body = document.querySelector('body');
let divContainer = createElement(body, 'div', '', 'class', 'div-container');
let header = createElement(divContainer, 'header', '', 'class', 'header');
let logo = createElement(header, 'div', '<img src="./contact-logo.png">', 'class', 'logo');
let heading = createElement(header, 'h2', 'Dat´z kontaktëen liste', 'class', 'heading');
let addContactButton = createElement(header, 'div', '<img src="./add-contact-icon.png">', 'class', 'add-contact-button');
let section = createElement(divContainer, 'section', '', 'class', 'section');
let aside = createElement(divContainer, 'aside', '', 'id', 'aside-container');


/********** LOGIC TO MAKE CONTACT OBJECTS **********/

let arrayOfContacts =[];
let idGenerator = 0;

const contactPrototype ={
	id:'',
	name:'',
	phoneNumbers:[],
	emails:[],
	editVersion:''
}
function createContact(id,name,phoneNumbers,emails,editVersion){
	let newInstance = Object.create(contactPrototype);
	newInstance.id=id;
	newInstance.name=name;
	newInstance.phoneNumbers=phoneNumbers;
	newInstance.emails=emails;
	newInstance.editVersion=editVersion;
	return newInstance;
}
/*
let sven = new createContact(0,'Sven Bertilsson',['046-2118787','0708-180922'],['sven_bertilsson@mail.com'],'0');
arrayOfContacts.push(sven);
let gustav = new createContact(1,'Gustav Bengtsson',['040-127783'],['gustav_b@hotmail.com','gustav99@hotmail.com'],'0');
arrayOfContacts.push(gustav);
let bella = new createContact(2,'Bella Beckström',['040-189923','0706267384'],['bellabella@yahoo.com','bella24@hotmail.com'],'0');
arrayOfContacts.push(bella);
let olle = new createContact(3,'Olle Andersson',['040-134783','0708-183456','0739969500'],['olle@yahoo.com','olle@hotmail.com','olle@gmail.com'],'0');
arrayOfContacts.push(olle);
*/
function sortArrayOfContacts( a, b ) {
	if ( a.name < b.name ){
	  return -1;
	}
	if ( a.name > b.name ){
	  return 1;
	}
	return 0;
  }
   
/********** DISPLAY CONTACTS ARRAY IN THE DOM **********/

function displayContacts(){

	section.innerHTML ='';
	arrayOfContacts.sort(sortArrayOfContacts);
	for (contactItem of arrayOfContacts){

		let contactContainer = createElement(section, 'div', '', 'class', 'contact-container');
		let contactLogo = createElement(contactContainer, 'div', '<img src="./person-logo.png">', 'class', 'contact-logo');
		let removeContactButton = createElement(contactContainer, 'div', '', 'class', 'remove-contact-button');
			removeContactButton.setAttribute('id',contactItem.id);
		let editContactButton = createElement(contactContainer, 'div', '', 'class', 'edit-contact-button');
			editContactButton.setAttribute('id',contactItem.id);
		let contactName = createElement(contactContainer, 'p', contactItem.name, 'class', 'contact-name');		
		let contactUl1 = createElement(contactContainer, 'ul', '', 'class', 'phonenumber-list');
		for(phoneNumber of contactItem.phoneNumbers ){
			let li = createElement(contactUl1, 'li', phoneNumber, 'class', '');
		}
		let contactUl2 = createElement(contactContainer, 'ul', '', 'class', 'email-list');
		for(email of contactItem.emails ){
			let li = createElement(contactUl2, 'li', email, 'class', '');
		}
	}	
}
displayContacts();


/********** REMOVE CONTACTS **********/

window.addEventListener('click', e => {
	if(e.target.closest('.remove-contact-button')){		
		arrayOfContacts=arrayOfContacts.filter(function(item){
			return item.id != e.target.id;
		});
		displayContacts();
	}
});





/********** ADD CONTACTS **********/

//add contact button logic
window.addEventListener('click', e => {
	if(e.target.closest('.add-contact-button')){		
		addContactForm();
	}
});

function addContactForm(){

	document.getElementById("aside-container").style.display = "inline-block";
	document.getElementById("aside-container").innerHTML = "";

	let toolbarName = createElement(aside, 'input', '', 'class', 'toolbar-name');
	toolbarName.setAttribute('type','text');
	toolbarName.setAttribute('placeholder','namn');

	for(let i=0; i<3; i++){
		let toolbarPhone = createElement(aside, 'input', '', 'class', 'toolbar-phone toolbar-phone'+i);
		toolbarPhone.setAttribute('type','text');
		toolbarPhone.setAttribute('placeholder','telefonnummer');
	}
	for(let i=0; i<3; i++){
		let toolbarEmail = createElement(aside, 'input', '', 'class', 'toolbar-email toolbar-email'+i);
		toolbarEmail.setAttribute('type','text');
		toolbarEmail.setAttribute('placeholder','emailadress');
	}
	let toolbarSaveButton = createElement(aside, 'button', 'Spara', 'class', 'toolbar-save-button add-contact-save-button');
	toolbarSaveButton.setAttribute('type','button');
}

// Add-contact save button logic
window.addEventListener('click', e =>{
  if(e.target.closest('.add-contact-save-button')){

		let ContactId = idGenerator; 
		let Name = document.querySelector('.toolbar-name').value;	
		let Phone1 = document.querySelector('.toolbar-phone0').value;		
		let Phone2 = document.querySelector('.toolbar-phone1').value;
		let Phone3 = document.querySelector('.toolbar-phone2').value;
		let Email1 = document.querySelector('.toolbar-email0').value;
		let Email2 = document.querySelector('.toolbar-email1').value;
		let Email3 = document.querySelector('.toolbar-email2').value;
		
		let arrayOfPhonenumbers=[Phone1,Phone2,Phone3];
		let arrayOfPhonenumbers2 = arrayOfPhonenumbers.filter(function(v){return v!==''});
		let arrayOfEmails=[Email1,Email2,Email3];
		let arrayOfEmails2 = arrayOfEmails.filter(function(v){return v!==''});
	
		let newContact = new createContact(ContactId,Name,arrayOfPhonenumbers2,arrayOfEmails2,'0');
		arrayOfContacts.push(newContact); 
		idGenerator++;
		document.getElementById("aside-container").style.display = "none";


				//****************HISTORY STUFF***********/		
			
				let editVersionString =newContact.id+'.'+newContact.editVersion;
				let newContact2 = JSON.stringify(newContact);			
				localStorage.setItem(editVersionString,newContact2);
	
				//localStorage.clear();
				console.log(localStorage);
	
				//************************************** */


		displayContacts(); 		
	}
});






/********** EDIT CONTACTS **********/

let contactToEdit;
let versionCounter =0;
let loadEditsHistory;

window.addEventListener('click', e => {
	if(e.target.closest('.edit-contact-button')){		

		
			
		document.getElementById("aside-container").style.display = "inline-block";
		document.getElementById("aside-container").innerHTML = "";

		contactToEdit =arrayOfContacts.filter(function(object){
			return object.id == e.target.id;
		})[0];

		let toolbarName = createElement(aside, 'input', '', 'class', 'toolbar-name');
		toolbarName.setAttribute('type','text');
		toolbarName.setAttribute('value',contactToEdit.name);

		for(let i=0; i<3; i++){
			let toolbarPhone = createElement(aside, 'input', '', 'class', 'toolbar-phone toolbar-phone'+i);
			toolbarPhone.setAttribute('type','text');
			if (contactToEdit.phoneNumbers[i]) { toolbarPhone.setAttribute('value',contactToEdit.phoneNumbers[i]); }
			else{ toolbarPhone.setAttribute('placeholder','telefonnummer'); }		
		}
		for(let i=0; i<3; i++){
			let toolbarEmail = createElement(aside, 'input', '', 'class', 'toolbar-email toolbar-email'+i);
			toolbarEmail.setAttribute('type','text');
			if (contactToEdit.emails[i]) { toolbarEmail.setAttribute('value',contactToEdit.emails[i]); }
			else{ toolbarEmail.setAttribute('placeholder','emailadress'); }		
		}

		/*alert(contactToEdit.editVersion);*/

		versionCounter= contactToEdit.editVersion;

		editHistoryHtml(versionCounter);	
		}	
});

// BACK AND FORWARD BUTTONS
window.addEventListener('click', e => {
	if(e.target.closest('.toolbar-history-back-button')){	
		document.getElementById("toolbar-history-section").remove();		
		versionCounter--;
		editHistoryHtml(versionCounter);		
	}
});
window.addEventListener('click', e => {
	if(e.target.closest('.toolbar-history-forward-button')){				
			document.getElementById("toolbar-history-section").remove();
			versionCounter++;					
			editHistoryHtml(versionCounter);
	}
});

function editHistoryHtml(versionCounter){
	

			let toolbarHistorySection =createElement(aside, 'div', '', 'id', 'toolbar-history-section');
			loadEditsHistory = JSON.parse(localStorage.getItem(contactToEdit.id+'.'+versionCounter));
			
	/*
			let historyName =createElement(toolbarHistorySection, 'p', loadEditsHistory.name, 'class', 'contact-name');
			let Ul1 = createElement(toolbarHistorySection, 'ul', '', 'class', 'phonenumber-list');
			for(phoneNumber of loadEditsHistory.phoneNumbers){
				let li = createElement(Ul1, 'li', phoneNumber, 'class', 'history-li');
			}
			let Ul2 = createElement(toolbarHistorySection, 'ul', '', 'class', 'email-list');
			for(email of loadEditsHistory.emails){
				let li = createElement(Ul2, 'li', email, 'class', 'history-li');
				console.log(email);
			}		
*/				

		let html = `
				<div id="toolbar-history-section-inner">
					<div class="upload-history-button"></div>
					<p class="contact-name">${loadEditsHistory.name}</p>
					<ul class="phonenumber-list">
					${loadEditsHistory.phoneNumbers.map((num) => `<li>${num}</li>` ).join('')}
					</ul>
					<ul class="email-list">
					${loadEditsHistory.emails.map((num) => `<li>${num}</li>` ).join('')}
					</ul>
				</div>
					<div class="toolbar-history-back-button"></div>
					<div class="toolbar-history-forward-button"></div>
					<button type="button" class="toolbar-save-button edit-contact-save-button">Spara</button>
				`
			let div = document.createElement('div');
			div.innerHTML = html;
			toolbarHistorySection.append(div);

}

// Ladda upp history
window.addEventListener('click', e => {
	if(e.target.closest('.upload-history-button')){				
			//alert('ladda upp');

			document.getElementById("aside-container").innerHTML = "";
			//let loadEditsHistory = JSON.parse(localStorage.getItem(contactToEdit.id+'.'+versionCounter));
			//console.log(loadEditsHistory);

			/*contactToEdit =arrayOfContacts.filter(function(object){
				return object.id == e.target.id;
			})[0];*/
	
			let toolbarName = createElement(aside, 'input', '', 'class', 'toolbar-name');
			toolbarName.setAttribute('type','text');
			toolbarName.setAttribute('value',loadEditsHistory.name);
	
			for(let i=0; i<3; i++){
				let toolbarPhone = createElement(aside, 'input', '', 'class', 'toolbar-phone toolbar-phone'+i);
				toolbarPhone.setAttribute('type','text');
				if (loadEditsHistory.phoneNumbers[i]) { toolbarPhone.setAttribute('value',loadEditsHistory.phoneNumbers[i]); }
				else{ toolbarPhone.setAttribute('placeholder','telefonnummer'); }		
			}
			for(let i=0; i<3; i++){
				let toolbarEmail = createElement(aside, 'input', '', 'class', 'toolbar-email toolbar-email'+i);
				toolbarEmail.setAttribute('type','text');
				if (loadEditsHistory.emails[i]) { toolbarEmail.setAttribute('value',loadEditsHistory.emails[i]); }
				else{ toolbarEmail.setAttribute('placeholder','emailadress'); }		
			}
			let toolbarSaveButton = createElement(aside, 'button', 'Spara', 'class', 'toolbar-save-button edit-contact-save-button');
			toolbarSaveButton.setAttribute('type','button');
	}
});

	//Spara history
	window.addEventListener('click', e => {
		if(e.target.closest('.edit-contact-save-button')){

			//alert('hej');

			let Name = document.querySelector('.toolbar-name').value;	
			let Phone1 = document.querySelector('.toolbar-phone0').value;		
			let Phone2 = document.querySelector('.toolbar-phone1').value;
			let Phone3 = document.querySelector('.toolbar-phone2').value;
			let Email1 = document.querySelector('.toolbar-email0').value;
			let Email2 = document.querySelector('.toolbar-email1').value;
			let Email3 = document.querySelector('.toolbar-email2').value;
			
			let arrayOfPhonenumbers=[Phone1,Phone2,Phone3];
			let arrayOfPhonenumbers2 = arrayOfPhonenumbers.filter(function(v){return v!==''});
			let arrayOfEmails=[Email1,Email2,Email3];
			let arrayOfEmails2 = arrayOfEmails.filter(function(v){return v!==''});

			contactToEdit.editVersion++;
			let editedContact = new createContact(contactToEdit.id,Name,arrayOfPhonenumbers2,arrayOfEmails2,contactToEdit.editVersion);		
			
			let indexOfObject=arrayOfContacts.findIndex(x => x.id === editedContact.id);
			arrayOfContacts.splice(indexOfObject,1,editedContact); 


			//****************HISTORY STUFF***********/		
			let editVersionString = editedContact.id+'.'+editedContact.editVersion;
			let editedContact2 = JSON.stringify(editedContact);			
			localStorage.setItem(editVersionString,editedContact2);

			//localStorage.clear();
			console.log(localStorage);

			//************************************** */


			document.getElementById("aside-container").style.display = "none";
			displayContacts();
		}
	});
























	
