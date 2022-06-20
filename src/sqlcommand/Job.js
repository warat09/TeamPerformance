exports.AddJob =()=>{
    return `
    INSERT INTO TleDatabase.dbo.[job] (JOB) VALUES (@job)
    `
}
exports.CheckJob =()=>{
    return `
    SELECT JOB FROM TleDatabase.dbo.[job] WHERE JOB = @job 
    `
}