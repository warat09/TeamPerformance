var form = document.getElementById('form')
var checktoken = localStorage.getItem("tokenlogin")
if(checktoken !== null) {
    window.location.href = 'index.html'
}
form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    var user = document.getElementById("User_name").value;
    var password = document.getElementById("User_password").value;

const response = await fetch('http://localhost:9090/User/login',{
    method:'post',
    headers:{
        'Content-Type':'application/json'    
    },
    body: JSON.stringify({
        "User_name":user,
        "User_password":password
    })

})

const responseStatus = await response.json();
console.log(responseStatus.status)
if(responseStatus.status == 1){
    localStorage.setItem("tokenlogin",responseStatus.token)
    window.location.href = './index.html'
    console.log("ok mak")
}
else{
    console.log("no")
}
// .catch(err=>console.log(err))
})