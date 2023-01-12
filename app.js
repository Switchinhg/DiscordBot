import 'dotenv/config';
import express from 'express';
import {Client, GatewayIntentBits} from 'discord.js'
import  moment from 'moment'
moment.locale('es')

const prefijo = '!'

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json());

/* EMOJIS */
const emojis = [':star_struck:',':star2:',':1_:',':2_:',':4_:',':6_:',':8_:',':admiral2:',':admiral:']


/* Creamos el bot */
const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
	],
})

/* Cuando Inicializa */
bot.on('ready', () =>{
  bot.user.setActivity('Viendo quien juega valo')
  bot.user.setAvatar('https://editors.dexerto.com/wp-content/uploads/2022/05/20/Valorant-series.jpg')
})

/* Cuando alguien entra al servidor */
bot.on('guildMemberAdd',async member=>{
  const channel = await bot.channels.fetch('698009245521543168') //SwiCynGoki
  // const channel = await bot.channels.fetch('974806355208716348') //Swicho's Privado
  const emojiSelected = Math.floor(Math.random()* emojis.length)
  if(!channel) return
  channel.send(`Bienvenido al servidor! ${member} ${emojis[emojiSelected]}`)
})


/* Cuando cambia la actividad de  algun usuario */
bot.on('presenceUpdate', async ( oldPresence, newPresence ) =>{
  if(newPresence.activities[0]?.name){
    const channel = await bot.channels.fetch('1063197611705774220') //SWiCynGoki
    // const channel = await bot.channels.fetch('974806355208716348') //Swicho's Privado

    const time = moment().format('LT')
    if(newPresence.activities[0].name === 'VALORANT'){
      channel.send(`Huelo que <@${newPresence.user.id}> entro a Valorant a las ${time} :smiling_imp:`)
    }else{
      // tests
      // channel.send(`Huelo que <@${newPresence.user.id}> entro a Valorant a las ${time} :smiling_imp:`)
      
    }
  }
})

/* al mandar mensaje */
bot.on('messageCreate', message =>{
  let args = message.content.substring(prefijo.length).split(" ")
    switch (args[0]){
      case 'hola':
        message.channel.send('RATON SIN COLA')
        break
    }
})

/* Logea el bot */
bot.login(process.env.DISCORD_TOKEN)

/* crea server */
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
