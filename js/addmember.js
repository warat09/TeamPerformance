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
            else if(i==counttable){
                newTH.className = "after"
            }
            newTH.innerHTML = `${headerText}`
            headerRow.appendChild(newTH)

    });
    tablerow.appendChild(headerRow);
    member.forEach((emp,i) => {
        let row = document.createElement('tr');
        Object.values(emp).forEach((text,i) => {
            let cell = document.createElement('td');
            cell.innerHTML = `${text}`
            row.appendChild(cell);
        })
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
                      const response = await fetch('http://localhost:9090/Member//AddMember',{
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
const logout =()=>{
    window.localStorage.clear();
    window.location.href = './login.html'
}