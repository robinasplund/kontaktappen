
let body = document.querySelector('body');

// CONTAINER DIV
let divContainer = document.createElement('div');
divContainer.setAttribute('class', 'container');
body.append(divContainer);

// HEADER
let header = document.createElement('header');
header.innerHTML= 'Dat´z kontaktëen liste';
divContainer.append(header);

// SECTION 
let section = document.createElement('section');
divContainer.append(section);

//ASIDE
let aside = document.createElement('aside');
divContainer.append(aside);

//-------------- OBJECT CREATE-------------//

//--my array of contact objects--//
let arrayOfContacts =[];

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
	
		let contactContainer =  document.createElement('div');
		contactContainer.setAttribute('class','contact-container');

		let removeContactButton = document.createElement('button');
		removeContactButton.setAttribute('class','remove-contact-button');
		removeContactButton.setAttribute('id',contactItem.id);
		removeContactButton.innerHTML= 'ta bort';
		contactContainer.append(removeContactButton);
		
		// name
		let contactInfoListName = document.createElement('p');
		contactInfoListName.setAttribute('class','name');
		contactInfoListName.innerHTML= contactItem.name;
		contactContainer.append(contactInfoListName);
	
		//phone
		let contactInfoListPhone = document.createElement('p');
		contactInfoListPhone.innerHTML= 'Telefonnummer:';
		contactContainer.append(contactInfoListPhone);
	
		let ul = document.createElement('ul');
		contactContainer.append(ul);
		for(phoneNumber of contactItem.phoneNumbers ){
			let li = document.createElement('li');
			li.innerHTML= phoneNumber;
			ul.append(li);
		}
	
		//contacts
		let contactInfoListPersonalContacts = document.createElement('p');
		contactInfoListPersonalContacts.innerHTML= 'Kontakter:';
		contactContainer.append(contactInfoListPersonalContacts);
	
		let ul2 = document.createElement('ul');
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

		let addContactName = document.querySelector('.add-contact-input-name').value;
		let addContactPhone = document.querySelector('.add-contact-input-phone').value;
		let addContactContact = document.querySelector('.add-contact-input-contact').value;
	//	alert(addContactName+' '+addContactPhone+ ' '+addContactContact );
	
		let newContact = new createContact(addContactName,[addContactPhone],[addContactContact]);
		arrayOfContacts.push(newContact); 

		console.log(arrayOfContacts);
		displayContacts();
	}
});










/*------------ GAMLA ---------*//*
let contactInfoList = document.createElement('ul');
	contactContainer.append(contactInfoList);

	let contactInfoListName = document.createElement('li');
	contactInfoListName.innerHTML= contactItem.name;
	contactInfoList.append(contactInfoListName);

	for(phoneNumber of contactItem.phoneNumbers ){
		let contactInfoListPhone = document.createElement('li');
		contactInfoListPhone.innerHTML= phoneNumber;
		contactInfoList.append(contactInfoListPhone);
	}
	for(personalContact of contactItem.personalContacts ){
		let contactInfoListPhone = document.createElement('li');
		contactInfoListPhone.innerHTML= personalContact;
		contactInfoList.append(contactInfoListPhone);
	}
*/

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




 

