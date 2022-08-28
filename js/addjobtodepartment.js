var select = document.getElementById("demo");
var form = document.getElementById("form")
var selectjob = document.getElementById("job")
var checktoken = localStorage.getItem("tokenlogin")

var editdepartment,editjobname,keeprow

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
    headerRow.insertCell(Object.keys(job[0]).length).innerHTML = "Edit"
    headerRow.insertCell(Object.keys(job[0]).length+1).innerHTML = "Delete"
    tablerow.appendChild(headerRow);
    job.forEach((emp,i) => {
        let row = document.createElement('tr');
        Object.values(emp).forEach((text,i) => {
          let cell = document.createElement('td');
          cell.innerHTML = `${text}`
            if(i == 0){
              department = text;
          }
          else if(i ==1){
              member = text
          }
          row.appendChild(cell);
      })
      let celledit = document.createElement('td');
      let celldelete = document.createElement('td');
      let rows = table.rows.length;

      
      celledit.innerHTML = `<button onclick="editjob('${department}','${member}','${rows}')" class="btn edit"><i class='bx bx-edit-alt' ></i></button>`
      
      row.appendChild(celledit);
      celldelete.innerHTML = `<button onclick="deletejob('${department}','${member}',${rows})" class="btn delete"><i class='bx bxs-trash-alt'></i></button>`
      row.appendChild(celldelete);

      table.appendChild(row);    });
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
const deletejob=(department,job,rows)=>{
  Swal.fire({
      title: `Do you want to Delete?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        const response = await fetch('http://localhost:9090/Department/DeleteJobDepartment',{
        method:'post',
        headers:{   
            'Content-Type':'application/json'    
        },
        body: JSON.stringify({
            "department":department,
            "job":job,
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
            document.getElementById('mytable').tBodies[0].deleteRow(rows)
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
}
const editjob=(id,namejob,row)=>{
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  var span = document.getElementsByClassName("closes")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  let table = document.getElementById('mytable').tBodies[0]
  console.log(id,row)
  var rowdepartment = table.rows[row].cells[0];
  var rowjob = table.rows[row].cells[1];
  document.getElementById("inputdepartment").value = rowdepartment.innerHTML;
  document.getElementById("inputjob").value = rowjob.innerHTML;
  editdepartment = rowdepartment.innerHTML;
  editjobname = rowjob.innerHTML;

  var editselectdepartment = document.getElementById("editdepartment");
  var editselectjob = document.getElementById("editjob");
  editselectjob.innerText = null;


  fetch('http://localhost:9090/Department/AllDepartment')
  .then(res => res.json())
  .then(data =>{
    // var job = data.job
    var department = data.Department
    for (var i=0;i<department.length+1;i++){
        if(i==0){
          editselectdepartment.options[i] = new Option("Please Select Department");
          editselectjob[i] = new Option("Please Select Department To Add Job");            
        }
        else{
          editselectdepartment.options[i] = new Option(department[i-1].Department_Name,department[i-1].ID);
        }
    }
  } )
  keeprow = row
}
const editjobdepartment=async()=>{
  var editselectdepartment = document.getElementById("editdepartment");
  var editselectjob = document.getElementById("editjob");
  
  editselectjob.innerText = null;
  if(editselectdepartment.selectedIndex == 0){
    editselectjob[0]= new Option("Please Select Department To Add Job");
  }
  else if(editselectdepartment.selectedIndex != 0){
    const response = await fetch('http://localhost:9090/Job/OptionJob?' + new URLSearchParams({
      IdDepartment: editselectdepartment.value
    }))
    const responsedata = await response.json();
    var job = responsedata.job
    for(j = 0;j<job.length;j++){
      editselectjob[j]= new Option(job[j].JOB,job[j].ID);
    }
  }
}

const editsubmit=()=>{
  var select = document.getElementById("editdepartment");
  var selectjob = document.getElementById("editjob")
  Swal.fire({
    title: 'Do you want to Save?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't Save`,
}).then(async(result) => {
    if (result.isConfirmed) {
    const response = await fetch('http://localhost:9090/Department/EditJobDepartment',{
        method:'post',
        headers:{   
            'Content-Type':'application/json'    
        },
        body: JSON.stringify({
            "iddepartment":select.value,
            "idjob":selectjob.value,
            "olddepartment":editdepartment,
            "oldjob":editjobname
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
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
            let table = document.getElementById('mytable').tBodies[0]
            var tableeditdepartment = table.rows[keeprow].cells[0];
            var tableeditjob = table.rows[keeprow].cells[1];
            tableeditdepartment.innerHTML = `<td>${select[select.selectedIndex].innerText}</td>`
            tableeditjob.innerHTML=`<td>${selectjob[selectjob.selectedIndex].innerText}</td>`
        }
    
    } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
    }
})
}
const cancel=()=>{
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
const logout =()=>{
  window.localStorage.clear();
  window.location.href = './login.html'
}

