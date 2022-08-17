exports.AddJob =()=>{
    return `
    INSERT INTO TleDatabase.dbo.[job] (JOB) VALUES (@job)
    `
}
exports.EditJob=()=>{
    return`
    UPDATE TleDatabase.dbo.[job] SET JOB = @job WHERE ID = @id
    `
}
exports.RemoveJob=()=>{
    return`
    DELETE j FROM TleDatabase.dbo.[job] j WHERE j.id = @id AND j.JOB = @job
    `
}
exports.DeleteJobDepartment=()=>{
    return`
    DELETE jd FROM TleDatabase.dbo.[job_department] jd WHERE jd.ID_JOB = @id
    `
}
exports.DeleteAllJobDepartment=()=>{
    return`
    DELETE ajd FROM TleDatabase.dbo.[all_job_department] ajd WHERE ajd.ID_JOB = @id
    `
}
exports.DeleteJobScore=()=>{
    return`
    DELETE js FROM TleDatabase.dbo.[job_score] js WHERE js.ID_JOB = @id   
    `
}
exports.CheckScoreDelete=()=>{
    return`
    SELECT js.ID  FROM TleDatabase.dbo.[job_score] js WHERE js.ID_JOB = @id   
    `
}
exports.DeleteScore=()=>{
    return`
    DELETE s FROM TleDatabase.dbo.[score] s WHERE s.ID_JOB = @jobscore
    `
}
exports.CheckJob =()=>{
    return `
    SELECT * FROM TleDatabase.dbo.[job] WHERE JOB = @job 
    `
}
exports.CheckJobScore=()=>{
    return `
    SELECT ID_JOB FROM TleDatabase.dbo.[job_score] WHERE ID_JOB = (SELECT j.id FROM TleDatabase.dbo.[job] j WHERE j.JOB = @job) AND ID_DEPARTMENT = @department
    `
}
exports.AllJob=()=>{
    return `
    SELECT * FROM TleDatabase.dbo.[job] j ORDER BY j.ID 
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
    SELECT j.ID,j.JOB,jd.ID_DEPARTMENT FROM TleDatabase.dbo.[job_department] jd JOIN TleDatabase.dbo.[job] j ON j.ID = jd.ID_JOB WHERE jd.ID_DEPARTMENT = @department AND j.ID NOT IN (SELECT js.ID_JOB FROM TleDatabase.dbo.[job_score] js WHERE js.ID_DEPARTMENT = @department) 
    `
}

exports.AddJobScore=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[job_score] (ID_JOB,ID_DEPARTMENT) VALUES ((SELECT j.id FROM TleDatabase.dbo.[job] j WHERE j.JOB = @job),@department)
    `
}
exports.OptionRemoveJobScore=()=>{
    return`
    SELECT j.ID,j.JOB,jd.ID_DEPARTMENT FROM TleDatabase.dbo.[job] j JOIN TleDatabase.dbo.[job_department] jd ON j.ID = jd.ID_JOB WHERE jd.ID_DEPARTMENT = @department AND j.ID IN (SELECT js.ID_JOB  FROM TleDatabase.dbo.[job_score] js WHERE js.ID_DEPARTMENT=@department) 
    `
}
exports.CheckRemoveJobScore=()=>{
    return`
    SELECT DISTINCT s.ID_JOB  FROM TleDatabase.dbo.[score] s JOIN TleDatabase.dbo.[job_score] js ON s.ID_JOB  = js.ID WHERE js.ID_DEPARTMENT = @department
    `
}
// DELETE s FROM TleDatabase.dbo.[score] s WHERE s.ID_JOB = (SELECT js.ID FROM TleDatabase.dbo.[job_score] js WHERE js.JOB = @job AND js.ID_DEPARTMENT = @department)
exports.RemoveScore=()=>{
    return`
    DELETE s FROM TleDatabase.dbo.[score] s JOIN TleDatabase.dbo.[job_score] js ON s.ID_JOB = js.ID JOIN TleDatabase.dbo.[job] j ON j.ID = js.ID_JOB WHERE j.JOB = @job AND js.ID_DEPARTMENT = @department
    `
}
// DELETE js FROM TleDatabase.dbo.[job_score] js JOIN TleDatabase.dbo.[job] j ON js.JOB = j.JOB JOIN TleDatabase.dbo.[job_department] jd ON jd.ID_JOB = j.ID WHERE js.JOB = @job AND js.ID_DEPARTMENT = @department
exports.RemoveJobScore=()=>{
    return`
    DELETE js FROM TleDatabase.dbo.[job_score] js JOIN TleDatabase.dbo.[job] j ON js.ID_JOB = j.ID WHERE j.JOB = @job AND js.ID_DEPARTMENT = @department
    `
}