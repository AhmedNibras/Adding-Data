const dataList = document.querySelector('#Adding-item');
const form = document.querySelector('#addForm');


// create element and render cafe
function renderData(doc){
    let li = document.createElement('li');
    let Name = document.createElement('span')
    let ItemName = document.createElement('span')
    let Email = document.createElement('span')
    let Contact = document.createElement('span')
    let cross = document.createElement('div')

    
    li.setAttribute('data-id', doc.id);
    Name.textContent = doc.data().Name;
    ItemName.textContent = doc.data().ItemName;
    Email.textContent = doc.data().Email;
    Contact.textContent = doc.data().Contact;
    cross.textContent = 'x';

    li.appendChild(Name);
    li.appendChild(ItemName);
    li.appendChild(Email);
    li.appendChild(Contact);
    li.appendChild(cross);

    dataList.appendChild(li);


    // deleting data 
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Data').doc(id).delete();
    })
}

//getting data
// db.collection('Data').orderBy('Name').get().then( (snapshot) =>{
//     snapshot.docs.forEach(doc => {
//         renderData(doc);
//     })
// })


// saving data 

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('Data').add({
        Name: form.Name.value,
        ItemName: form.ItemName.value,
        Email: form.Email.value,
        Contact: form.Contact.value
    });
    form.Name.value = '';
    form.ItemName.value = '';
    form.Email.value = '';
    form.Cotnact.value = '';
})

// Real-time listeners 

db.collection('Data').orderBy('Name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {  
            if(change.type == 'added'){
                renderData(change.doc);
            }
            else if (change.type = 'removed') {
                let li = dataList.querySelector(`[data-id="${change.doc.id}"]`);
                dataList.removeChild(li);
            }
    })
})