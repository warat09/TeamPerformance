exports.AddMember =()=>{
    return `
    INSERT INTO TleDatabase.dbo.[member] (Member_Name,Member_Fname) VALUES (@member_name,@member_fname)
    `
}
exports.Editfmember=()=>{
    return`
    UPDATE TleDatabase.dbo.[member] SET Member_Fname = @member_fname WHERE ID = @id
    `
}
exports.CheckScoreDelete=()=>{
    return`
    SELECT ms.ID  FROM TleDatabase.dbo.[member_score] ms WHERE ms.ID_MEMBER = @id   
    `
}
exports.RemoveMember=()=>{
    return`
    DELETE m FROM TleDatabase.dbo.[member] m WHERE m.ID = @id
    `
}
exports.DeleteMemberDepartment=()=>{
    return`
    DELETE md FROM TleDatabase.dbo.[member_department] md WHERE md.ID_MEMBER = @id
    `
}
exports.DeleteAllMemberDepartment=()=>{
    return`
    DELETE amd FROM TleDatabase.dbo.[all_member_department] amd WHERE amd.ID_MEMBER= @id
    `
}
exports.DeleteMemberScore=()=>{
    return`
    DELETE ms FROM TleDatabase.dbo.[member_score] ms WHERE ms.ID_MEMBER = @id   
    `
}
exports.DeleteScore=()=>{
    return`
    DELETE s FROM TleDatabase.dbo.[score] s WHERE s.ID_MEMBER = @memberscore
    `
}
exports.CheckMember =()=>{
    return `
    SELECT Member_Name FROM TleDatabase.dbo.[member] WHERE Member_Name = @member 
    `
}
exports.CheckMemberScore =()=>{
    return `
    SELECT ID_MEMBER FROM TleDatabase.dbo.[member_score] WHERE ID_MEMBER = (SELECT m.id FROM TleDatabase.dbo.[member] m WHERE m.Member_Fname = @member_fname)  AND ID_DEPARTMENT = @department 
    `
}
exports.CheckMemberAddToDepartment=()=>{
    return`
    SELECT ID FROM TleDatabase.dbo.[member_department] WHERE ID_MEMBER = @member AND ID_DEPARTMENT = @member
    `
}
exports.AllMember=()=>{
    return`
    SELECT * FROM TleDatabase.dbo.[member]     
    `
}
exports.OptionMember=()=>{
    return`
    SELECT m.ID ,m.Member_Fname FROM TleDatabase.dbo.[member] m JOIN TleDatabase.dbo.[all_member_department] amd ON m.ID  = amd.ID_MEMBER  WHERE amd.ID_DEPARTMENT = @department AND m.ID  NOT IN (SELECT md.ID_MEMBER FROM TleDatabase.dbo.[member_department] md WHERE md.ID_DEPARTMENT = @department)    
    `
}
exports.AddMemberToDepartment=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[member_department] (ID_MEMBER,ID_DEPARTMENT) VALUES (@member,@department)
    `
}
exports.AddAllMemberToDepartment=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[all_member_department] (ID_MEMBER,ID_DEPARTMENT) VALUES ((SELECT ID  FROM TleDatabase.dbo.[member] WHERE Member_Name = @member),@department)    
    `
}
exports.OptionMemberDepartment=()=>{
    return`
    SELECT m.ID,m.Member_Name ,m.Member_Fname ,md.ID_DEPARTMENT FROM TleDatabase.dbo.[member_department] md JOIN TleDatabase.dbo.[member] m ON m.ID = md.ID_MEMBER WHERE md.ID_DEPARTMENT = @department AND m.ID NOT IN (SELECT ms.ID_MEMBER FROM TleDatabase.dbo.[member_score] ms WHERE ms.ID_DEPARTMENT = @department) 
    `
}
exports.AddMemberScore=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[member_score] (ID_MEMBER,ID_DEPARTMENT) VALUES ((SELECT m.ID FROM TleDatabase.dbo.[member] m WHERE m.Member_Fname = @member),@department)
    `
}

exports.CheckScore=()=>{
    return`
    SELECT * FROM TleDatabase.dbo.[score] WHERE ID_MEMBER = (SELECT ms.ID FROM TleDatabase.dbo.[member_score] ms WHERE ms.ID_MEMBER = (SELECT m.ID FROM TleDatabase.dbo.[member] m WHERE m.Member_Fname = @member) AND ID_DEPARTMENT = @department ) AND ID_JOB = (SELECT ID FROM TleDatabase.dbo.[job_score] WHERE ID_JOB = (SELECT ID FROM TleDatabase.dbo.[job] j WHERE j.JOB = @job) AND ID_DEPARTMENT = @department)
    `
}
exports.UpdateScore=()=>{
    return`
    UPDATE TleDatabase.dbo.[score] SET RATE = @score WHERE ID_MEMBER = (SELECT ms.ID FROM TleDatabase.dbo.[member_score] ms WHERE ms.ID_MEMBER = (SELECT m.ID FROM TleDatabase.dbo.[member] m WHERE m.Member_Fname = @member) AND ID_DEPARTMENT = @department ) AND ID_JOB = (SELECT ID FROM TleDatabase.dbo.[job_score] WHERE ID_JOB = (SELECT ID FROM TleDatabase.dbo.[job] j WHERE j.JOB = @job) AND ID_DEPARTMENT = @department)
    `
}
exports.AddScore=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[score] (ID_MEMBER,ID_JOB,RATE) VALUES ((SELECT ms.ID FROM TleDatabase.dbo.[member_score] ms WHERE ms.ID_MEMBER = (SELECT m.ID FROM TleDatabase.dbo.[member] m WHERE m.Member_Fname = @member) AND ID_DEPARTMENT = @department ),(SELECT ID FROM TleDatabase.dbo.[job_score] WHERE ID_JOB = (SELECT ID FROM TleDatabase.dbo.[job] j WHERE j.JOB = @job) AND ID_DEPARTMENT = @department),@score)    
    `
}
// SELECT ms.Member_Fname,js.JOB,s.RATE FROM TleDatabase.dbo.score s JOIN TleDatabase.dbo.member_score ms ON s.ID_MEMBER = ms.ID JOIN TleDatabase.dbo.job_score js ON s.ID_JOB = js.ID JOIN TleDatabase.dbo.[job] j ON j.JOB = js.JOB WHERE ms.ID_DEPARTMENT = @department AND js.ID_DEPARTMENT = @department

exports.AllTableScore=()=>{
    return`
    SELECT m.Member_Fname,j.JOB,s.RATE FROM TleDatabase.dbo.score s JOIN TleDatabase.dbo.member_score ms ON ms.ID = s.ID_MEMBER JOIN TleDatabase.dbo.job_score js ON js.ID = s.ID_JOB JOIN TleDatabase.dbo.member m ON m.ID = ms.ID_MEMBER JOIN TleDatabase.dbo.job j ON j.ID = js.ID_JOB WHERE ms.ID_DEPARTMENT = @department AND js.ID_DEPARTMENT = @department  
    `
}

// SELECT DISTINCT js.JOB,js.ID_DEPARTMENT FROM TleDatabase.dbo.[job_score] js WHERE js.ID_DEPARTMENT = @department
exports.ColumName=()=>{
    return`
    SELECT DISTINCT (SELECT j.JOB FROM TleDatabase.dbo.[job] j WHERE j.ID = js.ID_JOB) as JOB,js.ID_DEPARTMENT FROM TleDatabase.dbo.[job_score] js WHERE js.ID_DEPARTMENT = @department
    `
}
exports.ColumMemberName=()=>{
    return`
    SELECT DISTINCT (SELECT m.Member_Fname FROM TleDatabase.dbo.[member] m WHERE m.ID = ms.ID_MEMBER) as MEMBER,ms.ID_DEPARTMENT FROM TleDatabase.dbo.[member_score] ms WHERE ms.ID_DEPARTMENT = @department
    `
}
// DELETE s FROM TleDatabase.dbo.[score] s JOIN TleDatabase.dbo.[member_score] ms ON s.ID_MEMBER = ms.ID JOIN TleDatabase.dbo.[member] m ON m.Member_Fname = ms.Member_Fname JOIN TleDatabase.dbo.[member_department] md ON md.ID_MEMBER = m.ID WHERE ms.Member_Fname = @fname AND ms.ID_DEPARTMENT = @department
exports.RemoveScore=()=>{
    return`
    DELETE s FROM TleDatabase.dbo.[score] s JOIN TleDatabase.dbo.[member_score] ms ON s.ID_MEMBER = ms.ID JOIN TleDatabase.dbo.[member] m ON m.ID = ms.ID_MEMBER WHERE m.Member_Fname = @fname AND ms.ID_DEPARTMENT = @department  
    `
}
// DELETE ms FROM TleDatabase.dbo.[member_score] ms WHERE ms.Member_Fname = @fname AND ms.ID_DEPARTMENT = @department    
exports.RemoveMemberScore=()=>{
    return`
    DELETE ms FROM TleDatabase.dbo.[member_score] ms JOIN TleDatabase.dbo.[member] m ON ms.ID_MEMBER = m.ID WHERE m.Member_Fname = @fname AND ms.ID_DEPARTMENT = @department
    `
}
exports.RemoveAllMemberScore=()=>{
    return`
    DELETE ms FROM TleDatabase.dbo.[member_score] ms JOIN TleDatabase.dbo.[member] m ON ms.ID_MEMBER = m.ID WHERE ms.ID_DEPARTMENT = @department
    `
}
