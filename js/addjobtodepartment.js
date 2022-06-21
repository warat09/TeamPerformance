var select = document.getElementById("demo");
var selectjob = document.getElementById("job")
var form = document.getElementById("form")

fetch('http://localhost:9090/Job/AddJobToDepartment')
  .then(res => res.json())
  .then(data =>{
    var job = data.job
    var department = data.Department
    console.log(job)
    for (i=0;i<department.length+1;i++){
        if(i==0){
            select.options[i] = new Option("selecysepartment");
        }
        else{
            select.options[i] = new Option(department[i-1].Department_Name,department[i-1].ID);
        }
  }
     for(j = 0;j<job.length+1;j++){
      if(j==0){
        selectjob.options[j] = new Option("select job");
      }
      else{
        selectjob.options[j] = new Option(job[j-1].JOB,job[j-1].ID);
      }

    }

  } )

  form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    var x = document.getElementById("demo").selectedIndex;
    var y = document.getElementById("job").selectedIndex;

    console.log("Department id is ",x)
    console.log("Job id is ",y)
    if(x !=0 && y !=0){
      select.remove(x)
      selectjob.remove(y)
    }

})

