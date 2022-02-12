import db from "../databaseConnect.js";

async function products(req, res){
    try {
        const content = await db.products.find().toArray();
        res.status(200).send(content)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export{
    products
}

