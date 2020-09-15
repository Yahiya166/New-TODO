// types of reload

// window.location.reload(true)  server reloading
// window.location.reload(false)  cache reloading

//   function to signup

function signup() {
    var email = document.getElementById("email")
    var password = document.getElementById("password")


    // console.log(email.value); // check 
    // console.log(password.value); // check 

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    

    .then ((result)=>{
        alert("user signup successfully")
        var locate = window.location.href
    // console.log(locate)
    
    window.location.replace("index.html")

        // console.log(result)
    })
    
    
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;


        alert(errorMessage) 
      });
}




function Signup() {
      
    var locate = window.location.href
    // console.log(locate)
    
    window.location.replace("index1.html")  // replace

}




function Login() {
    var email = document.getElementById("email")
    var password = document.getElementById("password")

     // console.log(email.value); // check 
    // console.log(password.value); // check 



    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    

    .then((result)=>{
        alert("user login successfully")
        var locate = window.location.href
    // console.log(locate)
    
    window.location.replace("index2.html")  // replace
        // console.log(result)
    })
    
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage)



      });
}


function back() {
    var locate = window.location.href
    // console.log(locate)
    
    window.location.replace("index.html")
}


// console.log(firebase);   "check firebase connected"

var list = document.getElementById("list");


var database = firebase.database().ref('todos')



database.on('child_added',function(data){


    // console.log(data.val())  "check firebase function"


    

      //    LI
      
      
    var Text = document.createTextNode(data.val().value);
    var li = document.createElement("li");
    li.appendChild(Text);



    //   Edit
    
    
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("EDIT");
    editBtn.appendChild(editText);
    li.appendChild(editBtn);
    editBtn.setAttribute("onclick","EditItems(this)");
    editBtn.setAttribute('id',data.val().key);
    
    
    //  Delete
    
    var delBtn = document.createElement("button");
    var delText = document.createTextNode("DELETE");
    delBtn.setAttribute("onclick","deleteItems(this)");
    delBtn.setAttribute('id',data.val().key);
    delBtn.appendChild(delText);
    li.appendChild(delBtn);
    list.appendChild(li);


})





function addto(){
    var To_Do = document.getElementById("TO_DO");
    
    // console.log(To_Do.value)   "check input"


 

    var key = database.push().key;
    
    // console.log(key);  "check key"



    //   object
    var todo = {
        value : TO_DO.value,
        key :  key
    }


    database.child(key).set(todo)


    To_Do.value = "";

  
}

function deleteItems(e){

    e.parentNode.remove();
    firebase.database().ref('todos').child(e.id).remove()
    
    
    // console.log(e.id)           "check  dlelbtn id"
    // console.log(e.parentNode);  "check e"
}


function deleteAll(){
    list.innerHTML = "";
    firebase.database().ref('todos').remove()
}



function EditItems(v){
    var val = v.parentNode.firstChild.nodeValue;
    var editTODO = prompt("Enter edit todo",val);   
    val = editTODO;
    v.parentNode.firstChild.nodeValue = editTODO;

    var editTodo = {
        value : val,
        key : v.id
    }


    firebase.database().ref('todos').child(v.id).set(editTodo)


    // console.log(editTodo)
    // console.log(v.id)
    // console.log(v.parentNode.firstChild);
}