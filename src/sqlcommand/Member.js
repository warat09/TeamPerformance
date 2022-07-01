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
    SELECT m.ID,m.Member_Name ,m.Member_Fname ,md.ID_DEPARTMENT FROM TleDatabase.dbo.[member] m JOIN TleDatabase.dbo.[member_department] md ON m.ID = md.ID_MEMBER LEFT JOIN TleDatabase.dbo.[member_score] ms ON ms.ID = md.ID_MEMBER WHERE md.ID_DEPARTMENT = (SELECT md.ID_DEPARTMENT  FROM TleDatabase.dbo.[member] m JOIN TleDatabase.dbo.[member_department] md ON m.ID = md.ID_MEMBER WHERE m.Member_Name = @department) AND ms.ID IS NULL 
    `
}
exports.AddMemberScore=()=>{
    return`
    INSERT INTO TleDatabase.dbo.[member_score] (ID,Member_Name,Member_Fname) VALUES (@id,@member_name,@member_fname)
    `
}
