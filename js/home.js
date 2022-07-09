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
        // .then(res=>res.json()) 
        // .then(data =>{
        if(responseStatus.status == 400){
            window.localStorage.clear();
            window.location.href = './login.html'
        }
        else{
           var jsondata = await JSON.stringify(responseStatus.data)
           await localStorage.setItem("data",jsondata)
        }
    }
    var Userdata = await JSON.parse(localStorage.getItem("data"))
    document.getElementById("par").innerHTML = await Userdata.userFname;
    console.log(Userdata.menu)
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
        Object.values(emp).forEach((text,i) => {
            let cell = document.createElement('td');
                cell.innerHTML = `<td>${text}</td>`
            row.appendChild(cell);
            
        })
        table.appendChild(row);
    });
    } )

}
main()
console.log(document.getElementById("mytable").tHead.rows[0].cells[1].innerHTML)

// var theadname = document.getElementById("mytable").tHead
const logout =()=>{
    window.localStorage.clear();
    window.location.href = './login.html'
}