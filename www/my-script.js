// ******** CREATING THE HTML BODY *************

let body = document.querySelector('body');

// container div
let divContainer = document.createElement('div');
divContainer.setAttribute('class', 'container');
body.append(divContainer);

// header
let header = document.createElement('header');
divContainer.append(header);

// logo
let logo= document.createElement('div');
logo.innerHTML= "<img src='./contact-logo.png'>";
logo.setAttribute('class','logo');
header.append(logo);

// heading
let heading = document.createElement('h2');
heading.setAttribute('class','heading');
heading.innerHTML="Dat´z kontaktëen liste";
header.append(heading);

// section
let section = document.createElement('section');
divContainer.append(section);

// aside
let aside = document.createElement('aside');
aside.setAttribute('id','aside-container');
divContainer.append(aside);


//localStorage.clear();






// ******** OBJECT CREATE ******** //

//--my array of contact objects--//
let arrayOfContacts =[];
//-- contact id generator
let idGenerator = 4;

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



let manne = new createContact(0,'Sven Bertilsson',['0462118787','099999999'],['kent@mail.com'],'0');
arrayOfContacts.push(manne);

let robban = new createContact(1,'Robban aspland',['0799019897'],['rob@hotmail.com','rob2@hotmail.com'],'0');
arrayOfContacts.push(robban);

let bella = new createContact(2,'Bella beckström',['78654324'],['bella@yahoo.com','bella2@hotmail.com'],'0');
arrayOfContacts.push(bella );

let olle = new createContact(
	3,
	'Olle Andersson',
	['040-134783','0708-183456','0739969500'],
	['olle@yahoo.com','olle@hotmail.com','olle@gmail.com'],
	'0'
);
arrayOfContacts.push(olle);


function sortArrayOfContacts( a, b ) {
	if ( a.name < b.name ){
	  return -1;
	}
	if ( a.name > b.name ){
	  return 1;
	}
	return 0;
  }
  
 




//-------- DISPLAY CONTACTS ARRAY IN THE DOM -------------//

function displayContacts(){
	section.innerHTML ='';
	arrayOfContacts.sort( sortArrayOfContacts );
	for (contactItem of arrayOfContacts){

		//console.log(contactItem);
	
		let contactContainer =  document.createElement('div');
		contactContainer.setAttribute('class','contact-container');

		let contactLogo= document.createElement('div');
		contactLogo.innerHTML= "<img src='./person-logo.png'>";
		contactLogo.setAttribute('class','contact-logo');
		contactContainer.append(contactLogo);

		let removeContactButton = document.createElement('div');
		removeContactButton.setAttribute('class','remove-contact-button');
		removeContactButton.setAttribute('id',contactItem.id);
		//removeContactButton.innerHTML= 'X';
		contactContainer.append(removeContactButton);

		let editContactButton = document.createElement('div');
		editContactButton.setAttribute('class','edit-contact-button');
		editContactButton.setAttribute('id',contactItem.id);
		//editContactButton.innerHTML="R";
		contactContainer.append(editContactButton);
		
		// name
		let contactInfoListName = document.createElement('p');
		contactInfoListName.setAttribute('class','name');
		contactInfoListName.innerHTML= contactItem.name;
		contactContainer.append(contactInfoListName);
	
		//phone
		let ul = document.createElement('ul');
		ul.setAttribute('class','phonenumber-list');
		contactContainer.append(ul);
		for(phoneNumber of contactItem.phoneNumbers ){
			let li = document.createElement('li');
			li.innerHTML= phoneNumber;
			ul.append(li);
		}
	
		// email
		let ul2 = document.createElement('ul');
		ul2.setAttribute('class','email-list');
		contactContainer.append(ul2);
		for(email of contactItem.emails ){
			let li = document.createElement('li');
			li.innerHTML= email;
			ul2.append(li);
		}
	
		section.append(contactContainer);
	}
	
}
displayContacts();




//-------------- REMOVE CONTACTS FROM THE DOM --------------//

window.addEventListener('click', e => {
	if(e.target.closest('.remove-contact-button')){
		
		arrayOfContacts=arrayOfContacts.filter(function(item){
			return item.id != e.target.id;
		});

		displayContacts();
	}
});




//------------ Add Contact ---------------//

let addContactContainer = document.createElement('div');
addContactContainer.setAttribute('class','add-contact-container');
aside.append(addContactContainer);

addContactContainerHeading= document.createElement('h3');
addContactContainerHeading.setAttribute('class','add-contact-container-heading');
addContactContainerHeading.innerHTML='Lägg till en ny kontakt';
addContactContainer.append(addContactContainerHeading);


// name
let input = document.createElement('input');
input.setAttribute('type','text');
input.setAttribute('placeholder','namn');
input.setAttribute('class','add-contact-input-name');
addContactContainer.append(input);
// phone
let input2 = document.createElement('input');
input2.setAttribute('type','text');
input2.setAttribute('placeholder','telefonnummer');
input2.setAttribute('class','add-contact-input-phone add-contact-input-phone1');
addContactContainer.append(input2);

let input3 = document.createElement('input');
input3.setAttribute('type','text');
input3.setAttribute('placeholder','telefonnummer');
input3.setAttribute('class','add-contact-input-phone add-contact-input-phone2');
addContactContainer.append(input3);

let input4 = document.createElement('input');
input4.setAttribute('type','text');
input4.setAttribute('placeholder','telefonnummer');
input4.setAttribute('class','add-contact-input-phone add-contact-input-phone3');
addContactContainer.append(input4);

// email
let input5 = document.createElement('input');
input5.setAttribute('type','text');
input5.setAttribute('placeholder','emailadress');
input5.setAttribute('class','add-contact-input-email add-contact-input-email1');
addContactContainer.append(input5);

let input6 = document.createElement('input');
input6.setAttribute('type','text');
input6.setAttribute('placeholder','emailadress');
input6.setAttribute('class','add-contact-input-email add-contact-input-email2');
addContactContainer.append(input6);

let input7 = document.createElement('input');
input7.setAttribute('type','text');
input7.setAttribute('placeholder','emailadress');
input7.setAttribute('class','add-contact-input-email add-contact-input-email3');
addContactContainer.append(input7);

// submit button
let button = document.createElement('button');
button.setAttribute('type','button');
button.setAttribute('class','add-contact-submit-button');
button.innerHTML='lägg till';
addContactContainer.append(button);

//edit container header
editContactContainerHeading= document.createElement('h3');
editContactContainerHeading.setAttribute('class','edit-contact-container-heading');
editContactContainerHeading.innerHTML='Redigera en kontakt';
addContactContainer.append(editContactContainerHeading);

// Adding a contact
window.addEventListener('click', e =>{
  if(e.target.closest('.add-contact-submit-button')){

		let addContactId = idGenerator; 
		let addContactName = document.querySelector('.add-contact-input-name').value;
	
		let addContactPhone1 = document.querySelector('.add-contact-input-phone1').value;		
		let addContactPhone2 = document.querySelector('.add-contact-input-phone2').value;
		let addContactPhone3 = document.querySelector('.add-contact-input-phone3').value;

		let arrayOfPhonenumbers=[addContactPhone1,addContactPhone2,addContactPhone3];
		let arrayOfPhonenumbers2 = arrayOfPhonenumbers.filter(function(v){return v!==''});

		let addContactEmail1 = document.querySelector('.add-contact-input-email1').value;
		let addContactEmail2 = document.querySelector('.add-contact-input-email2').value;
		let addContactEmail3 = document.querySelector('.add-contact-input-email3').value;

		let arrayOfEmails=[addContactEmail1,addContactEmail2,addContactEmail3];
		let arrayOfEmails2 = arrayOfEmails.filter(function(v){return v!==''});
	
		let newContact = new createContact(addContactId,addContactName,arrayOfPhonenumbers2,arrayOfEmails2,'0');
		arrayOfContacts.push(newContact); 
		idGenerator++;
		displayContacts();
	}
});




//---------------- EDIT CONTACTS ---------------//

	let editContactContainer = document.createElement('div');
	editContactContainer.setAttribute('class','edit-contact-container');
	aside.append(editContactContainer);

	let contactToEdit;
	window.addEventListener('click', e => {
		if(e.target.closest('.edit-contact-button')){

			editContactContainer.innerHTML='';
			aNumber=0;

			contactToEdit =arrayOfContacts.filter(function(object){
				return object.id == e.target.id;
			});
				
			let contactToEditName;
			let contactToEditPhone1;
			let contactToEditPhone2;
			let contactToEditPhone3;
			let contactToEditEmail1;
			let contactToEditEmail2;
			let contactToEditEmail3;
			for(let key of contactToEdit){
				contactToEditName= key.name;
				contactToEditPhone1= key.phoneNumbers[0];
				contactToEditPhone2= key.phoneNumbers[1];
				contactToEditPhone3= key.phoneNumbers[2];
				contactToEditEmail1= key.emails[0];
				contactToEditEmail2= key.emails[1];
				contactToEditEmail3= key.emails[2];
			}

			let input8=document.createElement('input');
			input8.setAttribute('class','edit-contact-input-name');
			input8.setAttribute('value',contactToEditName);
			editContactContainer.append(input8);

			//phones
			let input9=document.createElement('input');
			input9.setAttribute('class','edit-contact-input-phone edit-contact-input-phone1');
			if (contactToEditPhone1) {      
				input9.setAttribute('value',contactToEditPhone1);
			  }
			else{
				input9.setAttribute('placeholder','telefonnummer');
			}
			editContactContainer.append(input9);

			let input10=document.createElement('input');
			input10.setAttribute('class','edit-contact-input-phone edit-contact-input-phone2');
			if (contactToEditPhone2) {      
				input10.setAttribute('value',contactToEditPhone2);
			  }
			else{
				input10.setAttribute('placeholder','telefonnummer');
			}
			editContactContainer.append(input10);

			let input11=document.createElement('input');
			input11.setAttribute('class','edit-contact-input-phone edit-contact-input-phone3');
			if (contactToEditPhone3) {      
				input11.setAttribute('value',contactToEditPhone3);
			  }
			else{
				input11.setAttribute('placeholder','telefonnummer');
			}
			editContactContainer.append(input11);

			//emails
			let input12=document.createElement('input');
			input12.setAttribute('class','edit-contact-input-email edit-contact-input-email1');
			if (contactToEditEmail1) {      
				input12.setAttribute('value',contactToEditEmail1);
			  }
			else{
				input12.setAttribute('placeholder','emailadress');
			}
			editContactContainer.append(input12);

			let input13=document.createElement('input');
			input13.setAttribute('class','edit-contact-input-email edit-contact-input-email2');
			if (contactToEditEmail2) {      
				input13.setAttribute('value',contactToEditEmail2);
			  }
			else{
				input13.setAttribute('placeholder','emailadress');
			}
			editContactContainer.append(input13);

			let input14=document.createElement('input');
			input14.setAttribute('class','edit-contact-input-email edit-contact-input-email3');
			if (contactToEditEmail3) {      
				input14.setAttribute('value',contactToEditEmail3);
			  }
			else{
				input14.setAttribute('placeholder','emailadress');
			}
			editContactContainer.append(input14);

			let button2 = document.createElement('button');
			button2.setAttribute('type','button');
			button2.setAttribute('class','edit-contact-submit-button');
			button2.innerHTML='spara';
			editContactContainer.append(button2);


			//*******history stuff****** */

			this.historyContainer=document.createElement('div');
			historyContainer.setAttribute('class','edit-contact-history-container');
			editContactContainer.append(historyContainer);

			//get data from localstorage
			let showEditedContact = JSON.parse(localStorage.getItem(e.target.id+'.0'));
		
			//display data
			for(let key in showEditedContact){
				let val = showEditedContact[key];
				let container= document.createElement('p');
				container.innerHTML=key+' '+val;
				historyContainer.append(container);
			}	

			//Going back in history
			let EditHistoryBackButton = document.createElement('button');
			EditHistoryBackButton.setAttribute('class','edit-contact-history-back-button');
			EditHistoryBackButton.innerHTML='bak';
			editContactContainer.append(EditHistoryBackButton);

			let EditHistoryForwardButton = document.createElement('button');
			EditHistoryForwardButton.setAttribute('class','edit-contact-history-forward-button');
			EditHistoryForwardButton.innerHTML='fram';
			editContactContainer.append(EditHistoryForwardButton);

		}
	});

			/************HISTORY LOGICZ**********/		
			//going back
		let aNumber=0;
			window.addEventListener('click', e =>{
				if(e.target.closest('.edit-contact-history-back-button')){
					
					aNumber++;
					console.log('anumbah'+aNumber);
					//console.log('The storage'+localStorage);
					//console.log(contactToEdit[0].id);
					this.historyContainer.innerHTML='';


					let showEditedContact2 = JSON.parse(localStorage.getItem(contactToEdit[0].id+'.'+aNumber));
					
					//let showEditedContact2 = JSON.parse(localStorage.getItem(contactToEdit[0].id+'.'+contactToEdit.editVersion));

					for(let key in showEditedContact2){
						let val = showEditedContact2[key];
						let container= document.createElement('p');
						container.innerHTML=key+' '+val;
						this.historyContainer.append(container);
					}	
				
				}
			});
			//going forward
			window.addEventListener('click', e =>{
				if(e.target.closest('.edit-contact-history-forward-button')){
					
					aNumber--;
					console.log('anumbah'+aNumber);
					this.historyContainer.innerHTML='';
					let showEditedContact2 = JSON.parse(localStorage.getItem(contactToEdit[0].id+'.'+aNumber));
					for(let key in showEditedContact2){
						let val = showEditedContact2[key];
						let container= document.createElement('p');
						container.innerHTML=key+' '+val;
						this.historyContainer.append(container);
					}	
				
				}
			});

		

	
	window.addEventListener('click', e => {
		if(e.target.closest('.edit-contact-submit-button')){

			let editedContactName = document.querySelector('.edit-contact-input-name').value;

			let editedContactPhone1 = document.querySelector('.edit-contact-input-phone1').value;
			let editedContactPhone2 = document.querySelector('.edit-contact-input-phone2').value;
			let editedContactPhone3 = document.querySelector('.edit-contact-input-phone3').value;

			let arrayOfEditedPhonenumbers=[editedContactPhone1,editedContactPhone2,editedContactPhone3];
			let arrayOfEditedPhonenumbers2 = arrayOfEditedPhonenumbers.filter(function(v){return v!==''});

			let editedContactEmail1 = document.querySelector('.edit-contact-input-email1').value;
			let editedContactEmail2 = document.querySelector('.edit-contact-input-email2').value;
			let editedContactEmail3 = document.querySelector('.edit-contact-input-email3').value;

			let arrayOfEditedEmails=[editedContactEmail1,editedContactEmail2,editedContactEmail3];
			let arrayOfEditedEmails2 = arrayOfEditedEmails.filter(function(v){return v!==''});

			let editedContact = new createContact(contactToEdit[0].id,editedContactName,arrayOfEditedPhonenumbers2,arrayOfEditedEmails2,contactToEdit[0].editVersion);			
			let indexOfObject=arrayOfContacts.findIndex(x => x.id === editedContact.id);
			arrayOfContacts.splice(indexOfObject,1,editedContact); 

			contactToEdit[0].editVersion++;

			let editVersionString = editedContact.id+'.'+editedContact.editVersion;

			//****************HISTORY STUFF***********/		
			let editedContact2 = JSON.stringify(editedContact);			
			//localStorage.setItem(editedContact.id,editedContact2);
			localStorage.setItem(editVersionString,editedContact2);


			//localStorage.clear();
			
			console.log(localStorage);

			
			//************************************** */
				
			displayContacts();
		}
	});





















/* EVENT LISTENER
window.addEventListener('click', e =>{
  if(e.target.closest('.info-text')){
		console.log('p tagish');
	}
	if(e.target.closest('h1')){
		console.log('rubriken');
	}
});
/*

/*LOCAL STORAGE*/


//localStorage.clear();
/*
localStorage.setItem(
	'name','bosse'

);*/
//localStorage.removeItem('name');
//let x= localStorage.getItem('name');
//console.log(localStorage.key(0))

/*
let a='name';
let b = 'robban'
localStorage.setItem(a,b);
console.log(localStorage);
*/
/*
let myObj = {
	name: "robert",
	age: 35
} */
/*
localStorage.setItem("myObj",myObj);
console.log(localStorage);

let x= localStorage.getItem("myObj");
console.log(x);
let y= localStorage.getItem("myObj").name;
console.log(y); */




//let myObj2 = JSON.stringify(myObj);
//console.log(myObj2);
//localStorage.setItem('myObj2',myObj2);
//console.log(localStorage);

//let myObj3 = JSON.parse(localStorage.getItem("myObj2"));

//console.log(myObj3.name);





