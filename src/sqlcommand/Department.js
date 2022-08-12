exports.AddDepartment =()=>{
    return `
    INSERT INTO TleDatabase.dbo.[department] (Department_Name) VALUES (@department)
    `
}
exports.EditDepartment=()=>{
    return`
    UPDATE TleDatabase.dbo.[department] SET Department_Name = @department WHERE ID = @id
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
exports.AddAllMemberToDepartment=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[all_member_department] (ID_MEMBER,ID_DEPARTMENT) VALUES (@member,(SELECT ID  FROM TleDatabase.dbo.[department] WHERE Department_Name = @department))    
    `
}
exports.CheckMemberDepartment=()=>{
    return`
    SELECT d.ID,d.Department_Name FROM TleDatabase.dbo.[member_department] md JOIN TleDatabase.dbo.[member] m ON md.ID_MEMBER = m.ID JOIN TleDatabase.dbo.[department] d ON md.ID_DEPARTMENT = d.ID WHERE m.Member_Name = @member ORDER BY d.ID
    `
}
exports.AllMemberDepartment=()=>{
    return`
    SELECT m.Member_Fname,d.Department_Name  FROM TleDatabase.dbo.[member_department] md JOIN TleDatabase.dbo.[member] m ON m.ID  = md.ID_MEMBER JOIN TleDatabase.dbo.[department] d ON md.ID_DEPARTMENT  = d.ID ORDER BY md.ID_DEPARTMENT  
    `
}
exports.AllJobDepartment=()=>{
    return`
    SELECT j.JOB,d.Department_Name  FROM TleDatabase.dbo.[job_department] jd JOIN TleDatabase.dbo.[job] j ON j.ID = jd.ID_JOB JOIN TleDatabase.dbo.[department] d ON jd.ID_DEPARTMENT = d.ID ORDER BY jd.ID_DEPARTMENT 
    `
}