var builder = require('botbuilder');    
    
module.exports = [
    function (session) {

        session.send('Welcome to the Free Spools for Life sign up!');
        // Reply and return to parent dialog
        
        builder.Prompts.text(session, 'First off, please give me your Name');
    },
    function (session, results, next) {
        session.dialogData.name = results.response;
        session.send('Thanks %s', results.response);
        next();
    },
];

