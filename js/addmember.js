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
        if (Item.menuId === 7) {
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

        Object.keys(member[0]).forEach(headerText => {
            var newTH = document.createElement('th');
                        newTH.style.width = "150px";
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
          select.remove(select.selectedIndex)
      }

})
const logout =()=>{
    window.localStorage.clear();
    window.location.href = './login.html'
}