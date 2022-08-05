var select = document.getElementById("member");
var selectjob = document.getElementById("job");
var selectremovejob = document.getElementById("removejob");
var selectchangedepartment = document.getElementById("changedepartment")
var department = document.getElementById("department")
var Userdata = JSON.parse(localStorage.getItem("data"))
var member,job
var keepid

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
     for (i=0;i<resultresponse.length;i++){
        selectchangedepartment.options[i] = new Option(resultresponse[i].Department_Name,resultresponse[i].ID);
    }
    department.innerHTML = await selectchangedepartment.options[selectchangedepartment.selectedIndex].innerHTML;
    keepid = await selectchangedepartment.options[selectchangedepartment.selectedIndex].value
    fetch('http://localhost:9090/Member/OptionMemberDepartment?' + new URLSearchParams({
    IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
    }))
    .then(res => res.json())
    .then(result =>{
    // var job = data.job
    member = result.member
    console.log(member)
    for (i=0;i<member.length+1;i++){
        if(i==0){
            select.options[i] = new Option("SelectMember");
        }
        else{
            select.options[i] = new Option(member[i-1].Member_Fname,member[i-1].ID);
        }
    }
    } )
    fetch("http://localhost:9090/Job/OptionJobDepartment?" + new URLSearchParams({
    IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
    }))
    .then(res => res.json())
    .then(result =>{
    job = result.job
    for (i=0;i<job.length+1;i++){
        if(i==0){
            selectjob.options[i] = new Option("SelectJob");
        }
        else{
            selectjob.options[i] = new Option(job[i-1].JOB,job[i-1].ID);
        }
    }
    } )
    fetch("http://localhost:9090/Job/OptionRemoveJobScore?" + new URLSearchParams({
        IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
    }))
    .then(res => res.json())
    .then(result =>{
    job = result.job
    for (i=0;i<job.length+1;i++){
        if(i==0){
            selectremovejob.options[i] = new Option("SelectRemoveJob");
        }
        else{
            selectremovejob.options[i] = new Option(job[i-1].JOB,job[i-1].ID);
        }
    }
    } )
    fetch('http://localhost:9090/Member/AllScore?'+ new URLSearchParams({
        IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
     }))
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        let employees = data.Body
        let headers = data.Head;
        let Member = data.BodyMember;
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]
        console.log("Member",Member)
        console.log("employees",employees)

        headers.forEach(headerText => {
            var newTH = document.createElement('th');
            
            tablerow.rows[0].appendChild(newTH);
            newTH.style.width = "150px";
            newTH.innerHTML = `${headerText}`

        // headerRow.appendChild(header);
        // tablerow.appendChild(headerRow);

    });

    // tablerow.appendChild(headerRow);
    // Member.forEach((m,i)=>{
    //     let row = document.createElement('tr');
    //     row.innerHTML = `<td><input type="checkbox" name="record"></td>`
    //     console.log("name",i)
        
    // })
    employees.forEach((emp,i) => {
        let row = document.createElement('tr');
        row.innerHTML = `<td><input type="checkbox" name="record"></td>`
        

        Object.values(emp).forEach((text,i) => {
            let cell = document.createElement('td');
            if(i == 0){
                cell.innerHTML = `<td >${text}</td>`
            }
            if(i > 0){
                cell.innerHTML = `<td><input type="number" min="0" max="5" name="array[]" id="row-`+(table.rows.length)+`_col-`+(i+1)+`" `+`value="${text}"/></td>`
            }
            row.appendChild(cell);
        })
        table.appendChild(row);
    });
    } )
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

const addmember=async()=>{
//     const response = await fetch('http://localhost:9090/Member/AddMemberScore',{
//     method:'post',
//     headers:{   
//         'Content-Type':'application/json'    
//     },
//     body: JSON.stringify({
//         "Member_ID":member[select.selectedIndex-1].ID,
//         "Member_Name":member[select.selectedIndex-1].Member_Name,
//         "Member_Fname":member[select.selectedIndex-1].Member_Fname
//     })

// })
// const responseStatus = await response.json();
// console.log(responseStatus)
let table = document.getElementById("mytable")
var totalRowCount = table.tBodies[0].rows.length;
var tbodyColumnCount = table.rows[0].cells.length;
var row = table.tBodies[0].insertRow(totalRowCount);

for(let i = 0;i < tbodyColumnCount;i++){
var cell2 = row.insertCell(i);
    if(i == 0){
        cell2.innerHTML = `<td><input type="checkbox" name="record"></td>`
    }
    else if(i==1){
        cell2.innerHTML = `<td>${select.options[select.selectedIndex].text}</td>`
    }
    else{
        cell2.innerHTML = `<td><input type="number" min="0" max="5" name="array[]" id="row-`+(table.tBodies[0].rows.length-1)+`_col-`+(i)+`" `+`value="0"/></td>`
    }
                // cell2.innerHTML = '[td] row:' + (table.tBodies[0].rows.length-1) + ', cell: '+i
}
select.remove(select.selectedIndex)
var totalRowCount = table.tBodies[0].rows.length;
var tbodyColumnCount = table.rows[0].cells.length;
console.log("rows is",totalRowCount)
console.log("columns is",tbodyColumnCount)
}

const addjob=async()=>{
//     const response = await fetch('http://localhost:9090/Job/AddJobScore',{
//     method:'post',
//     headers:{   
//         'Content-Type':'application/json'    
//     },
//     body: JSON.stringify({
//         "Job_ID":job[selectjob.selectedIndex-1].ID,
//         "Job_Name":job[selectjob.selectedIndex-1].JOB        
//     })
// })
// const responseStatus = await response.json();
// console.log(responseStatus)
        let table = document.getElementById("mytable")
        var tblHeadObj = document.getElementById("mytable").tHead;

        var totalRowCount = table.tBodies[0].rows.length;
        var tbodyColumnCount = table.rows[0].cells.length;

        if(selectjob.options[selectjob.selectedIndex].index == 0){
            alert("pls select remove")
        }
        else{
            for (var h=0; h<tblHeadObj.rows.length; h++) {
                var newTH = document.createElement('th');
                tblHeadObj.rows[h].appendChild(newTH);
                newTH.innerHTML = `${selectjob.options[selectjob.selectedIndex].text}`
                // <h2>adsadas</h2>
                // '[th] row:' + h + ', cell: ' + (tblHeadObj.rows[h].cells.length - 1)
            }
            var tblBodyObj = document.getElementById("mytable").tBodies[0];
            for (var i=0; i<tblBodyObj.rows.length; i++) {
                var newCell = tblBodyObj.rows[i].insertCell(-1);
                newCell.innerHTML = `<td><input type="number" min="0" max="5" name="array[]" id="row-${i}_col-`+(tblBodyObj.rows[i].cells.length - 1)+`" `+`value="0"/></td>`
                // newCell.innerHTML ='[th] row:' + i + ', cell: ' + (tblBodyObj.rows[i].cells.length - 1)
            }
                var option = document.createElement("option");
                option.value = selectjob.options[selectjob.selectedIndex].value;
                option.text = selectjob.options[selectjob.selectedIndex].text;
                selectremovejob.add(option);
                selectjob.remove(selectjob.selectedIndex)
        }
        
        // selectremovejob.add(selectjob.options[selectjob.selectedIndex])
        
        
}
const onClick=async()=>{
    Swal.fire({
        title: 'Do you want to Submit?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Submit',
        denyButtonText: `Don't Submit`,
      }).then(async(result) => {
        if (result.isConfirmed) {
            var selectchangedepartment = document.getElementById("changedepartment")

            var tRows = [];
            var tRowsh = [];
        
            tab = document.getElementById('mytable').tBodies[0];
            tabh = document.getElementById('mytable');
            var n = 0;
        
            for (var r = 0; r < tab.rows.length; r++) {
            var tRow = [];// start new row array
            for (var c = 1; c < tab.rows[r].cells.length; c++) {
                var input = document.getElementsByName('array[]');
                if(r==0){
                    tRowsh[c-1] = tabh.rows[r].cells[c].innerHTML;
                }
                // console.log(tRow[c-1]);
                if(c==1){
                    tRow[0] = tab.rows[r].cells[1].innerHTML;
                }
                if(c<=tab.rows[r].cells.length-2 && n<input.length){
                        tRow[c] = input[n].value;
                        n++
                }
                // console.log(tabh.rows[r].cells[1].innerHTML)
                    // console.log("hhhhhh",input)
                    // console.log(c)
        
                        // tRow[c-1] = input[i].value;
                        // console.log(tRow);
                        // tRow[1] = 1;
                        // tRow[2] = 1;
                        // tRow[3] = 1;
        
                console.log(`row = ${r},col = ${c}`)
        
            }
            tRows.push(tRow);
            }
            console.log(tRows);
            console.log(tRowsh)
        
            //             let rows = [
            // ["col1val1", "09", "26", "1"],
            // ["col1val2", "08", "59", "1"],
            // ["col1val3", "09", "22", "1"]
            // ];
        
            // let columnsNames = ["col1", "col2", "col3", "col4"];
        
            const newRows = tRows.map(row => {
            const object = row.reduce((obj, entry, index) => {
                return {
                ...obj,
                [tRowsh[index]]: entry
                };
            }, {});
        
            return {
                ...object
            };
            });
            const response = await fetch('http://localhost:9090/Member/MemberScore',{
                method:'post',
                headers:{
                    'Content-Type':'application/json'    
                },
                body: JSON.stringify({
                    "score":newRows,
                    "rowname":tRowsh,
                    "IdDepartment": selectchangedepartment.options[selectchangedepartment.selectedIndex].value   
                })
        
            })
        
            const responseData = await response.json();
            console.log(responseData)
            if(responseData.status ==0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${responseData.message}`,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
            else{
                Swal.fire(`${responseData.message}`, '', 'success')
            }
        
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    // let inputValue = document.getElementById("row-0_col-2").value;
    // let sum = Number(test1) + Number(test2) + Number(test3);
    //  alert(inputValue)

}
const removeuser=async()=>{


    var table = document.getElementById("mytable").tBodies[0];
    var rowCount = table.rows.length;
    // console.log(rowCount)

    var memberremove=[]
    for(var i=0; i<rowCount; i++){
        var row = table.rows[i];
        // index of td contain checkbox is 8
        var chkbox = row.cells[0].getElementsByTagName('input')[0];
        console.log(i)
        console.log(chkbox)
        if('checkbox' == chkbox.type && true == chkbox.checked) {
            // console.log(row.cells[1].innerHTML)
            memberremove.push(row.cells[1].innerHTML)
        }
    }
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
            // console.log(Userdata.userName)
            console.log(memberremove)
            console.log(selectchangedepartment.options[selectchangedepartment.selectedIndex].value)
            const response = await fetch('http://localhost:9090/Member/RemoveScore',{
                method:'post',
                headers:{
                    'Content-Type':'application/json'    
                },
                body: JSON.stringify({
                    userName: Userdata.userName,
                    MemberRemove:memberremove,
                    IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
                })
            })
            const responseData = await response.json();
            console.log(responseData)
            if(responseData.status == 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `=`,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
            else{
                for(var i=0; i<rowCount; i++){
                    var row = table.rows[i];
                    // index of td contain checkbox is 8
                    var chkbox = row.cells[0].getElementsByTagName('input')[0];
                    console.log(i)
                    console.log(chkbox)
                    if('checkbox' == chkbox.type && true == chkbox.checked) {
                        // console.log(row.cells[1].innerHTML)
                        table.deleteRow(i)
                        rowCount--
                        i--
                    }
                }
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
            }
        }
      })
}
const removework=async()=> {
    var selectchangedepartment = document.getElementById("changedepartment")
    
    var tble = document.getElementById('mytable');
    var select = document.getElementById("removejob");
    var option = document.getElementById("removejob").options;
    var x = document.getElementById("removejob").selectedIndex;
    var row = tble.rows; // Getting the rows
    if(option[x].index == 0){
        alert("pls select remove")
    }
    else{
        for (var i = 0; i < row[0].cells.length; i++) {
        // Getting the text of columnName
            var str = row[0].cells[i].innerHTML;
            console.log("str",str)
            console.log("option value",option[x].text)
            console.log(i)

            if(str == option[x].text) { 
                if(i==0 || i==1){
                    alert("no")
                    break
                }
                else{
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                      }).then(async(result) => {
                        if (result.isConfirmed) {
                            const response = await fetch('http://localhost:9090/Job/RemoveJobScore',{
                                method:'post',
                                headers:{   
                                    'Content-Type':'application/json'    
                                },
                                body: JSON.stringify({
                                    "Job_ID":option[x].value,
                                    "Job_Name":option[x].text,
                                    "IdDepartment": selectchangedepartment.options[selectchangedepartment.selectedIndex].value     
                                })
                            })
                            const responseStatus = await response.json();
                            if(responseStatus.status == 0){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: `=`,
                                    footer: '<a href="">Why do I have this issue?</a>'
                                })
                            }
                            else{
                                for (var j = 0; j < row.length; j++) {
                                    row[j].deleteCell(i);
                                }
                                selectjob.add(select.options[select.selectedIndex])
                                select.remove(i-1)
                                Swal.fire(
                                    'Deleted!',
                                    `${responseStatus.message}`,
                                    'success'
                                  )
                            }
                        }
                      })        
                    break
                }
            }
            else if(i == row[0].cells.length-1 && str !=  select.value){
                alert("notfound")
            }
        }
    }

}
const changedepartment=async()=>{
    // var selectchangedepartment = document.getElementById("changedepartment")
    department.innerHTML = await selectchangedepartment.options[selectchangedepartment.selectedIndex].innerHTML;
    for(var i =0;i < selectjob.options.length;i++){
        selectjob.remove(i)
    }
    for (var j = 0;j < select.options.length;j++){
        select.remove(j)
    }
    for (var k = 0;k < selectremovejob.options.length;k++){
        selectremovejob.remove(k)
    }
    
    await fetch('http://localhost:9090/Member/OptionMemberDepartment?' + new URLSearchParams({
        IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
        }))
        .then(res => res.json())
        .then(result =>{
        // var job = data.job
        member = result.member
        console.log(member)
        for (i=0;i<member.length+1;i++){
            if(i==0){
                select.options[i] = new Option("SelectMember");
            }
            else{
                select.options[i] = new Option(member[i-1].Member_Fname,member[i-1].ID);
            }
        }
        } )
        await fetch("http://localhost:9090/Job/OptionJobDepartment?" + new URLSearchParams({
        IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
        }))
        .then(res => res.json())
        .then(result =>{
        job = result.job
        for (i=0;i<job.length+1;i++){
            if(i==0){
                selectjob.options[i] = new Option("SelectJob");
            }
            else{
                selectjob.options[i] = new Option(job[i-1].JOB,job[i-1].ID);
            }
        }
        } )
        await fetch("http://localhost:9090/Job/OptionRemoveJobScore?" + new URLSearchParams({
            IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
        }))
        .then(res => res.json())
        .then(result =>{
        job = result.job
        for (i=0;i<job.length+1;i++){
            if(i==0){
                selectremovejob.options[i] = new Option("SelectRemoveJob");
            }
            else{
                selectremovejob.options[i] = new Option(job[i-1].JOB,job[i-1].ID);
            }
        }
        } )
        await fetch('http://localhost:9090/Member/AllScore?' + new URLSearchParams({
        IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
     }))
    .then(res => res.json())
    .then(data =>{
        let employees = data.Body
        let headers = data.Head;
        let tableall = document.getElementById('mytable')
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]
        var rowName = tablerow.rows[0].cells.length;
        var rowCount = table.rows.length;
        for (var x=rowCount-1; x>=0; x--) {
            table.deleteRow(x);
        }
        for (var x=rowName-1; x>1; x--) {
        tableall.rows[0].deleteCell(x);
        }
        headers.forEach(headerText => {
            var newTH = document.createElement('th');
            
            tablerow.rows[0].appendChild(newTH);
            newTH.innerHTML = `${headerText}`

        // headerRow.appendChild(header);
        // tablerow.appendChild(headerRow);

    });
    // tablerow.appendChild(headerRow);
    employees.forEach((emp,i) => {
        let row = document.createElement('tr');
        row.innerHTML = `<td><input type="checkbox" name="record"></td>`
        

        Object.values(emp).forEach((text,i) => {
            let cell = document.createElement('td');
            if(i == 0){
                cell.innerHTML = `<td >${text}</td>`
            }
            else{
                cell.innerHTML = `<td><input type="number" min="0" max="5" name="array[]" id="row-`+(table.rows.length)+`_col-`+(i+1)+`" `+`value="${text}"/></td>`
            }
            row.appendChild(cell);
        })
        table.appendChild(row);
    });
    } )
}
const logout =()=>{
    window.localStorage.clear();
    window.location.href = './login.html'
}