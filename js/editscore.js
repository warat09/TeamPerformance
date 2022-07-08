var select = document.getElementById("member");
var selectjob = document.getElementById("job");
var Userdata = JSON.parse(localStorage.getItem("data"))
var member,job

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

fetch('http://localhost:9090/Member/AllScore')
    .then(res => res.json())
    .then(data =>{
        let employees = data.Body
        let headers = data.Head;
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]

        headers.forEach(headerText => {
            var newTH = document.createElement('th');
            
            tablerow.rows[0].appendChild(newTH);
            newTH.style.width = "150px";
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
                cell.innerHTML = `<td ><input type="text" name="array[]" id="row-`+(table.rows.length)+`_col-`+(i+1)+`" `+`value="${text}"  disabled/></td>`
            }
            else{
                cell.innerHTML = `<td><input type="text" name="array[]" id="row-`+(table.rows.length)+`_col-`+(i+1)+`" `+`value="${text}"/></td>`
            }
            row.appendChild(cell);
            
        })
        table.appendChild(row);
    });
    } )

fetch('http://localhost:9090/Member/OptionMemberDepartment?' + new URLSearchParams({
    userName: Userdata.userName
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
    userName: Userdata.userName
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
        cell2.innerHTML = `<td><input type="text" name="array[]" id="row-`+(table.tBodies[0].rows.length-1)+`_col-`+(i)+`" `+`value="${select.options[select.selectedIndex].text}" disabled/></td>`
    }
    else{
        cell2.innerHTML = `<td><input type="text" name="array[]" id="row-`+(table.tBodies[0].rows.length-1)+`_col-`+(i)+`" `+`value="0"/></td>`
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
            newCell.innerHTML = `<td><input type="text" name="array[]" id="row-${i}_col-`+(tblBodyObj.rows[i].cells.length - 1)+`" `+`value="0"/></td>`
            // newCell.innerHTML ='[th] row:' + i + ', cell: ' + (tblBodyObj.rows[i].cells.length - 1)
        }
        selectjob.remove(selectjob.selectedIndex)

}
const onClick=async()=>{
    // let inputValue = document.getElementById("row-0_col-2").value;
    // let sum = Number(test1) + Number(test2) + Number(test3);
    //  alert(inputValue)

    var tRows = [];
    var tRowsh = [];

    var n = 0;
    tab = document.getElementById('mytable').tBodies[0];
    tabh = document.getElementById('mytable');
    for (var r = 0; r < tab.rows.length; r++) {
    var tRow = [];// start new row array
    for (var c = 1; c < tab.rows[r].cells.length; c++) {
        if(r==0){
            tRowsh[c-1] = tabh.rows[r].cells[c].innerHTML;
        }
        // console.log(tRow[c-1]);
            var input = document.getElementsByName('array[]');
            console.log(input)
                // tRow[c-1] = input[i].value;
                console.log(tRow);
                tRow[c-1] = input[n].value;
            n++
        

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

    console.log(newRows);

    const response = await fetch('http://localhost:9090/Member/MemberScore',{
        method:'post',
        headers:{
            'Content-Type':'application/json'    
        },
        body: JSON.stringify({
            "score":newRows,
            "rowname":tRowsh
        })

    })

    const responseData = await response.json();
}