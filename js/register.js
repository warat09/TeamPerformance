var form = document.getElementById('form')
form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
console.log(email)

await fetch('http://localhost:9090/User/register',{
    method:'post',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        "email":email,
        "password":password
    })

})
.then(response=> console.log(response))
.catch(err=>console.log(err))
})