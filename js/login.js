var form = document.getElementById('form')
form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
console.log(email)

const response = await fetch('http://localhost:9090/User/login',{
    method:'post',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        "email":email,
        "password":password
    })

})

const responseStatus = await response.json();
if(responseStatus.status == "ok"){
    localStorage.setItem("tokenlogin",responseStatus.token)
    window.location.href = './index.html'
    console.log("ok mak")
}
else{
    console.log("no")
}
// .catch(err=>console.log(err))
})