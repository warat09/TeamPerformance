var form = document.getElementById("form")

form.addEventListener("submit",async(event)=>{
    event.preventDefault()
    var job = document.getElementById("job").value
    const response = await fetch('http://localhost:9090/Job/AddJob',{
        method:'post',
        headers:{   
            'Content-Type':'application/json'    
        },
        body: JSON.stringify({
            "job":job
        })

    })
    const responseStatus = await response.json();
    console.log(responseStatus)
})