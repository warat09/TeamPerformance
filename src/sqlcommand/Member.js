exports.AddMember =()=>{
    return `
    INSERT INTO TleDatabase.dbo.[member] (Member_Name,Member_Fname) VALUES (@member_name,@member_fname)
    `
}
exports.CheckMember =()=>{
    return `
    SELECT Member_Name FROM TleDatabase.dbo.[member] WHERE Member_Name = @member 
    `
}
exports.CheckMemberScore =()=>{
    return `
    SELECT Member_Fname FROM TleDatabase.dbo.[member_score] WHERE Member_Fname = @member_fname  AND ID_DEPARTMENT = @department 
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
    SELECT m.ID,m.Member_Name ,m.Member_Fname ,md.ID_DEPARTMENT FROM TleDatabase.dbo.[member_department] md JOIN TleDatabase.dbo.[member] m ON m.ID = md.ID_MEMBER WHERE md.ID_DEPARTMENT = @department AND m.Member_Fname NOT IN (SELECT ms.Member_Fname FROM TleDatabase.dbo.[member_score] ms WHERE ms.ID_DEPARTMENT = @department) 
    `
}
exports.AddMemberScore=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[member_score] (Member_Fname,ID_DEPARTMENT) VALUES (@member,@department)
    `
}

exports.CheckScore=()=>{
    return`
    SELECT * FROM TleDatabase.dbo.[score] WHERE ID_MEMBER = (SELECT ID FROM TleDatabase.dbo.[member_score] WHERE Member_Fname = @member AND ID_DEPARTMENT = @department ) AND ID_JOB = (SELECT ID FROM TleDatabase.dbo.[job_score] WHERE JOB = @job AND ID_DEPARTMENT = @department)
    `
}
exports.UpdateScore=()=>{
    return`
    UPDATE TleDatabase.dbo.[score] SET RATE = @score WHERE ID_MEMBER = (SELECT ID FROM TleDatabase.dbo.[member_score] WHERE Member_Fname = @member AND ID_DEPARTMENT = @department) AND ID_JOB = (SELECT ID FROM TleDatabase.dbo.[job_score] WHERE JOB = @job AND ID_DEPARTMENT = @department)
    `
}
exports.AddScore=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[score] (ID_MEMBER,ID_JOB,RATE) VALUES ((SELECT ID FROM TleDatabase.dbo.[member_score] WHERE Member_Fname = @member AND ID_DEPARTMENT = @department),(SELECT ID FROM TleDatabase.dbo.[job_score] WHERE JOB = @job AND ID_DEPARTMENT = @department),@score)    
    `
}

exports.AllTableScore=()=>{
    return`
    SELECT ms.Member_Fname,js.JOB,s.RATE FROM TleDatabase.dbo.score s JOIN TleDatabase.dbo.member_score ms ON s.ID_MEMBER = ms.ID JOIN TleDatabase.dbo.job_score js ON s.ID_JOB = js.ID JOIN TleDatabase.dbo.[job] j ON j.JOB = js.JOB WHERE ms.ID_DEPARTMENT = @department AND js.ID_DEPARTMENT = @department
    `
}

exports.ColumName=()=>{
    return`
    SELECT DISTINCT js.JOB,js.ID_DEPARTMENT FROM TleDatabase.dbo.[job_score] js WHERE js.ID_DEPARTMENT = @department
    `
}
exports.RemoveScore=()=>{
    return`
    DELETE s FROM TleDatabase.dbo.[score] s JOIN TleDatabase.dbo.[member_score] ms ON s.ID_MEMBER = ms.ID JOIN TleDatabase.dbo.[member] m ON m.Member_Fname = ms.Member_Fname JOIN TleDatabase.dbo.[member_department] md ON md.ID_MEMBER = m.ID WHERE ms.Member_Fname = @fname AND ms.ID_DEPARTMENT = @department 
    `
}
exports.RemoveMemberScore=()=>{
    return`
    DELETE ms FROM TleDatabase.dbo.[member_score] ms WHERE ms.Member_Fname = @fname AND ms.ID_DEPARTMENT = @department    
    `
}
