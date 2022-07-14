exports.AddJob =()=>{
    return `
    INSERT INTO TleDatabase.dbo.[job] (JOB) VALUES (@job)
    `
}
exports.CheckJob =()=>{
    return `
    SELECT JOB FROM TleDatabase.dbo.[job] WHERE JOB = @job 
    `
}
exports.CheckJobScore=()=>{
    return `
    SELECT JOB FROM TleDatabase.dbo.[job_score] WHERE JOB = @job AND ID_DEPARTMENT = @department
    `
}
exports.AllJob=()=>{
    return `
    SELECT * FROM TleDatabase.dbo.[job]
    `
}
exports.OptionJob=()=>{
    return`
    SELECT j.ID,j.JOB FROM TleDatabase.dbo.[job] j JOIN TleDatabase.dbo.[all_job_department] ajd ON j.ID = ajd.ID_JOB WHERE ajd.ID_DEPARTMENT = @job AND j.ID NOT IN (SELECT jd.ID_JOB  FROM TleDatabase.dbo.[job_department] jd WHERE jd.ID_DEPARTMENT = @job)
    `
}
exports.CheckJobAddToDepartment=()=>{
    return`
    SELECT ID FROM TleDatabase.dbo.[job_department] WHERE ID_JOB = @job AND ID_DEPARTMENT = @department
    `
}
exports.AddJobToDepartment=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[job_department] (ID_JOB,ID_DEPARTMENT) VALUES (@job,@department)
    `
}
exports.AddAllJobToDepartment=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[all_job_department] (ID_JOB,ID_DEPARTMENT) VALUES ((SELECT ID  FROM TleDatabase.dbo.[job] WHERE JOB = @job),@department)    
    `
}
exports.OptionJobDepartment=()=>{
    return`
    SELECT j.ID,j.JOB,jd.ID_DEPARTMENT FROM TleDatabase.dbo.[job_department] jd JOIN TleDatabase.dbo.[job] j ON j.ID = jd.ID_JOB WHERE jd.ID_DEPARTMENT = @department AND j.JOB NOT IN (SELECT js.JOB FROM TleDatabase.dbo.[job_score] js WHERE js.ID_DEPARTMENT = @department) 
    `
}

exports.AddJobScore=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[job_score] (JOB,ID_DEPARTMENT) VALUES (@job,@department)
    `
}
exports.OptionRemoveJobScore=()=>{
    return`
    SELECT j.ID,j.JOB,jd.ID_DEPARTMENT FROM TleDatabase.dbo.[job] j JOIN TleDatabase.dbo.[job_department] jd ON j.ID = jd.ID_JOB WHERE jd.ID_DEPARTMENT = @department AND j.JOB IN (SELECT js.JOB  FROM TleDatabase.dbo.[job_score] js WHERE js.ID_DEPARTMENT=@department) 
    `
}
exports.RemoveJobScore=()=>{
    return`
    DELETE js FROM TleDatabase.dbo.[job_score] js JOIN TleDatabase.dbo.[job] j ON js.JOB = j.JOB JOIN TleDatabase.dbo.[job_department] jd ON jd.ID_JOB = j.ID WHERE js.JOB = @job AND jd.ID_DEPARTMENT = @department
    `
}