var form = document.getElementById('form')
var checktoken = localStorage.getItem("tokenlogin")
if(checktoken !== null) {
    window.location.href = '../'
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
        "userName":user,
        "password":password,
        "appId":4
    })

})

const responseData = await response.json();
if(responseData.status == 200){
    localStorage.setItem("tokenlogin",responseData.token)
    console.log(responseData)
        window.location.href = '../'
        console.log("ok mak")

}
else if(responseData.status == 400){
    console.log("no")
}
// .catch(err=>console.log(err))
})