/**
 * Contains all static customizable variables related to username and twitch spam types and messages.
 *
 * @file Update of https://github.com/gummangummangumman/twitch_chat_simulator/blame/master/javascript/twitchData.js.
 * @author Kathryn DiPippo, gummangummangumman 2020.
 */

/* exported twitchData */

// eslint-disable-next-line no-unused-vars
const twitchData = {
  usernamePrefixes: [
    'crazy', 'universal', 'sick', 'insane', 'cool', 'fun', 'mad', 'generic',
    'Cpt', 'nice', 'Dan', 'VAC', 'SWE', 'Wizard', 'faceless',
    'best_', 'daddy', 'mama', 'mister_', 'davai', 'Nick', 'de_', 'the_', 'iAm',
    'Loungin', 'extra', 'BOT', 'dirty', 'shoutout_to_', 'devil', 'Only'],
  usernameSuffixes: [
    'Kappa', 'Sniper', 'marshmellow', 'Shrek', 'M', 'LUL', 'Games', 'HD', 'lolo',
    '_yolo', 'QQ', 'stone', 'xD', 'meister', 'eric', 'james', 'loser',
    'haha', 'noob', 'dude', 'Bro', 'shotgun', 'DADDY', 'OneTaps', 'winner',
    'xx', 'pepe', 'explosion', 'easy', 'Nut', '000', 'Biceps', 'gamer', 'Majestic',
    'zzzzz', 'vortex', 'sound', 'tv'],
  usernameColors: ['red', 'green', 'teal', 'blue', 'purple', 'yellow'],
  emotes: [
    ['Kappa', 'Kappa.png'],
    ['Kapp', 'Kapp.png'],
    ['WutFace', 'wutface.png'],
    ['D:', 'gasp.png'],
    ['4Head', '4head.png'],
    ['5Head', '5Head.png'],
    ['DansGame', 'dansgame.png'],
    ['NotLikeThis', 'notlikethis.png'],
    ['PogChamp', 'pogchamp.png'],
    ['PogU', 'PogU.png'],
    ['Pog', 'Pog.png'],
    ['POGGERS', 'POGGERS.png'],
    ['WeirdChamp', 'WeirdChamp.png'],
    ['catJAM', 'catJAM.gif'],
    ['KEKW', 'KEKW.png'],
    ['LULW', 'LULW.png'],
    ['LUL', 'LUL.png'],
    ['OMEGALUL', 'OMEGALUL.png'],
    ['PepeLaugh', 'PepeLaugh.png'],
    ['Pepega', 'Pepega.png'],
    ['Clap', 'Clap.gif'],
    ['SeriousSloth', 'SeriousSloth.png'],
    ['TriHard', 'TriHard.png'],
    ['Sadge', 'Sadge.png'],
    ['BibleThump', 'BibleThump.png'],
    ['Kreygasm', 'Kreygasm.png'],
    ['Jebaited', 'Jebaited.png'],
    ['YEP', 'YEP.png'],
    ['<3', 'heart.png'],
    ['monkaW', 'monkaW.png'],
    ['monkaS', 'monkaS.png'],
    ['KKona', 'KKona.png'],
    ['AYAYA', 'AYAYA.png'],
    ['FeelsGoodMan', 'FeelsGoodMan.png'],
    ['FeelsWeirdMan', 'FeelsWeirdMan.png'],
    ['FeelsDankMan', 'FeelsDankMan.png']
  ]
}

const messageData = {
  laughing: {
    '[OMEGALUL]': 1,
    '[OMEGALUL][Clap]': 1,
    '[LULW]': 1,
    '[KEKW]': 1,
    '[LUL]': 1
  },
  positive: {
    '[VAC]': 6,
    '[WTF]': 1,
    '[LUL]': 1,
    'holy shit': 1,
    'SAVED': 1,
    'ez': 1,
    'GG': 1,
    '[Kappa]': 1,
    '[4Head]': 1,
    'WHAT': 1,
    '[PogChamp]': 1,
    '[PogChamp][PogChamp][PogChamp][PogChamp][PogChamp]': 1,
    'KQLY STYLE': 1,
    'ANY NAFFERS [SeriousSloth]': 1,
    '[Kreygasm]': 1,
    '[Pog]': 1,
    '[PogU]': 1,
    '[catJAM]': 1,
    '[PogU][Clap]': 1,
    '[5Head]': 1,
    '300 IQ': 1,
    '[Jebaited]': 1,
    '[FeelsGoodMan]': 1,
    '[<3]': 1
  },
  negative: {
    'BOT': 5,
    'NA CS': 2,
    'WTF': 1,
    '[LUL]': 1,
    'HAHAHAHA': 1,
    'OMG': 1,
    'LMAO': 1,
    'so bad omg': 1,
    'xD': 1,
    'gg': 1,
    'RUINED': 1,
    '[Kappa]': 1,
    '[WutFace]': 1,
    '[NotLikeThis]': 1,
    '[4Head]': 1,
    '[OMEGALUL]': 1,
    '[OMEGALUL][Clap]': 1,
    '[BibleThump]': 1,
    'My team [Sadge]': 1,
    '[KEKW]': 1,
    '[Pepega]': 1,
    '[D:]': 1,
    '[WeirdChamp]': 1,
    '[monkaS]': 1
  },
  jams: {
    'cat[JAM': 1
  },
  weebs: {
    '[AYAYA][Clap]': 5,
    '[AYAYA][Clap][AYAYA][Clap][AYAYA][Clap]': 3,
    '[AYAYA][Clap][AYAYA][Clap][AYAYA][Clap][AYAYA][Clap][AYAYA][Clap]': 3,
    'WEEBS OUT [DansGame]': 1
  }
}

let messageDataSum = {}
