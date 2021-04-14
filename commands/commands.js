const prefix = require('../config.json');

module.exports = (client, aliases, cb) => {

    if (typeof aliases === "string") {
        aliases = [aliases];
    }
    client.on("message", message => {
        const {
            content
        } = message;
        aliases.forEach(alias => {
            const command = `${prefix.prefix}${alias}`
            // ping bot
            console.log(alias , content ,command);
            if (content.includes(`${command}`) || content == command) {
                console.log(`Running the command ${command}`);
                cb(message);
            }
        });
    })
}