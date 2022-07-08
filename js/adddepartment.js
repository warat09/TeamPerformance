var checktoken = localStorage.getItem("tokenlogin")
const main =async()=>{
    if(checktoken === null || checktoken == " ") {
    window.location.href = './login.html'
    }
    else{
        const response = await fetch('http://localhost:9090/User/getdatauser',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + checktoken,
            },
        })
        const responseStatus = await response.json();
        console.log(responseStatus)
        if(responseStatus.status == 400){
            window.localStorage.clear();
            window.location.href = './login.html'
        }
        else{
           var jsondata = JSON.stringify(responseStatus.data)
            localStorage.setItem("data",jsondata)
        }
    }
    var Userdata = await JSON.parse(localStorage.getItem("data"))
    document.getElementById("par").innerHTML = await Userdata.userFname;
    console.log(Userdata.menu)
    var checklink = 0
    Userdata.menu.forEach((Item)=> {
        if (Item.menuId === 7) {
            checklink = 1
        }
        return checklink
    });
    if(checklink !== 1){
        window.location.href = './'
    }

}
main()

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

const logout =()=>{
    window.localStorage.clear();
    window.location.href = './login.html'
}