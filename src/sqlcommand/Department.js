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
exports.DeleteDepartment=()=>{
    return`
    DELETE d FROM TleDatabase.dbo.[department] d WHERE d.ID = @id 
    `
}
exports.DeleteJobDepartment=()=>{
    return`
    DELETE jd FROM TleDatabase.dbo.[job_department] jd WHERE jd.ID_DEPARTMENT = @id 
    `
}
exports.DeleteAllJobDepartment=()=>{
    return`
    DELETE ajd FROM TleDatabase.dbo.[all_job_department] ajd WHERE ajd.ID_DEPARTMENT = @id 
    `
}
exports.DeleteMemberDepartment=()=>{
    return`
    DELETE md FROM TleDatabase.dbo.[member_department] md WHERE md.ID_DEPARTMENT = @id
    `
}
exports.DeleteAllMemberDepartment=()=>{
    return`
    DELETE amd  FROM TleDatabase.dbo.[all_member_department] amd WHERE amd.ID_DEPARTMENT = @id
    `
}
exports.DeleteJobScore=()=>{
    return`
    DELETE js FROM TleDatabase.dbo.[job_score] js WHERE js.ID_DEPARTMENT = @id
    `
}
exports.DeleteMemberScore=()=>{
    return`
    DELETE ms FROM TleDatabas
    e.dbo.[member_score] ms WHERE ms.ID_DEPARTMENT = @id
    `
}
exports.DeleteScore=()=>{
    return`
    DELETE s FROM TleDatabase.dbo.[score] s WHERE s.ID_JOB  = (SELECT js.ID  FROM TleDatabase.dbo.[job_score] js WHERE js.ID_DEPARTMENT = @id) OR s.ID_MEMBER = (SELECT ms.ID  FROM TleDatabase.dbo.[member_score] ms WHERE ms.ID_DEPARTMENT = @id)
    `
}
exports.CheckDepartment =()=>{
    return `
    SELECT Department_Name FROM TleDatabase.dbo.[department] WHERE Department_Name = @department 
    `
}
exports.IdDepartment=()=>{
    return`
    SELECT d.ID,d.Department_Name  FROM TleDatabase.dbo.[department] d WHERE Department_Name = @department
    `
}
exports.AllDepartment =()=>{
    return `
    SELECT * FROM TleDatabase.dbo.[department] d ORDER BY d.ID 
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
    SELECT d.Department_Name,m.Member_Fname  FROM TleDatabase.dbo.[member_department] md JOIN TleDatabase.dbo.[member] m ON m.ID  = md.ID_MEMBER JOIN TleDatabase.dbo.[department] d ON md.ID_DEPARTMENT  = d.ID ORDER BY md.ID_DEPARTMENT  
    `
}
exports.AllJobDepartment=()=>{
    return`
    SELECT d.Department_Name,j.JOB  FROM TleDatabase.dbo.[job_department] jd JOIN TleDatabase.dbo.[job] j ON j.ID = jd.ID_JOB JOIN TleDatabase.dbo.[department] d ON jd.ID_DEPARTMENT = d.ID ORDER BY jd.ID_DEPARTMENT 
    `
}
exports.EditMemberDepartment=()=>{
    return`
    UPDATE TleDatabase.dbo.[member_department] SET ID_MEMBER = @idmember,ID_DEPARTMENT = @iddepartment WHERE ID_DEPARTMENT = (SELECT d.ID FROM TleDatabase.dbo.[department] d WHERE d.Department_Name = @department) AND ID_MEMBER  = (SELECT m.ID FROM TleDatabase.dbo.[member] m WHERE m.Member_Fname = @member)
    `
}