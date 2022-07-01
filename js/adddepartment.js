var checktoken = localStorage.getItem("tokenlogin")
var checkdata = localStorage.getItem("data")
let data = JSON.parse(checkdata);
if(checktoken === null || checkdata === null) {
    window.location.href = './login.html'
}
else{
        fetch('http://localhost:9090/User/checktoken',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + checktoken,
        },
    }).then(res=>{
        if(res.status == 0){
            window.localStorage.clear();
            window.location.href = './login.html'
        }
    })

}
var form = document.getElementById('form')
document.getElementById("par").innerHTML = data.userFname;

form.addEventListener('submit',async(event)=>{
 event.preventDefault()
 var inputdepartment = document.getElementById("department").value
 console.log(inputdepartment)
 const response = await fetch('http://localhost:9090/Department/AddDepartment',{
         method:'post',
         headers:{
             'Content-Type':'application/json'    
         },
         body: JSON.stringify({
             "department":inputdepartment
         })

     })
     const responseStatus = await response.json();
     console.log(responseStatus)

 })