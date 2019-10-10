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



// ******** OBJECT CREATE ******** //

//--my array of contact objects--//
let arrayOfContacts =[];
//-- contact id generator
let idGenerator = 3;

const contactPrototype ={
	id:'',
	name:'',
	phoneNumbers:[],
	emails:[]
}

function createContact(id,name,phoneNumbers,emails){
	let newInstance = Object.create(contactPrototype);
	newInstance.id=id;
	newInstance.name=name;
	newInstance.phoneNumbers=phoneNumbers;
	newInstance.emails=emails;
	return newInstance;
}



let manne = new createContact(0,'Sven Bertilsson',['0462118787','099999999'],['kent@mail.com']);
arrayOfContacts.push(manne);

let robban = new createContact(1,'robban aspland',['0799019897'],['rob@hotmail.com','rob2@hotmail.com']);
arrayOfContacts.push(robban);

let bella = new createContact(2,'bella beckström',['78654324'],['bella@yahoo.com','bella2@hotmail.com']);
arrayOfContacts.push(bella );







//-------- DISPLAY CONTACTS ARRAY IN THE DOM -------------//

function displayContacts(){
	section.innerHTML ='';
	for (contactItem of arrayOfContacts){

		console.log(contactItem);
		//console.log('id-gen'+idGenerator);
	
		let contactContainer =  document.createElement('div');
		contactContainer.setAttribute('class','contact-container');

		let contactLogo= document.createElement('div');
		contactLogo.innerHTML= "<img src='./person-logo.png'>";
		contactLogo.setAttribute('class','contact-logo');
		contactContainer.append(contactLogo);

		let editContactButton = document.createElement('button');
		editContactButton.setAttribute('class','edit-contact-button');
		editContactButton.setAttribute('id',contactItem.id);
		editContactButton.innerHTML="R";
		contactContainer.append(editContactButton);

		let removeContactButton = document.createElement('button');
		removeContactButton.setAttribute('class','remove-contact-button');
		removeContactButton.setAttribute('id',contactItem.id);
		removeContactButton.innerHTML= 'X';
		contactContainer.append(removeContactButton);
		
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

		//console.log(arrayOfContacts);

		displayContacts();
	}
});

//------------ Add Contact ---------------//

let addContactContainer = document.createElement('div');
addContactContainer.setAttribute('class','add-contact-container');
aside.append(addContactContainer);

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
	
		let newContact = new createContact(addContactId,addContactName,arrayOfPhonenumbers2,arrayOfEmails2);
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

			console.log('RUNNING OUTER !!!!!');
			editContactContainer.innerHTML='';

			contactToEdit =arrayOfContacts.filter(function(object){
				return object.id == e.target.id;
			});
			
			//console.log('contact to edit '+contactToEdit[0].name);

			
			let contactToEditName;
			let contactToEditPhone;
			let contactToEditEmail;
			for(let key of contactToEdit){
				contactToEditName= key.name;
				contactToEditPhone= key.phoneNumbers;
				contactToEditEmail= key.emails;
			}

			let input8=document.createElement('input');
			input8.setAttribute('class','edit-contact-input-name');
			input8.setAttribute('placeholder',contactToEditName);
			editContactContainer.append(input8);

			let input9=document.createElement('input');
			input9.setAttribute('class','edit-contact-input-phone');
			input9.setAttribute('placeholder',contactToEditPhone);
			editContactContainer.append(input9);

			let input10=document.createElement('input');
			input10.setAttribute('class','edit-contact-input-email');
			input10.setAttribute('placeholder',contactToEditEmail);
			editContactContainer.append(input10);

			let button2 = document.createElement('button');
			button2.setAttribute('type','button');
			button2.setAttribute('class','edit-contact-submit-button');
			button2.innerHTML='spara';
			editContactContainer.append(button2);
						
		}
	});

	
	window.addEventListener('click', e => {
		if(e.target.closest('.edit-contact-submit-button')){

			console.log('RUNNING INNER !!!!!');

			let editedContactName = document.querySelector('.edit-contact-input-name').value;
			let editedContactPhone = document.querySelector('.edit-contact-input-phone').value;
			let editedContactEmail = document.querySelector('.edit-contact-input-email').value;

			let editedContact = new createContact(contactToEdit[0].id,editedContactName,[editedContactPhone],[editedContactEmail]);

			/*for(let key in editedContact){
				let val = editedContact[key];
				console.log('the edited contact '+key, val);
			}*/
			
			//console.log(editedContact.id+'edited contact id');
			
			let indexOfObject=arrayOfContacts.findIndex(x => x.id === editedContact.id);

			//console.log('index of the edited contact in array'+ indexOfObject)

			arrayOfContacts.splice(indexOfObject,1,editedContact); 
				
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

let myObj = {
	name: "robert",
	age: 35
}
/*
localStorage.setItem("myObj",myObj);
console.log(localStorage);

let x= localStorage.getItem("myObj");
console.log(x);
let y= localStorage.getItem("myObj").name;
console.log(y); */

let myObj2 = JSON.stringify(myObj);
//console.log(myObj2);
localStorage.setItem('myObj2',myObj2);
//console.log(localStorage);

let myObj3 = JSON.parse(localStorage.getItem("myObj2"));

console.log(myObj3.name);



 

