import express from "express" ;


export async function expressStartup(app) {
    app.use(express.json()) ;
    app.get( "/" , (req, res) => {
        res.send("This is URL Shortener Backend") ;
    } );
}