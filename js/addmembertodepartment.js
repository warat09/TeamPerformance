var select = document.getElementById("department");
var form = document.getElementById("form")
var selectjob = document.getElementById("member")
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

fetch('http://localhost:9090/Department/AllDepartment')
  .then(res => res.json())
  .then(data =>{
    // var job = data.job
    var department = data.Department
    for (i=0;i<department.length+1;i++){
        if(i==0){
            select.options[i] = new Option("selecysepartment");
        }
        else{
            select.options[i] = new Option(department[i-1].Department_Name,department[i-1].ID);
        }
    }
  } )

  form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    var x = document.getElementById("department");
    var y = document.getElementById("member");

    if(x.selectedIndex !=0){
      const response = await fetch('http://localhost:9090/Member/AddMemberToDepartment',{
          method:'post',
          headers:{
              'Content-Type':'application/json'    
          },
          body: JSON.stringify({
              "member":y.value,
              "department":x.value
          })
      })

      const responseStatus = await response.json();
      console.log(responseStatus)
        selectjob.remove(selectjob.selectedIndex)
    }

})
async function myFunction () {
  var x = document.getElementById("department");
  selectjob.innerText = null;


  console.log(x)
  if(x.selectedIndex != 0){
    const response = await fetch('http://localhost:9090/Member/OptionMember?' + new URLSearchParams({
      IdDepartment: x.value
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


