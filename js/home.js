var checktoken = localStorage.getItem("tokenlogin")
var selectchangedepartment = document.getElementById("changedepartment")
var department = document.getElementById("department")

var members,jobs

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
            <ul>
                <li><a class="active" href="./">Home</a></li>
                <li><a href="./AddJob.html">AddJob</a></li>
                <li><a href="./AddMember.html">AddMember</a></li>
                <li><a href="./AddJobToDepartment.html">AddJobToDepartment</a></li>
                <li><a href="./AddMemberToDepartment.html">AddMemberToDepartment</a></li>
            </ul>
            `
            setting.innerHTML = menu;
        }
    });
    var a = await fetch('http://localhost:9090/Member/AllScore?' + new URLSearchParams({
        IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
     }))
    .then(res => res.json())
    .then(data =>{
        let member = data.Body
        let job = data.Head;
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]

        var newTH = document.createElement('th');
        newTH.className = "before"
        newTH.innerHTML = "Name"
        headerRow.appendChild(newTH)
        tablerow.appendChild(headerRow);
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
        return [member,job]
    } )
    var keep=[]
    var score = a[0]
    var len = score.length, output = [];

    for(var i = 0; i < len; i++){
        var scorea =[]
        console.log(score[i].name)
        convertedArray = Object.keys(score[i]).map((k,index) => {
            if(index != 0){
                console.log(score[i][k])
                scorea.push(score[i][k])
            }
        })
        console.log(scorea)
        const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
        const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
        var r = randomNum()
        var g = randomNum()
        var b = randomNum()
        var c = {
            label:score[i].name,
            data:scorea,
            fill: false,
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
            borderColor: `rgb(${r}, ${g}, ${b})`,
            pointBackgroundColor: `rgb(${r}, ${g}, ${b})`,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: `rgb(${r}, ${g}, ${b})`
        }

console.log(randomRGB());
        keep.push(c)
        // console.log(convertedArray);

    // output.push(score[i].name)
    }
    console.log(keep)

// console.log(output);
var name = "sdsdsdsdsd"
var score = [1,2,3]
    var b = {
        label:name,
        data:score
    }
    output.push(b)
    console.log(output)
    const data = {
        labels: a[1],
        datasets: keep
      };
    //   [{
    //     label: 'My First Dataset',
    //     data: [5, 3, 4],
    //     fill: false,
    //     backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //     borderColor: 'rgb(255, 99, 132)',
    //     pointBackgroundColor: 'rgb(255, 99, 132)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgb(255, 99, 132)'
    //   }, {
    //     label: 'My Second Dataset',
    //     data: [2, 4, 4],
    //     fill: false,
    //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //     borderColor: 'rgb(54, 162, 235)',
    //     pointBackgroundColor: 'rgb(54, 162, 235)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgb(54, 162, 235)'
    //   }]
      
      const config = {
        type: 'radar',
        data: data,
        options: {
          elements: {
            line: {
              borderWidth: 3
            }
          }
        },
      };
        const myChart = new Chart(
          document.getElementById('myChart'),
          config
        );

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
        for (var x=rowName-1; x>=0; x--) {
        tableall.rows[0].deleteCell(x);
        }
        if(job.length != 0){
            // var tablerow = document.getElementById("mytable").tHead;
            // let headerRow = document.createElement('tr');
            // let table = document.getElementById('mytable').tBodies[0]
    
            // var newTH = document.createElement('th');
            // newTH.className = "before"
            // newTH.innerHTML = "Name"
            // headerRow.appendChild(newTH)
            // tablerow.appendChild(headerRow);
            var newTH = document.createElement('th');
                
                tablerow.rows[0].appendChild(newTH);
                newTH.className = "before"
                newTH.innerHTML = "Name"
            // headerRow.appendChild(newTH)
            // tablerow.appendChild(headerRow);
            
            
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
        }
    } )
}

// var theadname = document.getElementById("mytable").tHead
const logout =()=>{
    window.localStorage.clear();
    window.location.href = './login.html'
}