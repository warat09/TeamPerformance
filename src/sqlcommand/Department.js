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