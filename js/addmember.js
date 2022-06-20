var form = document.getElementById("form")
form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    var member = document.getElementById("member").value
    const response = await fetch('http://localhost:9090/Member/AddMember',{
        method:'post',
        headers:{
            'Content-Type':'application/json'    
        },
        body: JSON.stringify({
            "member":member
        })

    })
    const responseStatus = await response.json();
    console.log(responseStatus)

})