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
    fetch('http://localhost:9090/Department/AllDepartment')
    .then(res => res.json())
    .then(data =>{
        let department = data.Department;
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]

        Object.keys(department[0]).forEach((headerText,i) => {
            var newTH = document.createElement('th');
            if(i==0){
                newTH.className = "before"
            }
            newTH.innerHTML = `${headerText}`     
            headerRow.appendChild(newTH)
    });
    headerRow.insertCell(Object.keys(department[0]).length).innerHTML = "Edit"
    headerRow.insertCell(Object.keys(department[0]).length+1).innerHTML = "Delete"
    tablerow.appendChild(headerRow);
    let id,namejob
    department.forEach((emp,i) => {
        let row = document.createElement('tr');
        Object.values(emp).forEach((text,i) => {
            let cell = document.createElement('td');
            cell.innerHTML = `${text}`
            if(i == 0){
                id = text;
            }
            else if(i ==1){
                namejob = text
            }
            row.appendChild(cell);
        })
        let celledit = document.createElement('td');
        let celldelete = document.createElement('td');
        let rows = table.rows.length;
        celledit.innerHTML = `<button onclick="editdepartment('${id}','${namejob}','${rows}')" class="btn edit"><i class='bx bx-edit-alt' ></i></button>`
        
        row.appendChild(celledit);
        celldelete.innerHTML = `<button onclick="deletedepartment('${id}','${namejob}','${rows}')" class="btn delete"><i class='bx bxs-trash-alt'></i></button>`
        row.appendChild(celldelete);
        table.appendChild(row);
    });
    } )

}
main()

form.addEventListener('submit',async(event)=>{
 event.preventDefault()
 var inputdepartment = document.getElementById("adddepartment").value
Swal.fire({
    title: 'Do you want to Add?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Add',
    denyButtonText: `Don't Add`,
  }).then(async(result) => {
    var table = document.getElementById('mytable').tBodies[0]
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
                var rows = table.rows.length
                var adddepartment = table.insertRow(table.rows.length)
                var cell1 = adddepartment.insertCell(0);
                var cell2 = adddepartment.insertCell(1);
                var cell3 = adddepartment.insertCell(2);
                var cell4 = adddepartment.insertCell(3);
                cell1.innerHTML = responseStatus.value[0].ID;
                cell2.innerHTML = responseStatus.value[0].Department_Name;
                cell3.innerHTML = `<button onclick="editdepartment('${responseStatus.value[0].ID}','${responseStatus.value[0].Department_Name}','${rows}')" class="btn edit"><i class='bx bx-edit-alt' ></i></button>`
                cell4.innerHTML = `<button onclick="deletedepartment('${responseStatus.value[0].ID}','${responseStatus.value[0].Department_Name}','${rows}')" class="btn delete"><i class='bx bxs-trash-alt'></i></button>`
        }
    
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })

 })

 const deletedepartment=(id,namedepartment,rows)=>{
    console.log(id,namedepartment)
    Swal.fire({
        title: `Do you want to Delete ${namedepartment}?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
      }).then(async(result) => {
        if (result.isConfirmed) {
            console.log("delete",id,namedepartment)
            const response = await fetch('http://localhost:9090/Department/DeleteDepartment',{
                    method:'post',
                    headers:{   
                        'Content-Type':'application/json'    
                    },
                    body: JSON.stringify({
                        "id":id ,
                        "department":namedepartment
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
const editdepartment=(id,namejob,row)=>{
    let table = document.getElementById('mytable').tBodies[0]
    console.log(id,row)
    var edittext = table.rows[row].cells[1];
    var editbutton = table.rows[row].cells[2];
    edittext.innerHTML = `<td><input type="text" id="row-${row}_col-1" value="${namejob}"/></td>`
    editbutton.innerHTML=`<td><button onclick="savedepartment('${id}','${namejob}','${row}')" class="btn save"><i class='bx bxs-save' ></i></button></td>`
}
const savedepartment=async(id,namejob,row)=>{
    var inputjob = document.getElementById(`row-${row}_col-1`)
    let table = document.getElementById('mytable').tBodies[0]
    var edittext = table.rows[row].cells[1];
    var editbutton = table.rows[row].cells[2];
    var deletebutton = table.rows[row].cells[3];


    Swal.fire({
        title: 'Do you want to Save?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't Save`,
    }).then(async(result) => {
        if (result.isConfirmed) {
        const response = await fetch('http://localhost:9090/Department/EditDepartment',{
            method:'post',
            headers:{   
                'Content-Type':'application/json'    
            },
            body: JSON.stringify({
                "id":id ,
                "olddepartment":namejob,
                "newdepartment":inputjob.value
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
                edittext.innerHTML = `<td>${inputjob.value}</td>`
                editbutton.innerHTML=`<td><button onclick="editdepartment('${id}','${inputjob.value}','${row}')" class="btn edit"><i class='bx bx-edit-alt' ></i></button></td>`
                deletebutton.innerHTML=`<td><button onclick="deletedepartment('${id}','${inputjob.value}','${row}')" class="btn delete"><i class='bx bxs-trash-alt'></i></button></td>`
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