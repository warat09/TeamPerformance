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
    document.getElementById("username").innerHTML = await Userdata.userName;
    const response = await fetch('http://localhost:9090/Department/CheckMemberDepartment?'+ new URLSearchParams({
        userName: Userdata.userName
     }))
     const resultresponse = await response.json();
    document.getElementById("department").innerHTML = await resultresponse[0].Department_Name;
    console.log(Userdata.menu)
    var checklink = 0
    Userdata.menu.forEach((Item)=> {
        var setting = document.getElementById("setting");
        if (Item.menuId === 7) {
            var menu = `
            <ul>
                <li><a href="./">Home</a></li>
                <li><a href="./AddJob.html">AddJob</a></li>
                <li><a href="./AddMember.html">AddMember</a></li>
                <li><a class="active" href="./AddDepartment.html">AddDepartment</a></li>
                <li><a href="./AddJobToDepartment.html">AddJobToDepartment</a></li>
                <li><a href="./AddMemberToDepartment.html">AddMemberToDepartment</a></li>
            </ul>
            `
            setting.innerHTML = menu;
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
Swal.fire({
    title: 'Do you want to Add?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Add',
    denyButtonText: `Don't Add`,
  }).then(async(result) => {
    if (result.isConfirmed) {
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
        if(responseStatus.status ==0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${responseStatus.message}`,
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
        else{
            Swal.fire(`${responseStatus.message}`, '', 'success')
        }
    
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })

 })

const logout =()=>{
    window.localStorage.clear();
    window.location.href = './login.html'
}