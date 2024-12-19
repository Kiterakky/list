let i=0
const storageList=localStorage.getItem("list")
const nameEl=document.getElementById("nameInp")
const dateEl=document.getElementById("dateInp")
const ul=document.getElementById("ulEl")
const addBtn=document.getElementById("addEl")
addBtn.addEventListener("click", add)
const oldTodolist=storageList ? JSON.parse(storageList) : []; render(oldTodolist)




function add() {
   
   input=[nameEl.value, dateEl.value]
   if (input[0]&&input[1]) {
      nameEl.value=dateEl.value=""
      oldTodolist.push(input)
      render([input])
      updateLocalStorage()
   }
}



function render(input) {
   const fragment=document.createDocumentFragment()
   input.forEach((item)=> {
      const li=document.createElement("li")
      

      // name input
      const nameInp=document.createElement("input")
      nameInp.type="text"
      nameInp.value=item[0]
      nameInp.setAttribute("onchange", nameChange(i))

      // data input
      const dateInp=document.createElement("input")
      dateInp.type="date"
      dateInp.value=item[1]
      dateInp.setAttribute("onchange",  dateChange(i))

      // delete button
      const delBtn=document.createElement("button")
      delBtn.textContent="DELETE"
      delBtn.setAttribute("onclick", deleteLi(i))
      
      // grouping in fragment
      li.append(nameInp, dateInp, delBtn);fragment.appendChild(li)

      i++
   })
   ul.appendChild(fragment)
}



function deleteLi(i){return `this.parentElement.parentElement.remove(); oldTodolist.splice(${i}, 1, ""); updateLocalStorage()`}
function nameChange(i){return `oldTodolist[${i}].splice(0, 1, this.value);updateLocalStorage()`}
function dateChange(i){return `oldTodolist[${i}].splice(1, 1, this.value);updateLocalStorage()`}
function updateLocalStorage() { localStorage.setItem("list", (JSON.stringify(oldTodolist.filter(Boolean))))}

// oldTodolist.splice(${i[1]}, 1, this.value)

//       li.innerHTML=`
//  <p>${item[0]}
//  <input type="date" value="${item[1]}"onchange="oldTodolist[${i}].splice(1, 1, this.value);updateLocalStorage()">
//  <button class="delete"
//  onclick='this.parentElement.parentElement.remove();
//  oldTodolist.splice(${i}, 1, "");
//  updateLocalStorage()'
//  >DELETE</button></p>`


