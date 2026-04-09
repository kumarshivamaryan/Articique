const aiService = require("../service/ai.service")


module.exports.getReview = async (req, res) => {
     const code = req.body.code;

     if(!code){
        return res.status(400).send("prompt is requires")  
     }
try {
    const response = await aiService(code);
    res.status(200).send(response);
} catch (error) {
    res.status(500).send("AI Service Failed: " + error.message);
}
}