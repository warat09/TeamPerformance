var select = document.getElementById("demo");
var form = document.getElementById("form")
var selectjob = document.getElementById("job")
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
              <li><a href="./AddDepartment.html">AddDepartment</a></li>
              <li><a  class="active" href="./AddJobToDepartment.html">AddJobToDepartment</a></li>
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
    fetch('http://localhost:9090/Department/AllJobDepartment')
    .then(res => res.json())
    .then(data =>{
        let job = data.JobDepartment;
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]

        Object.keys(job[0]).forEach((headerText,i) => {
            var newTH = document.createElement('th');
            if(i ==0){
              newTH.className = "before"
            }
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

selectjob[0]= new Option("Please Select Department to Add Job");

fetch('http://localhost:9090/Department/AllDepartment')
  .then(res => res.json())
  .then(data =>{
    // var job = data.job
    var department = data.Department
    for (i=0;i<department.length+1;i++){
        if(i==0){
            select.options[i] = new Option("Please Select Department");
        }
        else{
            select.options[i] = new Option(department[i-1].Department_Name,department[i-1].ID);
        }
    }
  } )

  form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    var x = document.getElementById("demo");
    var y = document.getElementById("job");

    console.log("Department id is ",x.value)
    console.log("Job id is ",y.value)
    console.log("Department index is ",x.selectedIndex)
    console.log("Job index is ",y.selectedIndex)
    if(x.selectedIndex !=0){
      Swal.fire({
        title: 'Do you want to Add?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Add',
        denyButtonText: `Don't Add`,
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const response = await fetch('http://localhost:9090/Job/AddJobToDepartment',{
          method:'post',
          headers:{
              'Content-Type':'application/json'    
          },
          body: JSON.stringify({
              "job":y.value,
              "department":x.value
          })
      })

      const responseStatus = await response.json();
      console.log(responseStatus)
            if(responseStatus.status ==0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${responseStatus.message}`,
                })
            }
            else{
                selectjob.remove(selectjob.selectedIndex)
                Swal.fire(`${responseStatus.message}`, '', 'success')
            }
        
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
      
    }

})
async function myFunction () {
  var x = document.getElementById("demo");
  selectjob.innerText = null;


  console.log(x)
  if(x.selectedIndex != 0){
    const response = await fetch('http://localhost:9090/Job/OptionJob?' + new URLSearchParams({
      IdDepartment: x.value
    }))
    const responsedata = await response.json();
    var job = responsedata.job
    console.log(job.length)
    for(j = 0;j<=job.length-1;j++){
      selectjob[j]= new Option(job[j].JOB,job[j].ID);
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

