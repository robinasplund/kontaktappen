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
divContainer.append(aside);



// ******** OBJECT CREATE ******** //

//--my array of contact objects--//
let arrayOfContacts =[];
//-- contact id generator
let idGenerator = 0;

const contactPrototype ={
	id:'',
	name:'',
	phoneNumbers:[],
	personalContacts:[]
}

function createContact(id,name,phoneNumbers,personalContacts){
	let newInstance = Object.create(contactPrototype);
	newInstance.id=id;
	newInstance.name=name;
	newInstance.phoneNumbers=phoneNumbers;
	newInstance.personalContacts=personalContacts;
	return newInstance;
}



let manne = new createContact('0','Sven Bertilsson',['0462118787','099999999'],['kent','malin','gurra']);
arrayOfContacts.push(manne);

let robban = new createContact('1','robban aspland',['0799019897'],['sebbe','kristina']);
arrayOfContacts.push(robban);

let bella = new createContact('2','bella beckström',['78654324'],['kajsa','kristina','åsa','jonas']);
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
		for(personalContact of contactItem.personalContacts ){
			let li = document.createElement('li');
			li.innerHTML= personalContact;
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

//------------ Add Contact box ---------------//

let addContactContainer = document.createElement('div');
addContactContainer.setAttribute('class','add-contact-container');
aside.append(addContactContainer);

// name
let input = document.createElement('input');
input.setAttribute('type','text');
input.setAttribute('placeholder','Skriv in ett namn här');
input.setAttribute('class','add-contact-input-name');
addContactContainer.append(input);
// phone
let input2 = document.createElement('input');
input2.setAttribute('type','text');
input2.setAttribute('placeholder','Skriv in ett nummer här');
input2.setAttribute('class','add-contact-input-phone');
addContactContainer.append(input2);
// contact
// phone
let input3 = document.createElement('input');
input3.setAttribute('type','text');
input3.setAttribute('placeholder','Skriv in en kontakt här');
input3.setAttribute('class','add-contact-input-contact');
addContactContainer.append(input3);

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
		let addContactPhone = document.querySelector('.add-contact-input-phone').value;
		let addContactContact = document.querySelector('.add-contact-input-contact').value;
	//	alert(addContactName+' '+addContactPhone+ ' '+addContactContact );
	
		let newContact = new createContact(addContactId,addContactName,[addContactPhone],[addContactContact]);
		arrayOfContacts.push(newContact); 

		//console.log(arrayOfContacts);
		idGenerator++;
		displayContacts();
	}
});


//---------------- EDIT CONTACTS ---------------//

	let editContactContainer = document.createElement('div');
	editContactContainer.setAttribute('class','edit-contact-container');
	aside.append(editContactContainer);

	window.addEventListener('click', e => {
		if(e.target.closest('.edit-contact-button')){

			editContactContainer.innerHTML='';

			let contactToEdit =arrayOfContacts.filter(function(object){
				return object.id == e.target.id;
			});

			let contactToEditName;
			let contactToEditPhone;
			let contactToEditEmail;
			for(let key of contactToEdit){
				contactToEditName= key.name;
				contactToEditPhone= key.phoneNumbers;
				contactToEditEmail= key.personalContacts;
			}

			let input4=document.createElement('input');
			input4.setAttribute('class','edit-contact-input-name');
			input4.setAttribute('placeholder',contactToEditName);
			editContactContainer.append(input4);

			let input5=document.createElement('input');
			input5.setAttribute('class','edit-contact-input-phone');
			input5.setAttribute('placeholder',contactToEditPhone);
			editContactContainer.append(input5);

			let input6=document.createElement('input');
			input6.setAttribute('class','edit-contact-input-email');
			input6.setAttribute('placeholder',contactToEditEmail);
			editContactContainer.append(input6);

			let button2 = document.createElement('button');
			button2.setAttribute('type','button');
			button2.setAttribute('class','edit-contact-submit-button');
			button2.innerHTML='spara';
			editContactContainer.append(button2);


			window.addEventListener('click', e => {
				if(e.target.closest('.edit-contact-submit-button')){
		
					let editedContactName = document.querySelector('.edit-contact-input-name').value;
					let editedContactPhone = document.querySelector('.edit-contact-input-phone').value;
					let editedContactContact = document.querySelector('.edit-contact-input-email').value;

					let editedContact = new createContact(contactToEdit[0].id,editedContactName,[editedContactPhone],[editedContactContact]);
				
					let indexOfObject=arrayOfContacts.findIndex(x => x.id === contactToEdit[0].id);

					arrayOfContacts.splice(indexOfObject,1,editedContact);
					//console.log(arrayOfContacts);
			
					
					displayContacts();

				}
			});







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

/*
let car;
try {
 car = JSON.parse(localStorage.car);
}
catch(e){
 car = {};
}
 
car.save = function(){
  localStorage.car = JSON.stringify(this);
};
*/
/*if*//*
  console.log('Creating car');
  car.model = {model: 'audi'};
  car.save();

console.log(window.localStorage)
*/




 

