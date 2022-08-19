var select = document.getElementById("member");
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
        var setting = document.getElementById("setting");
        if (Item.menuId === 7) {
            var menu = `
            <ul>
                <li><a href="./">Home</a></li>
                <li><a href="./AddJob.html">AddJob</a></li>
                <li><a class="active" href="./AddMember.html">AddMember</a></li>
                <li><a href="./AddDepartment.html">AddDepartment</a></li>
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
    fetch('http://localhost:9090/Member/AllMember')
    .then(res => res.json())
    .then(data =>{
        let member = data.member;
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]
        let counttable = Object.keys(member[0]).length-1

        Object.keys(member[0]).forEach((headerText,i) => {
            console.log(counttable)
            var newTH = document.createElement('th');
            if(i ==0){
                newTH.className = "before"
            }
            newTH.innerHTML = `${headerText}`
            headerRow.appendChild(newTH)

    });
    headerRow.insertCell(Object.keys(member[0]).length).innerHTML = "Edit"
    headerRow.insertCell(Object.keys(member[0]).length+1).innerHTML = "Delete"
    tablerow.appendChild(headerRow);
    let id,uname,fname
    member.forEach((emp,i) => {
        let row = document.createElement('tr');
        Object.values(emp).forEach((text,i) => {
            let cell = document.createElement('td');
            cell.innerHTML = `${text}`
            if(i == 0){
                id = text;
            }
            else if(i ==1){
                uname = text
            }
            else if(i == 2){
                fname = text
            }
            row.appendChild(cell);
        })
        let celledit = document.createElement('td');
        let celldelete = document.createElement('td');
        let rows = table.rows.length;

        
        celledit.innerHTML = `<button onclick="editjob('${id}','${uname}','${fname}','${rows}')" class="btn edit"><i class='bx bx-edit-alt' ></i></button>`
        
        row.appendChild(celledit);
        celldelete.innerHTML = `<button onclick="deletejob('${id}','${uname}','${fname}','${rows}')" class="btn delete"><i class='bx bxs-trash-alt'></i></button>`
        row.appendChild(celldelete);
        table.appendChild(row);
    });
    } )
}
main()

fetch('http://bwc-webserv02.bdms.co.th:3300/bwcportaluser/api/list/user')
  .then(res => res.json())
  .then(result =>{
    // var job = data.job
    var member = result.data
    for (i=0;i<member.length+1;i++){
        if(i==0){
            select.options[i] = new Option("SelectMember");
        }
        else{
            select.options[i] = new Option(member[i-1].userFname,member[i-1].userName);
        }
    }
  } )
  form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    var idxselect =select.selectedIndex;
    var textselect = select.options[idxselect].text;
    var valueselect = select.value;
    if(select.selectedIndex !=0){
        Swal.fire({
            title: 'Do you want to Add?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Add',
            denyButtonText: `Don't Add`,
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                      const response = await fetch('http://localhost:9090/Member/AddMember',{
            method:'post',
            headers:{
                'Content-Type':'application/json'    
            },
            body: JSON.stringify({
                "userName":valueselect,
                "userFname":textselect
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
                    select.remove(select.selectedIndex)
                    Swal.fire(`${responseStatus.message}`, '', 'success')
                }
            
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
      }

})
const editjob=(id,uname,fname,row)=>{
    let table = document.getElementById('mytable').tBodies[0]
    console.log(id,uname,fname,row)
    var edittext = table.rows[row].cells[2];
    var editbutton = table.rows[row].cells[3];
    edittext.innerHTML = `<td><input type="text" id="row-${row}_col-2" value="${fname}"/></td>`
    editbutton.innerHTML=`<td><button onclick="savejob('${id}','${uname}','${row}')" class="btn save"><i class='bx bxs-save' ></i></button></td>`
}
const savejob=async(id,uname,row)=>{
    var inputmember = document.getElementById(`row-${row}_col-2`)
    let table = document.getElementById('mytable').tBodies[0]
    var edittext = table.rows[row].cells[2];
    var editbutton = table.rows[row].cells[3];
    var deletebutton = table.rows[row].cells[4];


    Swal.fire({
        title: 'Do you want to Save?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't Save`,
    }).then(async(result) => {
        if (result.isConfirmed) {
            console.log(inputmember.value)
        const response = await fetch('http://localhost:9090/Member/EditMember',{
            method:'post',
            headers:{   
                'Content-Type':'application/json'    
            },
            body: JSON.stringify({
                "id":id ,
                "uname":uname,
                "fname":inputmember.value
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
                edittext.innerHTML = `<td>${inputmember.value}</td>`
                editbutton.innerHTML=`<td><button onclick="editjob('${id}','${uname}','${inputmember.value}','${row}')" class="btn edit"><i class='bx bx-edit-alt' ></i></button></td>`
                deletebutton.innerHTML = `<td><button onclick="deletejob('${id}','${inputmember.value}','${row}')" class="btn save"><i class='bx bxs-save' ></i></button></td>`
            }
        } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
        }
    })
}
const deletejob=(id,fname,rows)=>{
    Swal.fire({
        title: `Do you want to Delete ${fname}?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
      }).then(async(result) => {
        if (result.isConfirmed) {
            const response = await fetch('http://localhost:9090/Member/DeleteMember',{
                    method:'post',
                    headers:{   
                        'Content-Type':'application/json'    
                    },
                    body: JSON.stringify({
                        "id":id,
                        "fname":fname
                    })
                })
            const responseStatus = await response.json();
            if(responseStatus.status == 1){
                Swal.fire(`${responseStatus.message}`, '', 'success')
                document.getElementById('mytable').tBodies[0].deleteRow(rows)
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${responseStatus.message}`,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
}
const logout =()=>{
    window.localStorage.clear();
    window.location.href = './login.html'
}