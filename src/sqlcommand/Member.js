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
    SELECT Member_Fname FROM TleDatabase.dbo.[member_score] WHERE Member_Fname = @member_fname 
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
    SELECT m.ID,m.Member_Name ,m.Member_Fname ,md.ID_DEPARTMENT FROM TleDatabase.dbo.[member] m JOIN TleDatabase.dbo.[member_department] md ON m.ID = md.ID_MEMBER LEFT JOIN TleDatabase.dbo.[member_score] ms ON ms.Member_Fname  = m.Member_Fname  WHERE md.ID_DEPARTMENT = (SELECT md.ID_DEPARTMENT  FROM TleDatabase.dbo.[member] m JOIN TleDatabase.dbo.[member_department] md ON m.ID = md.ID_MEMBER WHERE m.Member_Name = 'rosemary') AND ms.ID IS NULL  
    `
}
exports.AddMemberScore=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[member_score] (Member_Fname) VALUES (@member_fname)
    `
}

exports.CheckScore=()=>{
    return`
    SELECT * FROM TleDatabase.dbo.[score] WHERE ID_MEMBER = (SELECT ID FROM TleDatabase.dbo.[member_score] WHERE Member_Fname = @member) AND ID_JOB = ((SELECT ID FROM TleDatabase.dbo.[job_score] WHERE JOB = @job))
    `
}
exports.UpdateScore=()=>{
    return`
    UPDATE TleDatabase.dbo.[score] SET RATE = @score WHERE ID_MEMBER = (SELECT ID FROM TleDatabase.dbo.[member_score] WHERE Member_Fname = @member) AND ID_JOB = ((SELECT ID FROM TleDatabase.dbo.[job_score] WHERE JOB = @job))
    `
}
exports.AddScore=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[score] (ID_MEMBER,ID_JOB,RATE) VALUES ((SELECT ID FROM TleDatabase.dbo.[member_score] WHERE Member_Fname = @member),(SELECT ID FROM TleDatabase.dbo.[job_score] WHERE JOB = @job),@score)    
    `
}

exports.AllTableScore=()=>{
    return`
    SELECT ms.Member_Fname,js.JOB,s.RATE  FROM TleDatabase.dbo.score s JOIN TleDatabase.dbo.member_score ms ON s.ID_MEMBER = ms.ID JOIN TleDatabase.dbo.job_score js ON s.ID_JOB = js.ID
    `
}

exports.ColumName=()=>{
    return`
    SELECT DISTINCT js.JOB FROM TleDatabase.dbo.score s JOIN TleDatabase.dbo.job_score js ON s.ID_JOB = js.ID
    `
}

