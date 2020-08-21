var xlsx = require("xlsx");
var cron = rewuire("node-cron");
const Brawlstars = require("brawlstars.js");
const Discord = require("discord.js");
const dtoken = 0
const btoken  = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQ2OWJlMTMyLWNlYjAtNDU3MS1iYTI2LThkMjllNmQyZDRiNSIsImlhdCI6MTU5NzY4MDQ4NSwic3ViIjoiZGV2ZWxvcGVyL2I4NzRkM2Y5LTk0MWQtNWJhNy02NjY4LTExOGM1NDhiMGZkMCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDkuMzcuMTEuMjE2Il0sInR5cGUiOiJjbGllbnQifV19.tuDDUhnZMXGSP7tywPx9Ae_tp1DwenWzZcPC6TKHmytrlsTK4XUbt2cd-aG-mTPmWC0Fry4i874QHy14J0mWhw" 
const bclient = new Brawlstars.Client(btoken)
const dclient = new Discord.Client()

var wb = xlsx.readFile("clubheet.xlsx")
var ws = wb.Sheets["Clublist"];
var clubs = xlsx.utils.sheet_to_json(ws);


dclient.on("ready", async () => {
console.log("I am READY!")
   
   console.log("Async started")
   
console.log(clubs)

cron.schedule('00 30 02 * * Monday' , () =>{


const getClubData = async item => {
  var club = await bclient.getClub(`${item.Club_Tag}`)
  item.Season_Start = club.trophies 
  item.Season_End = 0
  return Promise.resolve(item)
}
const getData = async () => {
  return Promise.all(clubs.map(item => getClubData(item)));
}

getData().then(async (data) => { 
 console.log(data)

    xlsx.utils.sheet_add_json(ws , data)
    xlsx.writeFile(wb, 'clubheet.xlsx');
   
   
   console.log("DONE!")

   clubs = xlsx.utils.sheet_to_json(ws);



})

},{
    scheduled: true,
    timezone: "Pacific"


})

     
   
  

cron.schedule('00 30 00 * * Monday' , () =>{
   if(Math.floor((new Date().now() /604800))%2) return
   const getClubData = async item => {
  var club = await bclient.getClub(`${item.Club_Tag}`)
  item.Season_End = club.trophies 
  item.Trophies_Gained = club.trophies - item.Season_Start
  return Promise.resolve(item)
}
const getData = async () => {
  return Promise.all(clubs.map(item => getClubData(item)));
}

getData().then(async (data) => { 
 console.log(data)

    xlsx.utils.sheet_add_json(ws , data)
    xlsx.writeFile(wb, 'clubheet.xlsx');
   
   
   console.log("DONE!")

   clubs = xlsx.utils.sheet_to_json(ws);


})
clubs = clubs.sort((a,b) => (a.Trophies_Gained > b.Trophies_Gained) ? -1 : ((b.Trophies_Gained > a.Trophies_Gained) ? 1 : 0)); 
for(aclub of clubs){
  
    


}






},
{
   scheduled: true,
   timezone:"Pacific"


})













})

dclient.on("message" , message  =>{

   if(message.content.startsWith(prefix + "dev")){

       var rtm = new Discord.MessageEmbed()
          .setTitle("Developer info:")
          .setThumbnail('https://i.imgur.com/5O2LozU.jpg')
          .setColor("00FFE6")
          .addField('Dev:' ,  client.users.cache.get('324442848759906314').username , true)
          .addField('Location:','Kolkata,West Bengal')
          .addField('Age:' , '15')
          .addField('Bot Dependencies:','node.js || Discord.js v12.2.0 || brawlstars.js v1.0.7 || xlsx v0.16.6 || node-cron v2.0.3 ')
          .addField('Special Thanks to:' , '@Golem#6969 and @Manny A#2160  for helping me in this project!')
          .addField('Bot Launch Date:','22/08/2020')
          .addField("Want a Custom Bot For Your Server!" , "DM Blazing RIGHT AWAY!!")
          .setTimestamp()
          .setFooter('Dev: RLX | BlazingDragon' , 'https://i.imgur.com/5O2LozU.jpg')
          

       message.channel.send(rtm);   



    }





})

dclient.login("NzQ0ODk5MDA1NDY4OTAxMzk3.Xzp7Qg.bp0BGyzaTmZ_8OiTR_iS8dVZ7DQ")


