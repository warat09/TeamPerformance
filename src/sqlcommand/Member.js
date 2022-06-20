exports.AddMember =()=>{
    return `
    INSERT INTO TleDatabase.dbo.[member] (MEMBER) VALUES (@member)
    `
}
exports.CheckMember =()=>{
    return `
    SELECT MEMBER FROM TleDatabase.dbo.[member] WHERE MEMBER = @member 
    `
}