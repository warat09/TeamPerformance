var select = document.getElementById("departments");
var selectjob = document.getElementById("member")
var form = document.getElementById("form")
selectjob[0]= new Option("pls select department to add job");
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
    fetch('http://localhost:9090/Department/AllMemberDepartment')
    .then(res => res.json())
    .then(data =>{
        let job = data.MemberDepartment;
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

fetch('http://localhost:9090/Department/AllDepartment')
  .then(res => res.json())
  .then(data =>{
    // var job = data.job
    var department = data.Department
    console.log(department)
    for (var i=0;i<department.length+1;i++){
        if(i==0){
          select.options[i] = new Option("selectdepartment");            
        }
        else{
            select.options[i] = new Option(department[i-1].Department_Name,department[i-1].ID);
        }
    }
  } )

  form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    if(select.selectedIndex !=0){
      const response = await fetch('http://localhost:9090/Member/AddMemberToDepartment',{
          method:'post',
          headers:{
              'Content-Type':'application/json'    
          },
          body: JSON.stringify({
              "member":selectjob.value,
              "department":select.value
          })
      })

      const responseStatus = await response.json();
      console.log(responseStatus)
        selectjob.remove(selectjob.selectedIndex)
    }

})
async function myFunction () {
  selectjob.innerText = null;
  if(select.selectedIndex != 0){
    const response = await fetch('http://localhost:9090/Member/OptionMember?' + new URLSearchParams({
      IdDepartment: select.value
    }))
    const responsedata = await response.json();
    var member = responsedata.member
    for(j = 0;j<=member.length-1;j++){
      selectjob[j]= new Option(member[j].Member_Fname,member[j].ID);
    }
  }
  else{
    selectjob[0]= new Option("pls select");
  }
}

const logout =()=>{
  window.localStorage.clear();
  window.location.href = './login.html'
}


