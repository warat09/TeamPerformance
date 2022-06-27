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
exports.AllMember=()=>{
    return`
    SELECT * FROM TleDatabase.dbo.[member]     
    `
}
exports.OptionMember=()=>{
    return`
    
    `
}