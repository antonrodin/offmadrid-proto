module.exports = {

    database: {
        user: process.env.USER || "root",
        password: process.env.PASSWORD || "",
        host: process.env.HOST || "localhost",
        database: process.env.DATABASE || "offmadrid"
    }

}