var builder = require('botbuilder');    
    
module.exports = [
    (session) => {        
        builder.Prompts.choice(session, 'Are you looking for information on a current product or new product?', 'existing|new');
    },
    (session, results, next) => {
        session.send('Ok, this is a %s product', results.response.entity);
        session.dialogData.productNew = (results.response.entity == 'new');
        console.log(results);
        var msg = new builder.Message(session)
            .text('What category does this product belong to?')
            .suggestedActions(
                builder.SuggestedActions.create(
                        session, [
                            builder.CardAction.imBack(session, 'Lawn & Garden', 'Lawn & Garden'),
                            builder.CardAction.imBack(session, 'Power Tool', 'Power Tool'),
                            builder.CardAction.imBack(session, 'Oscillation Tool', 'Oscillation Tool')
                        ]
                    ));
        builder.Prompts.text(session, msg);
    },
    (session, results, next) => {
        session.send('Ok, you have a %s product', results.response);
        session.dialogData.productCategory = results.response;

        builder.Prompts.text(session, 'Do you have an issue with your product or are you interested in free spools for life?');
    },
    (session, results, next) => {
        if (results.response.includes('free')) {
            builder.Prompts.confirm(session, 'So you want free spools for life, right?');
            session.dialogData.wantsFreeSpools = true;
        }
        else if (results.response.includes('issue')) {
            builder.Prompts.confirm(session, new builder.Message(session).text('So have a problem with your %s, right?', session.dialogData.productCategory));
            session.dialogData.wantsFreeSpools = false;
        }
    }
];

