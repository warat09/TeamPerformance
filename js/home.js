var checktoken = localStorage.getItem("tokenlogin")
var selectchangedepartment = document.getElementById("changedepartment")
var department = document.getElementById("department")

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
        // .then(res=>res.json()) 
        // .then(data =>{
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
    console.log(selectchangedepartment.options[selectchangedepartment.selectedIndex].value)
    Userdata.menu.forEach((Item)=> {
        var setting = document.getElementById("setting");
        if (Item.menuId === 7) {
            var menu = `
            <p><a href="./AddJob.html">AddJob</a></p>
            <p><a href="./AddMember.html">AddMember</a></p>
            <p><a href="./AddJobToDepartment.html">AddJobToDepartment</a></p>
            <p><a href="./AddMemberToDepartment.html">AddMemberToDepartment</a></p>
            `
            setting.innerHTML = menu;
        }
    });
    fetch('http://localhost:9090/Member/AllScore?' + new URLSearchParams({
        IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
     }))
    .then(res => res.json())
    .then(data =>{
        let member = data.Body
        let job = data.Head;
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]

        job.forEach(headerText => {
            var newTH = document.createElement('th');
            
            tablerow.rows[0].appendChild(newTH);
            newTH.style.width = "150px";
            newTH.innerHTML = `${headerText}`

        // headerRow.appendChild(header);
        // tablerow.appendChild(headerRow);

    });
    // tablerow.appendChild(headerRow);
    member.forEach((emp,i) => {
        let row = document.createElement('tr');
        Object.values(emp).forEach((text,i) => {
            let cell = document.createElement('td');
                cell.innerHTML = `<td>${text}</td>`
            row.appendChild(cell);
            
        })
        table.appendChild(row);
    });
    // console.log(tablerow.rows[0].cells.length)
    // console.log(document.getElementById("mytable").tHead.rows[0].cells[1].innerHTML)
    // var a=[]
    // for(var i = 1;i < tablerow.rows[0].cells.length;i++){
    //     console.log(tablerow.rows[0].cells[i].innerHTML)
    //     a.push(tablerow.rows[0].cells[i].innerHTML)
    // }
    // console.log(a)
    console.log(member)
    console.log(job)
    } )

}
main()

const changedepartment=async()=>{
    console.log(selectchangedepartment.options[selectchangedepartment.selectedIndex].value)
    department.innerHTML = await selectchangedepartment.options[selectchangedepartment.selectedIndex].innerHTML;
    fetch('http://localhost:9090/Member/AllScore?' + new URLSearchParams({
        IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
     }))
    .then(res => res.json())
    .then(data =>{
        let member = data.Body
        let job = data.Head;
        let tableall = document.getElementById('mytable')
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]
        var rowName = tablerow.rows[0].cells.length;
        var rowCount = table.rows.length;
        for (var x=rowCount-1; x>=0; x--) {
            table.deleteRow(x);
        }
        for (var x=rowName-1; x>0; x--) {
        tableall.rows[0].deleteCell(x);
        }

        job.forEach(headerText => {
            var newTH = document.createElement('th');
            
            tablerow.rows[0].appendChild(newTH);
            newTH.style.width = "150px";
            newTH.innerHTML = `${headerText}`

        // headerRow.appendChild(header);
        // tablerow.appendChild(headerRow);

    });
    // tablerow.appendChild(headerRow);
    member.forEach((emp,i) => {
        let row = document.createElement('tr');
        Object.values(emp).forEach((text,i) => {
            let cell = document.createElement('td');
                cell.innerHTML = `<td>${text}</td>`
            row.appendChild(cell);
            
        })
        table.appendChild(row);
    });
    // console.log(tablerow.rows[0].cells.length)
    // console.log(document.getElementById("mytable").tHead.rows[0].cells[1].innerHTML)
    // var a=[]
    // for(var i = 1;i < tablerow.rows[0].cells.length;i++){
    //     console.log(tablerow.rows[0].cells[i].innerHTML)
    //     a.push(tablerow.rows[0].cells[i].innerHTML)
    // }
    // console.log(a)
    console.log(member)
    console.log(job)
    } )
}

// var theadname = document.getElementById("mytable").tHead
const logout =()=>{
    window.localStorage.clear();
    window.location.href = './login.html'
}