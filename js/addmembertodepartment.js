var select = document.getElementById("department");
var form = document.getElementById("form")
var selectjob = document.getElementById("member")
selectjob[0]= new Option("pls select department to add job");


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

    if(x.selectedIndex !=0 && y.selectedIndex !=0){
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
      selectjob[j]= new Option(member[j].MEMBER,member[j].ID);
    }
  }
  else{
    selectjob[0]= new Option("pls select");
  }
}

