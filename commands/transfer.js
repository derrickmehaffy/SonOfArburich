const money = require('discord-money');
exports.run = async (client, message, args) => {
  if(!args || args.length < 1 || !args[1]){
    message.channel.send("Incorrect syntax. Use ``!helpme transfer`` for correct usage. (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧");
  }

  let memberID = message.mentions.members.first().id;
  let member = message.mentions.members.first();
  money.fetchBal(message.author.id).then((j) => {
    if((j.money - args[1]) < 0){
      message.channel.send("There aren't enough Lunabits to do that.");
      return;
    }
  
    money.updateBal(message.author.id, -(args[1])).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${message.author} had ${args[1]} Lunabits removed from thier balance . \n**New Balance:** ${i.money} Lunabits`);
      money.updateBal(memberID, args[1]).then((k) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
                message.channel.send(`${member} got ${args[1]} Lunabits.\n**New Balance:** ${k.money} Lunabits`);
      return;
            })
            })})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "transfer",
  category: "Shop",
  description: "Transfers some of your own Lunabits to another user. Non-refundable, use wisely!",
  usage: "transfer <@user> <amount> "
};
