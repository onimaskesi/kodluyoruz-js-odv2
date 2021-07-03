let inputDOM = document.getElementById("to-do-input")
let addBtnDOM = document.getElementById("button-add")
let listDOM = document.getElementById("to-do-list")
let deleteBtnsDOM = document.getElementsByClassName("delete")

const completedClass = "completed"

// get list items from local storage and set them to the html
let list = localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : []
initList()

// add new item to list and save that to local storage, also write in the html
addBtnDOM.addEventListener("click", add)

function getNewItem(){
    return {text: inputDOM.value, id : "item-"+list.length, isCompleted : false}
}

function getItem(id){
    for(let item of list){
        if(item.id == id){
            return item
        }
    }
}

function add(){
    let item = getNewItem()
    addToHtml(item)
    list.unshift(item)
    updateLocalStorage()
}

function initList(){
    list.forEach(item => addToHtml(item))
}

function addToHtml(item){

    let newitemDOM = document.createElement("button")
    newitemDOM.id = item.id
    newitemDOM.type = "button"
    newitemDOM.classList.add("list-group-item", "list-group-item-action")
    newitemDOM.style="vertical-align: middle"
    newitemDOM.addEventListener("click", itemClicked)

    let spanTextDOM = document.createElement("span")
    spanTextDOM.classList.add("btn")
    if(item.isCompleted){ spanTextDOM.classList.add(completedClass) }
    spanTextDOM.innerHTML = item.text

    let spanDeleteDOM = document.createElement("span")
    spanDeleteDOM.classList.add("btn", "btn-outline-danger", "delete")
    spanDeleteDOM.style = "float:right;"
    spanDeleteDOM.innerHTML = "X"
    spanDeleteDOM.addEventListener("click", deleteItem)

    newitemDOM.appendChild(spanTextDOM)
    newitemDOM.appendChild(spanDeleteDOM)
    listDOM.appendChild(newitemDOM)

}

function itemClicked(){
    
    let item = getItem(this.id)
    let classList = this.children[0].classList
    
    if(item){
        if(item.isCompleted){
            classList.remove(completedClass)
            item.isCompleted = false
            updateLocalStorage()
        }else {
            classList.add(completedClass)
            item.isCompleted = true
            updateLocalStorage()
        }
    }
    

}

function updateLocalStorage(){
    localStorage.setItem('list', JSON.stringify(list))
}

function deleteItem(){
    
    let id = this.parentNode.id
    let index = 0
    list.forEach( (item, i) =>{ if(item.id == id){index = i} })
    
    //delete from list
    list.splice(index,1)
    //delete from the html
    let btnDOM = document.getElementById(id)
    btnDOM.outerHTML = ""
    //update local storage
    localStorage.setItem('list', JSON.stringify(list))
}
