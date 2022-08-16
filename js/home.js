var checktoken = localStorage.getItem("tokenlogin")
var selectchangedepartment = document.getElementById("changedepartment")
var selectchangegraph = document.getElementById("changegraph")
var department = document.getElementById("department")

var myChart,members,jobs

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
        var menusetting = document.getElementById("menu-setting");
        if (Item.menuId === 7) {
            menusetting.style.visibility = "visible";
            var menu = `
            <ul>
                <li><a class="active" href="./">Home</a></li>
                <li><a href="./AddJob.html">AddJob</a></li>
                <li><a href="./AddMember.html">AddMember</a></li>
                <li><a href="./AddDepartment.html">AddDepartment</a></li>
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
         members = data.Body
         jobs = data.Head;
        var tablerow = document.getElementById("mytable").tHead;
        let headerRow = document.createElement('tr');
        let table = document.getElementById('mytable').tBodies[0]

        var newTH = document.createElement('th');
        console.log("mmmmmmmm",Object(members).length)
        if(Object(members).length !==0){
            newTH.className = "before"
            newTH.innerHTML = "Name"
            headerRow.appendChild(newTH)
        }
        tablerow.appendChild(headerRow);
        jobs.forEach(headerText => {
            var newTH = document.createElement('th');
            
            tablerow.rows[0].appendChild(newTH);
            newTH.style.width = "150px";
            newTH.innerHTML = `${headerText}`

        // headerRow.appendChild(header);
        // tablerow.appendChild(headerRow);

    });
    // tablerow.appendChild(headerRow);
    members.forEach((emp,i) => {
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
        return [members,jobs]
    } )
    console.log("aaaa",a[0])
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
        console.log("123123123",scorea)
        const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
        const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
        var r = randomNum()
        var g = randomNum()
        var b = randomNum()
        var c = {
            label:score[i].name,
            data:scorea,
            fill: true,
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
    const data = {
        labels: a[1],
        datasets: keep
      };
 
      const config = {
        type: 'radar',
        data: data,
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 25
                        }
                    }
                }
            },
            scales: {
                r: {
                  pointLabels: {
                    font: {
                      size: 25
                    }
                  }
                }
              },
          elements: {
            line: {
              borderWidth: 3
            }
          }
        },
      };
       myChart = new Chart(
          document.getElementById('myChart'),
          config
        );

}
main()

const changedepartment=async()=>{
    myChart.destroy();
    selectchangegraph.options[0].selected = true;
    console.log(selectchangedepartment.options[selectchangedepartment.selectedIndex].value)
    department.innerHTML = await selectchangedepartment.options[selectchangedepartment.selectedIndex].innerHTML;
    fetch('http://localhost:9090/Member/AllScore?' + new URLSearchParams({
        IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
     }))
    .then(res => res.json())
    .then(data =>{
         members = data.Body
         jobs = data.Head;
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
        if(jobs.length != 0){
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
            
            
            jobs.forEach(headerText => {
                var newTH = document.createElement('th');
                
                tablerow.rows[0].appendChild(newTH);
                newTH.style.width = "150px";
                newTH.innerHTML = `${headerText}`
    
            // headerRow.appendChild(header);
            // tablerow.appendChild(headerRow);
    
        });
        // tablerow.appendChild(headerRow);
        members.forEach((emp,i) => {
            let row = document.createElement('tr');
            Object.values(emp).forEach((text,i) => {
                let cell = document.createElement('td');
                    cell.innerHTML = `<td>${text}</td>`
                row.appendChild(cell);
                
            })
            table.appendChild(row);
        });

        console.log(members)
        console.log(jobs)
        var keep=[]
        var score = members
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
            console.log("123123123",scorea)
            const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
            const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
            var r = randomNum()
            var g = randomNum()
            var b = randomNum()
            var c = {
                label:score[i].name,
                data:scorea,
                fill: true,
                backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
                borderColor: `rgb(${r}, ${g}, ${b})`,
                pointBackgroundColor: `rgb(${r}, ${g}, ${b})`,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: `rgb(${r}, ${g}, ${b})`
            }
    
    console.log(randomRGB());
            keep.push(c)

        }

        const data = {
            labels: jobs,
            datasets: keep
          };
          console.log(data)

          
          const config = {
            type: 'radar',
            data: data,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 25
                            }
                        }
                    }
                },
                scales: {
                    r: {
                      pointLabels: {
                        font: {
                          size: 25
                        }
                      }
                    }
                  },
              elements: {
                line: {
                  borderWidth: 3
                }
              }
            },
          };
             myChart = new Chart(
              document.getElementById('myChart'),
              config
            );
        
        }
    } )
}
const changegraph =()=>{
    myChart.destroy();
    console.log(selectchangegraph.options[selectchangegraph.selectedIndex].value)
    switch(selectchangegraph.options[selectchangegraph.selectedIndex].value){
        case "Chartbar":
        var keep=[]
        var keepcolor=[]
        var score = members
        var len = score.length, output = [];
        console.log("lennnnnnn",jobs.length)
        for(var i = 0;i < jobs.length;i++){
            keep.push(0)
            keepcolor.push('rgb(54, 162, 235)')
        }
        for(var i = 0; i < len; i++){
            console.log(score[i].name)
            convertedArray = Object.keys(score[i]).map((k,index) => {
                if(index != 0){
                    console.log("scorebar",i,index-1,score[i][k])
                    keep[index-1] = keep[index-1]+score[i][k]
                }
            })
        }
        console.log("123123123",keep)
            console.log("Chartbar",members)
            const labels = jobs
            const data = {
            labels: labels,
            datasets: [{
                axis: 'y',
                label: 'Current',
                data: keep,
                fill: false,
                backgroundColor: keepcolor,
                borderColor: keepcolor,
                borderWidth: 1
            }]
            };
            const config = {
                type: 'bar',
                data,
                options: {
                  indexAxis: 'y',
                }
              };
              myChart = new Chart(
                document.getElementById('myChart'),
                config
              );
            
            break;
        case "SkillChart":
            console.log(members)
            fetch('http://localhost:9090/Member/AllScore?' + new URLSearchParams({
        IdDepartment: selectchangedepartment.options[selectchangedepartment.selectedIndex].value
     }))
    .then(res => res.json())
    .then(data =>{
         members = data.Body
         jobs = data.Head;
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
        if(jobs.length != 0){
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
            
            
            jobs.forEach(headerText => {
                var newTH = document.createElement('th');
                
                tablerow.rows[0].appendChild(newTH);
                newTH.style.width = "150px";
                newTH.innerHTML = `${headerText}`
    
            // headerRow.appendChild(header);
            // tablerow.appendChild(headerRow);
    
        });
        // tablerow.appendChild(headerRow);
        members.forEach((emp,i) => {
            let row = document.createElement('tr');
            Object.values(emp).forEach((text,i) => {
                let cell = document.createElement('td');
                    cell.innerHTML = `<td>${text}</td>`
                row.appendChild(cell);
                
            })
            table.appendChild(row);
        });

        console.log(members)
        console.log(jobs)
        var keep=[]
        var score = members
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
            console.log("123123123",scorea)
            const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
            const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
            var r = randomNum()
            var g = randomNum()
            var b = randomNum()
            var c = {
                label:score[i].name,
                data:scorea,
                fill: true,
                backgroundColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
                borderColor: `rgb(${r}, ${g}, ${b})`,
                pointBackgroundColor: `rgb(${r}, ${g}, ${b})`,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: `rgb(${r}, ${g}, ${b})`
            }
    
    console.log(randomRGB());
            keep.push(c)

        }

        const data = {
            labels: jobs,
            datasets: keep
          };
          console.log(data)

          
          const config = {
            type: 'radar',
            data: data,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 25
                            }
                        }
                    }
                },
                scales: {
                    r: {
                      pointLabels: {
                        font: {
                          size: 25
                        }
                      }
                    }
                  },
              elements: {
                line: {
                  borderWidth: 3
                }
              }
            },
          };
             myChart = new Chart(
              document.getElementById('myChart'),
              config
            );
        
        }
    } )
            break;
        default:
            break;

    }


}

// var theadname = document.getElementById("mytable").tHead
const logout =()=>{
    Swal.fire({
        title: 'Are you sure to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log Out'
      }).then((result) => {
        if (result.isConfirmed) {
            window.localStorage.clear();
            window.location.href = './login.html'
        }
      })

}