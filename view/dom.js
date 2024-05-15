var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editItem);

window.addEventListener('load', () => {
    const response = axios.get("http://localhost:3000/expense/get-expense/")
    response.then((response) => {
        response.data.map((expense) => {
            createElement(expense.id, expense.name, expense.price, expense.description)
        })
    })
        .catch((err) => console.log(err))
})
////////////// for creating dom element
function createElement(id, name, number, email) {
    var li = document.createElement('li');
    let subLi = document.createElement('div');
    subLi.setAttribute('hidden', 'true');
    subLi.appendChild(document.createTextNode(id))
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(name));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(number));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(email));
    li.appendChild(document.createTextNode(" "));
    var deleteBtn = document.createElement('button');
    var editBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    editBtn.className = 'btn btn-warning btn-sm edit';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    editBtn.appendChild(document.createTextNode('Edit'))
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    li.appendChild(subLi)
    itemList.appendChild(li);
}


// Add item to the list
function addItem(e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var price = document.getElementById('price').value;
    var description = document.getElementById('description').value;
    myobj = {
        name: name,
        price: price,
        description: description
    }
    // console.log(myobj)
    const response = axios.post('http://localhost:3000/expense/add-expense/', myobj)
    response.then((res) => {
        console.log(res)
        createElement(res.data.name, res.data.price, res.data.description)
    }).catch(err => console.log(err))
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';
}

//Remove item from the list
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            var li = e.target.parentElement;
            let x = li.textContent
            var num = `${x}`.match(/\d+/g);
            id = num[num.length - 1]
            const response = axios.post('http://localhost:3000/expense/delete-expense/', { id: id })
            response.then((res) => itemList.removeChild(li)).catch(err => console.log(err))
        }
    }
}

//edit item in the list
function editItem(e) {
    // if (e.target.classList.contains('edit')) {
    //     let x = e.target.parentElement.textContent
    //     var num = `${x}`.match(/\d+/g);
    //     const response = axios.post("http://localhost:3000/booking/edit-user/", { Number: num[0] })
    //     response.then((res) => {
    //         document.getElementById('name').value = res.data.Name;
    //         document.getElementById('number').value = res.data.Number;
    //         document.getElementById('email').value = res.data.Email;
    //         localStorage.removeItem(num[0]);
    //         var li = e.target.parentElement;
    //         itemList.removeChild(li)
    //         const response = axios.post('http://localhost:3000/booking/delete-user/', { Number: num[0] })
    //         response.then((res) => console.log(res)).catch(err => console.log(err))
    //     }).catch(err => console.log(err))

    // }
}

