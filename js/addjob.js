var form = document.getElementById("form")

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
        if (Item.menuId === 7) {
            checklink = 1
        }
        return checklink
    });
    if(checklink !== 1){
        window.location.href = './'
    }
    fetch('http://localhost:9090/Job/AllJob')
    .then(res => res.json())
    .then(data =>{
        let job = data.job;
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]

        Object.keys(job[0]).forEach(headerText => {
            var newTH = document.createElement('th');
                        newTH.style.width = "150px";
            newTH.innerHTML = `${headerText}`
            
            headerRow.appendChild(newTH)

    });
    tablerow.appendChild(headerRow);
    job.forEach((emp,i) => {
        let row = document.createElement('tr');
        Object.values(emp).forEach((text,i) => {
            let cell = document.createElement('td');
            cell.innerHTML = `${text}`
            row.appendChild(cell);
        })
        table.appendChild(row);
    });
    } )

}
main()


form.addEventListener("submit",async(event)=>{
    event.preventDefault()
    var job = document.getElementById("job").value
    const response = await fetch('http://localhost:9090/Job/AddJob',{
        method:'post',
        headers:{   
            'Content-Type':'application/json'    
        },
        body: JSON.stringify({
            "job":job
        })

    })
    const responseStatus = await response.json();
    console.log(responseStatus)
})
const logout =()=>{
    window.localStorage.clear();
    window.location.href = './login.html'
}