exports.AddDepartment =()=>{
    return `
    INSERT INTO TleDatabase.dbo.[department] (Department_Name) VALUES (@department)
    `
}
exports.CheckDepartment =()=>{
    return `
    SELECT Department_Name FROM TleDatabase.dbo.[department] WHERE Department_Name = @department 
    `
}
exports.AllDepartment =()=>{
    return `
    SELECT * FROM TleDatabase.dbo.[department]
    `
}
exports.AddAllJobToDepartment=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[all_job_department] (ID_JOB,ID_DEPARTMENT) VALUES (@job,(SELECT ID  FROM TleDatabase.dbo.[department] WHERE Department_Name = @department))    
    `
}