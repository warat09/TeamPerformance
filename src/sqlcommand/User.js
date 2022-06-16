exports.login =()=>{
    return `
    SELECT email,password FROM TleDatabase.dbo.[user] WHERE email = @email 
    `
}