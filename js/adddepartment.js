var checktoken = localStorage.getItem("tokenlogin")
var form = document.getElementById('form')


const main = async()=>{
   if(checktoken == null) {
   window.location.href = './login.html'
   }
   else{
       const response = await fetch('http://localhost:9090/User/checktoken',{
       method:'GET',
       headers:{
           'Content-Type':'application/json',
           'Authorization': 'Bearer ' + checktoken,
       },
       })
       const responseStatus = await response.json();
       console.log(responseStatus)
       if(responseStatus.status == 0){
           window.location.href = './login.html'
       }
       else{
           document.getElementById("par").innerHTML = responseStatus.email;
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


       }
   }
}
main();