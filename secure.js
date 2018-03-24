var secure = {};
module.exports = secure;
var api_key = "scraping";


secure.checkApiKey = function(req, res) {
        if (!req.query.apikey) {
            console.error('WARNING: No apikey');
            res.sendStatus(401);
            return false;
        }
        if (req.query.apikey !== api_key) {
            console.error('WARNING: Incorrect apikey was used!');
            res.sendStatus(403);
            return false;
        }
        return true;
};
