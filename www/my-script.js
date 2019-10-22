
localStorage.clear();

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

		let contactToRemove = arrayOfContacts.filter(function(item){
			return item.id == e.target.id;
		});
		for(i=contactToRemove[0].editVersion; i>-1; i--){
			localStorage.removeItem(contactToRemove[0].id+'.'+i);
		}

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

	aside.style.display = "inline-block";
	aside.innerHTML = "";	
	let html = `<div class="toolbar-input-container">
					<div class="toolbar-close-button"></div>
					<input class="toolbar-input toolbar-name" type="text" placeholder="Namn">
					<input class="toolbar-input toolbar-phone1" type="text" placeholder="Telefon nummer">
					<input class="toolbar-input toolbar-phone2" type="text" placeholder="Telefon nummer">
					<input class="toolbar-input toolbar-phone3" type="text" placeholder="Telefon nummer">
					<input class="toolbar-input toolbar-email1" type="text" placeholder="Email adress">
					<input class="toolbar-input toolbar-email2" type="text" placeholder="Email adress">
					<input class="toolbar-input toolbar-email3" type="text" placeholder="Email adress">
					<button class="toolbar-save-button add-contact-save-button">Spara</button>
				</div>`
	aside.innerHTML=html;
}

//Toolbar close button
window.addEventListener('click', e => {
	if(e.target.closest('.toolbar-close-button')){		
		document.getElementById("aside-container").style.display = "none";
	}
});

// Add-contact save button logic
window.addEventListener('click', e =>{
  if(e.target.closest('.add-contact-save-button')){

		let ContactId = idGenerator; 
		let Name = document.querySelector('.toolbar-name').value;	
		let Phone1 = document.querySelector('.toolbar-phone1').value;		
		let Phone2 = document.querySelector('.toolbar-phone2').value;
		let Phone3 = document.querySelector('.toolbar-phone3').value;
		let Email1 = document.querySelector('.toolbar-email1').value;
		let Email2 = document.querySelector('.toolbar-email2').value;
		let Email3 = document.querySelector('.toolbar-email3').value;
		
		let arrayOfPhonenumbers=[Phone1,Phone2,Phone3];
		let arrayOfPhonenumbers2 = arrayOfPhonenumbers.filter(function(v){return v!==''});
		let arrayOfEmails=[Email1,Email2,Email3];
		let arrayOfEmails2 = arrayOfEmails.filter(function(v){return v!==''});
	
		let newContact = new createContact(ContactId,Name,arrayOfPhonenumbers2,arrayOfEmails2,'0');
		arrayOfContacts.push(newContact); 
		idGenerator++;
			
		let editVersionString =newContact.id+'.'+newContact.editVersion;
		let newContact2 = JSON.stringify(newContact);			
		localStorage.setItem(editVersionString,newContact2);

		console.log(localStorage);
		displayContacts(); 		
	}
});






/********** EDIT CONTACTS **********/

let contactToEdit;
let versionCounter =0;
let loadEditsHistory;

window.addEventListener('click', e => {
	if(e.target.closest('.edit-contact-button')){		

		contactToEdit =arrayOfContacts.filter(function(object){
			return object.id == e.target.id;
		})[0];
		addEditForm();	
	}	
});

function addEditForm(){

	aside.style.display = "inline-block";
	aside.innerHTML = "";	
	let html = `<div class="toolbar-input-container">
					<div class="toolbar-close-button"></div>
					<input class="toolbar-input toolbar-name" type="text" value="${contactToEdit.name}">
					<input class="toolbar-input toolbar-phone1" type="text" 
						value="${contactToEdit.phoneNumbers[0]? contactToEdit.phoneNumbers[0]:''}"
						placeholder="${contactToEdit.phoneNumbers[0]? '':'Telefon nummer'}">
					<input class="toolbar-input toolbar-phone2" type="text" 
						value="${contactToEdit.phoneNumbers[1]? contactToEdit.phoneNumbers[1]:''}"
						placeholder="${contactToEdit.phoneNumbers[1]? '':'Telefon nummer'}">
					<input class="toolbar-input toolbar-phone3" type="text" 
						value="${contactToEdit.phoneNumbers[2]? contactToEdit.phoneNumbers[2]:''}"
						placeholder="${contactToEdit.phoneNumbers[2]? '':'Telefon nummer'}">
					<input class="toolbar-input toolbar-email1" type="text" 
						value="${contactToEdit.emails[0]? contactToEdit.emails[0]:''}"
						placeholder="${contactToEdit.emails[0]? '':'Email adress'}">
					<input class="toolbar-input toolbar-email2" type="text" 
						value="${contactToEdit.emails[1]? contactToEdit.emails[1]:''}"
						placeholder="${contactToEdit.emails[1]? '':'Email adress'}">
					<input class="toolbar-input toolbar-email3" type="text" 
						value="${contactToEdit.emails[2]? contactToEdit.emails[2]:''}"
						placeholder="${contactToEdit.emails[2]? '':'Email adress'}">					
				</div>`
	aside.innerHTML=html;

	versionCounter= contactToEdit.editVersion;
	editHistoryHtml(versionCounter);	
}


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
		
		aside.innerHTML = "";	
		let html = `<div class="toolbar-input-container">
						<div class="toolbar-close-button"></div>
						<input class="toolbar-input toolbar-name" type="text" value="${loadEditsHistory.name}">
						<input class="toolbar-input toolbar-phone1" type="text" 
							value="${loadEditsHistory.phoneNumbers[0]? loadEditsHistory.phoneNumbers[0]:''}"
							placeholder="${loadEditsHistory.phoneNumbers[0]? '':'Telefon nummer'}">
						<input class="toolbar-input toolbar-phone2" type="text" 
							value="${loadEditsHistory.phoneNumbers[1]? loadEditsHistory.phoneNumbers[1]:''}"
							placeholder="${loadEditsHistory.phoneNumbers[1]? '':'Telefon nummer'}">
						<input class="toolbar-input toolbar-phone3" type="text" 
							value="${loadEditsHistory.phoneNumbers[2]? loadEditsHistory.phoneNumbers[2]:''}"
							placeholder="${loadEditsHistory.phoneNumbers[2]? '':'Telefon nummer'}">
						<input class="toolbar-input toolbar-email1" type="text" 
							value="${loadEditsHistory.emails[0]? loadEditsHistory.emails[0]:''}"
							placeholder="${loadEditsHistory.emails[0]? '':'Email adress'}">
						<input class="toolbar-input toolbar-email2" type="text" 
							value="${loadEditsHistory.emails[1]? loadEditsHistory.emails[1]:''}"
							placeholder="${loadEditsHistory.emails[1]? '':'Email adress'}">
						<input class="toolbar-input toolbar-email3" type="text" 
							value="${loadEditsHistory.emails[2]? loadEditsHistory.emails[2]:''}"
							placeholder="${loadEditsHistory.emails[2]? '':'Email adress'}">					
					</div>`
		aside.innerHTML=html;

		editHistoryHtml(versionCounter);	
	}
});

//Spara history
window.addEventListener('click', e => {
	if(e.target.closest('.edit-contact-save-button')){

		let Name = document.querySelector('.toolbar-name').value;	
		let Phone1 = document.querySelector('.toolbar-phone1').value;		
		let Phone2 = document.querySelector('.toolbar-phone2').value;
		let Phone3 = document.querySelector('.toolbar-phone3').value;
		let Email1 = document.querySelector('.toolbar-email1').value;
		let Email2 = document.querySelector('.toolbar-email2').value;
		let Email3 = document.querySelector('.toolbar-email3').value;
			
		let arrayOfPhonenumbers=[Phone1,Phone2,Phone3];
		let arrayOfPhonenumbers2 = arrayOfPhonenumbers.filter(function(v){return v!==''});
		let arrayOfEmails=[Email1,Email2,Email3];
		let arrayOfEmails2 = arrayOfEmails.filter(function(v){return v!==''});

		contactToEdit.editVersion++;
		let editedContact = new createContact(contactToEdit.id,Name,arrayOfPhonenumbers2,arrayOfEmails2,contactToEdit.editVersion);		
			
		let indexOfObject=arrayOfContacts.findIndex(x => x.id === editedContact.id);
		arrayOfContacts.splice(indexOfObject,1,editedContact); 
	
		let editVersionString = editedContact.id+'.'+editedContact.editVersion;
		let editedContact2 = JSON.stringify(editedContact);			
		localStorage.setItem(editVersionString,editedContact2);

		document.getElementById("toolbar-history-section").remove();
		versionCounter= contactToEdit.editVersion;
		editHistoryHtml(versionCounter);

		displayContacts();
	}
});
























	
