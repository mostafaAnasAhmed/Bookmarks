var BTN = document.querySelector('#Btn');
var websiteName = document.querySelector('#bookmarkName');
var websiteUrl = document.querySelector('#bookMarkURL');
var tableData = document.querySelector('#tableContent');
var deleteBTN = document.querySelector('#delete-btn')
var visitBTN = document.querySelector('#visit-btn');
var alterBox = document.querySelector('#box')
var boxContent= document.querySelector('#box-content')
var closeM = document.querySelector('#closeMSG')




BTN.addEventListener ('click', function(){
    addWebsite()
})
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

websiteName.addEventListener("input", function () {
validation(websiteName, nameRegex);
});

websiteUrl.addEventListener("input", function () {
validation(websiteUrl, urlRegex);
});



var list;


localStorage.getItem("Website");
if(localStorage.getItem("Website") !== null){
    list = JSON.parse(localStorage.getItem("Website"))
    display()
}else{
    list = [];
}


//add website function
function addWebsite(){
    
    if (
        websiteName.classList.contains("is-valid") &&
        websiteUrl.classList.contains("is-valid")
    ) {
        if (websiteName.value==''){
            return;
        }
        var website = {
            bookmarkName: websiteName.value,
            bookMarkURL: websiteUrl.value,
        }
        list.push(website);
        localStorage.setItem('Website', JSON.stringify(list))
        // console.log(list);
        display()
        clear()
    }else{
        alterBox.classList.remove('d-none')
    }
}


//clear function
function clear(){
    websiteName.value=''; 
    websiteUrl.value=''; 
}


//display function
function display(){
    var box = '';
    for(i = 0 ; i < list.length ;i++){
        box+= `                    <tr>
        <td class="pt-3 text-bold">${i + 1}</td>
        <td class="pt-3 ">${list[i].bookmarkName}</td>
        <td class="pt-3"><a id="visit-btn" class="py-2 px-3  visit-btn" href="${list[i].bookMarkURL}" target='_blank'><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button onclick = 'deleteSite(${i})' id="delete-btn" class="delete-btn py-2 px-3"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr> `
        }
        
    tableData.innerHTML = box;
}

//delete function
function deleteSite(index){

list.splice(index, 1);
localStorage.setItem('Website', JSON.stringify(list))
display()
}



    function validation(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
    }



    

function closeModal() {
alterBox.classList.add("d-none");
}
closeM.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
if (e.key == "Enter") {
    closeModal();
}
});
alterBox.addEventListener("click", function () {
    closeModal();
});
boxContent.addEventListener("click", function (e) {
    e.stopPropagation();
});

