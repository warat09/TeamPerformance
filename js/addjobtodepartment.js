var select = document.getElementById("demo");
var form = document.getElementById("form")
var selectjob = document.getElementById("job")
selectjob[0]= new Option("pls select department to add job");


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
  } )

  form.addEventListener('submit',async(event)=>{
    event.preventDefault()
    var x = document.getElementById("demo");
    var y = document.getElementById("job");

    console.log("Department id is ",x.value)
    console.log("Job id is ",y.value)
    console.log("Department index is ",x.selectedIndex)
    console.log("Job index is ",y.selectedIndex)
    if(x !=0 && y !=0){
      selectjob.remove(selectjob.selectedIndex)
    }

})
async function myFunction () {
  var x = document.getElementById("demo");
  selectjob.innerText = null;


  console.log(x)
  if(x.selectedIndex != 0){
    const response = await fetch('http://localhost:9090/Job/OptionJob?' + new URLSearchParams({
      IdDepartment: x.value
    }))
    const responsedata = await response.json();
    var job = responsedata.job
    console.log(job.length)
    for(j = 0;j<=job.length-1;j++){
      selectjob[j]= new Option(job[j].JOB,job[j].ID);
    }
  }
  else{
    selectjob[0]= new Option("pls select");
  }
}
