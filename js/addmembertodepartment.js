var select = document.getElementById("departments");
var selectjob = document.getElementById("member")

var form = document.getElementById("form")
var checktoken = localStorage.getItem("tokenlogin")

var editdepartment,editmember,keeprow
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
              <li><a href="./AddJobToDepartment.html">AddJobToDepartment</a></li>
              <li><a class="active" href="./AddMemberToDepartment.html">AddMemberToDepartment</a></li>
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
    fetch('http://localhost:9090/Department/AllMemberDepartment')
    .then(res => res.json())
    .then(data =>{
        let job = data.MemberDepartment;
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]
        Object.keys(job[0]).forEach((headerText,i) => {
            var newTH = document.createElement('th');
            console.log(headerText,i)
            if(i ==0){
              newTH.className = "before"
            }
            newTH.innerHTML = `${headerText}`
            
            headerRow.appendChild(newTH)

    });
    headerRow.insertCell(Object.keys(job[0]).length).innerHTML = "Edit"
    headerRow.insertCell(Object.keys(job[0]).length+1).innerHTML = "Delete"
    tablerow.appendChild(headerRow);
    let department,member
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
          select.options[i] = new Option("Please Select Department");
          selectjob[i]= new Option("Please Select Department To Add Member");            
        }
        else{
            select.options[i] = new Option(department[i-1].Department_Name,department[i-1].ID);
        }
    }
  } )

  form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    if(select.selectedIndex !=0){
      Swal.fire({
        title: 'Do you want to Add?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Add',
        denyButtonText: `Don't Add`,
      }).then(async(result) => {
        if (result.isConfirmed) {
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
            if(responseStatus.status ==0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${responseStatus.message}`,
                    footer: '<a href="">Why do I have this issue?</a>'
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
    selectjob[0]= new Option(" Please Select Department To Add Member");
  }
}

const deletejob=(department,member,row)=>{
  console.log(department,member,row)
  Swal.fire({
      title: `Do you want to Delete?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        const response = await fetch('http://localhost:9090/Department/DeleteMemberDepartment',{
        method:'post',
        headers:{   
            'Content-Type':'application/json'    
        },
        body: JSON.stringify({
            "department":department,
            "member":member,
        })
    })
    const responseStatus = await response.json();
    console.log(responseStatus)
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
            // var tableeditdepartment = table.rows[keeprow].cells[0];
            // var tableeditmember = table.rows[keeprow].cells[1];
            // console.log(keeprow)
            // tableeditdepartment.innerHTML = `<td>${select[select.selectedIndex].innerText}</td>`
            // tableeditmember.innerHTML=`<td>${selectjob[selectjob.selectedIndex].innerText}</td>`
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
  var rowmember = table.rows[row].cells[1];
  document.getElementById("inputdepartment").value = rowdepartment.innerHTML;
  document.getElementById("inputmember").value = rowmember.innerHTML;
  editdepartment = rowdepartment.innerHTML;
  editmember = rowmember.innerHTML;
  // var editbutton = table.rows[row].cells[2];
  // editdepartment.innerHTML = `<td><select id="editdepartment" onchange="editmemberdepartment()"></select></td>` 
  // edittext.innerHTML = `<td><select id="editmember"></select></td>`
  // editbutton.innerHTML=`<td><button onclick="savejob('${id}','${namejob}','${row}')" class="btn save"><i class='bx bxs-save' ></i></button></td>`

  var editselectdepartment = document.getElementById("editdepartment");
  var editselectmember = document.getElementById("editmember");
  editselectmember.innerText = null;


  fetch('http://localhost:9090/Department/AllDepartment')
  .then(res => res.json())
  .then(data =>{
    // var job = data.job
    var department = data.Department
    console.log(department)
    for (var i=0;i<department.length+1;i++){
        if(i==0){
          editselectdepartment.options[i] = new Option("Please Select Department");
          editselectmember[i] = new Option("Please Select Department To Add Member");            
        }
        else{
          editselectdepartment.options[i] = new Option(department[i-1].Department_Name,department[i-1].ID);
        }
    }
  } )
  keeprow = row
}
const editmemberdepartment=async()=>{
  var editselectdepartment = document.getElementById("editdepartment");
  var editselectmember = document.getElementById("editmember");
  
  editselectmember.innerText = null;
  if(editselectdepartment.selectedIndex == 0){
    editselectmember[0]= new Option("Please Select Department To Add Member");
  }
  else if(editselectdepartment.selectedIndex != 0){
    const response = await fetch('http://localhost:9090/Member/OptionMember?' + new URLSearchParams({
      IdDepartment: editselectdepartment.value
    }))
    const responsedata = await response.json();
    var member = responsedata.member
    console.log(member)
    console.log(member.length)
    for(j = 0;j<member.length;j++){
      editselectmember[j]= new Option(member[j].Member_Fname,member[j].ID);
    }
  }
}

const editsubmit=()=>{
  var select = document.getElementById("editdepartment");
  var selectjob = document.getElementById("editmember")
  Swal.fire({
    title: 'Do you want to Save?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't Save`,
}).then(async(result) => {
    if (result.isConfirmed) {
      console.log(select.value,selectjob.value)
      console.log(editdepartment,editmember)
    const response = await fetch('http://localhost:9090/Department/EditMemberDepartment',{
        method:'post',
        headers:{   
            'Content-Type':'application/json'    
        },
        body: JSON.stringify({
            "iddepartment":select.value,
            "idmember":selectjob.value,
            "olddepartment":editdepartment,
            "oldmember":editmember
        })
    })
    const responseStatus = await response.json();
    console.log(responseStatus)
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
            var tableeditmember = table.rows[keeprow].cells[1];
            console.log(keeprow)
            tableeditdepartment.innerHTML = `<td>${select[select.selectedIndex].innerText}</td>`
            tableeditmember.innerHTML=`<td>${selectjob[selectjob.selectedIndex].innerText}</td>`
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


