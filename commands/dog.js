const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'dog',
	description: 'Uses random cat to give a random cat! Nuff said.',
	cooldown: 20,
	aliases: ['woof', 'puppy'],
	execute(message, args) {
		const randomdogurl = 'https://random.dog/woof.json';

		const getJSON = async url => {
			try {
				const response = await fetch(url, {
					method: 'GET',
				});
				if(!response.ok) {throw new Error(response.statusText);}
				const data = await response.json();
				return data;
			}
			catch(error) {
				return error;
			}
		};
		getJSON(randomdogurl).then(data => {
			const dogembed = new Discord.MessageEmbed()
				.setColor('4e57d8')
				.setTitle('**Dog**')
        .setDescription(data.url)
				.setImage(data.url)
				.setFooter('Dog Provided by random.dog');
			message.channel.send(dogembed).catch(error => console.log(error))
      .catch(error => {
        console.error(error);
        message.channel.send(
          "Hmmm. That didn't work... Weird."
        );
      });
		});
	},
};
