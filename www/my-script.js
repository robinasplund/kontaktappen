
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

//-------------- OBJECT CREATE-------------//

//--my array of contact objects--//
let arrayOfContacts =[];

const contactPrototype ={
	name:'',
	phoneNumbers:[],
	personalContacts:[]
}

function createContact(name,phoneNumbers,personalContacts){
	let newInstance = Object.create(contactPrototype);
	newInstance.name=name;
	newInstance.phoneNumbers=phoneNumbers;
	newInstance.personalContacts=personalContacts;
	return newInstance;
}

let manne = new createContact('Sven Bertilsson',['0462118787','099999999'],['kent','malin','gurra']);
arrayOfContacts.push(manne);

let robban = new createContact('robban aspland',['0799019897'],['sebbe','kristina']);
arrayOfContacts.push(robban);

let bella = new createContact('bella beckström',['78654324'],['kajsa','kristina','åsa','jonas']);
arrayOfContacts.push(bella );

//-------- contact row -------------//

for (contactItem of arrayOfContacts){

	console.log(contactItem);

	let contactContainer =  document.createElement('div');
	contactContainer.setAttribute('class','contact-container');

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




 

