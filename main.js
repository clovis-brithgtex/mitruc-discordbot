const Discord = require('discord.js');
const fs = require('fs');
const config = require("./config.json")

class JsonFile {
    constructor(file_name, default_file) {
        this.file_name = file_name;
        this.save = () => {
            var json = JSON.stringify(this.data);
            fs.writeFileSync(this.file_name, json, { encoding: 'utf8' });
        }

        if (fs.existsSync(file_name)) {
            var json = fs.readFileSync(file_name, { encoding: 'utf8' });
            this.data = JSON.parse(json);
            this.data = { ...default_file, ...this.data }; // merge existing data with default data
        } else {
            console.log(file_name + ' is missing.');
            this.data = default_file;
        }
        this.save();
    }
}

var settings = new JsonFile('settings.json', {
	token: '<none>'
});
var data = new JsonFile('data.json', {
	owned: 0
});

const client = new Discord.Client({ autoReconnect: true });

client.on('ready', () => {
    console.log('Bot started');
});

// quoi -> feur
client.on('message', message => {
    msg = message.content;
    var regex = /(\?|!|\.|\* )/gi; // targets ? ! . and spaces
    msg = msg.replace(regex, '');
    msg = msg.toLowerCase();
    if (msg.endsWith('quoi')) {
        message.channel.send('feur');
        data.data.owned++;
    }
});

client.on('message', message => {
    msg = message.content;
    var regex = /(\?|!|\.|\* )/gi; // targets ? ! . and spaces
    msg = msg.replace(regex, '');
    msg = msg.toLowerCase();
    if (msg.endsWith('qwa')) {
        message.channel.send('feur');
        data.data.owned++;
    }
});

client.on('message', message => {
    msg = message.content;
    var regex = /(\?|!|\.|\* )/gi; // targets ? ! . and spaces
    msg = msg.replace(regex, '');
    msg = msg.toLowerCase();
    if (msg.endsWith('qua')) {
        message.channel.send('feur');
        data.data.owned++;
    }
});

setInterval(() => {
    client.user.setPresence({ game: { name: 'Score: ' + data.data.owned }, status: 'online' });
    data.save();
}, 30000);

client.login(config.token);
