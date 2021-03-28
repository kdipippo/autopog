let $ = jQuery = require('jquery');

let spamming = false
let darkMode = false
let spamType = 'laughing'
let spamSpeed = 1200

/**
 * Called automatically when the HTML page is loaded.
 * @returns {void}
 */
function init () {
  makeSettings()
  toggleSettings()
  spam()
}

/**
 * Writes a random message in the chat.
 * @returns {void}
 */
function writeMessage () {
  const element = $('#chattext')
  element.append(getMessage())
  cutTopOfChat()
  scrollToBottom()
}

/**
 * Randomly selects a string from a provided array.
 * @param {string[]} messageArray array of messages.
 * @returns {string} randomly selected entry.
 */
function getRandomMessage (messageArray) {
  return messageArray[Math.floor(Math.random() * messageArray.length)]
}

/**
 * Returns a random message.
 * @returns {string} message.
 */
function getMessage () {
  const message = $('<p></p>')
  message.attr('class', 'chatMessage')
  message.append(getUserName())
  message.append(': ')

  let msgBody = ''

  if (spamType === 'positive') {
    msgBody = getRandomMessage(positiveMessages)
  } else if (spamType === 'negative') {
    msgBody = getRandomMessage(negativeMessages)
  } else if (spamType === 'bobross') {
    msgBody = getRandomMessage(bobRossMessages)
  } else if (spamType === 'laughing') {
    msgBody = getRandomMessage(laughingMessages)
  } else if (spamType === 'spam') {
    msgBody = getRandomMessage(spamMessages)
  }

  msgBody = replaceEmotes(msgBody)

  message.append(msgBody)

  return message
}

/**
 * Replace the emote abbreviations in a string with img HTML.
 * @param {string} msg message with text emotes.
 * @returns {string} message with img emotes.
 */
function replaceEmotes (msg) {
  msg = ' ' + msg + ' ' // add space before and after

  for (let i = 0; i < emotes.length; i++) {
    msg = msg.replace(new RegExp(' ' + emotes[i][0] + ' ', 'g'), " <img src='pics/twitch_emotes/" + emotes[i][1] + "' alt='" + emotes[i][0] + "'> ")
  }

  msg = msg.slice(1, -1) // remove the added spaces
  return msg
}

/**
 * Returns a random username.
 * @returns {string} randomly generated username.
 */
function getUserName () {
  const username = $('<span></span>')
  username.attr('class', 'username')
  username.css('color', getUsernameColor())
  username.append(usernamePrefixes[Math.floor(Math.random() * usernamePrefixes.length)]) // gets a random username from the array
  username.append(usernameSuffixes[Math.floor(Math.random() * usernameSuffixes.length)]) // gets a random username from the array

  if (Math.random() > 0.5) {
    username.append(Math.floor(Math.random() * 120))
  }

  return username
}

/**
 * Returns a randomly selected username color.
 * @returns {string} randomly selected color.
 */
function getUsernameColor () {
  return usernameColors[Math.floor(Math.random() * usernameColors.length)]
}

/**
 * Hides all messages in chat.
 * @returns {void}
 */
function hideChatText () {
  const element = $('#chattext')
  const hideButton = $('#hideButton')

  element.toggle()
  hideButton.empty()

  if (element.is(':visible')) {
    hideButton.append('hide')
  } else {
    hideButton.append('show')
  }
}

/**
 * Clears all messages in chat.
 * @returns {void}
 */
function clearChat () {
  const element = $('#chattext')
  element.empty()
}

/**
 * Writes the text of the input field into the chat with a random username.
 * @returns {void}
 */
function chat () {
  const textfield = $('#textfield')
  const element = $('#chattext')

  if (textfield.val() != '') {
    const message = $('<p></p>')
    message.attr('class', 'chatMessage')
    message.append(getUserName())
    message.append(': ')

    let msgBody = textfield.val()
    msgBody = replaceEmotes(msgBody)

    message.append(msgBody)

    textfield.val('')

    element.append(message)
    scrollToBottom()
    cutTopOfChat()
  }
}

/**
 * Starts spamming, calls keepSpamming().
 * @returns {void}
 */
function spam () {
  const spamButton = $('#spamButton')
  spamButton.empty()

  if (spamming) {
    spamming = false
    spamButton.append('spam')
  } else {
    spamming = true
    keepSpamming()
    spamButton.append('stop spamming')
  }
}

/**
 * Recursive function that writes a message every 0-249ms.
 * @returns {void}
 */
function keepSpamming () {
  if (spamming) {
    writeMessage()
    setTimeout(function () { keepSpamming() }, Math.floor(Math.random() * spamSpeed))
  }
}

/**
 * Scrolls to the bottom of the chat.
 * @returns {void}
 */
function scrollToBottom () {
  const chattext = document.getElementById('chattext')
  chattext.scrollTop = chattext.scrollHeight
}

/**
 * Checks to see if the chat is too long and cuts the top elements if it is.
 * @returns {void}
 */
function cutTopOfChat () {
  const element = $('#chattext')
  if (element.children().length > 170) {
    const chatMessages = element.children()
    for (let i = 0; i < 30; i++) {
      chatMessages[i].remove()
    }
  }
}

/**
 * Toggles between dark mode and normal mode.
 * @returns {void}
 */
function darkmode () {
  const chat = $('#chat')
  if (darkMode) {
    darkMode = false
    chat.css('color', 'black')
    chat.css('background-color', 'white')
    $('#textfield').css('background-color', 'white')
    $('#textfield').css('color', 'black')
    $('#chattext').removeAttr('class')
  } else {
    darkMode = true
    chat.css('color', 'white')
    chat.css('background-color', '#1e1e1e')
    $('#textfield').css('background-color', '#141414')
    $('#textfield').css('color', 'white')
    $('#chattext').attr('class', 'dark')
  }
}

/**
 * Makes a "settings" box.
 * @returns {void}
 */
function makeSettings () {
  $('#settingsButton').css('background-color', '#4b2f7f')

  const settings = $('<div></div>')
  settings.attr('id', 'settings')

  const clearButton = $('<button></button>')
  clearButton.append('clear')
  clearButton.attr('onClick', 'clearChat()')

  const spamButton = $('<button></button>')
  if (spamming) {
    spamButton.append('stop spamming')
  } else {
    spamButton.append('spam')
  }
  spamButton.attr('onclick', 'spam()')
  spamButton.attr('id', 'spamButton')

  const darkModeButton = $('<button></button>')
  darkModeButton.append('toggle dark mode')
  darkModeButton.attr('onclick', 'darkmode()')

  const selectSpam = $('<select><select>')
  selectSpam.attr('id', 'selectspamtype')
  selectSpam.attr('onChange', 'chooseSpam()')

  const positiveSpam = $('<option></option>')
  positiveSpam.attr('value', 'positive')
  positiveSpam.append('Positive (CS)')
  const negativeSpam = $('<option></option>')
  negativeSpam.attr('value', 'negative')
  negativeSpam.append('Negative (CS)')
  const bobRossSpam = $('<option></option>')
  bobRossSpam.attr('value', 'bobross')
  bobRossSpam.append('Bob Ross')
  const laughingSpam = $('<option></option>')
  laughingSpam.attr('value', 'laughing')
  laughingSpam.append('Laughing')
  const spamSpam = $('<option></option>')
  spamSpam.attr('value', 'spam')
  spamSpam.append('Spam')

  selectSpam.append(laughingSpam)
  selectSpam.append(positiveSpam)
  selectSpam.append(negativeSpam)
  selectSpam.append(bobRossSpam)
  selectSpam.append(spamSpam)

  const selectSpeed = $('<input></input>')
  selectSpeed.attr('type', 'range')
  selectSpeed.attr('id', 'selectspeed')
  selectSpeed.attr('onchange', 'chooseSpeed()')

  settings.append(clearButton)
  settings.append('<br>')
  settings.append(spamButton)
  settings.append('<br>')
  settings.append(darkModeButton)
  settings.append($('<h3></h3>').append('type of spam'))
  settings.append(selectSpam)
  settings.append($('<h3></h3>').append('speed'))
  settings.append(selectSpeed)

  const chat = $('#chat')
  chat.append(settings)
}

/**
 * Shows or hides the chat.
 * @returns {void}
 */
function toggleSettings () {
  $('#settings').toggle()

  if ($('#settings').css('display') === 'none') {
    $('#settingsButton').css('background-color', '#6441a4')
  } else {
    $('#settingsButton').css('background-color', '#4b2f7f')
  }
}

/**
 * Sets the type of spam from the input in the settings.
 * @returns {void}
 */
function chooseSpam () {
  spamType = $('#selectspamtype').val()
}

/**
 * Sets the speed from the input in the settings.
 * @returns {void}
 */
function chooseSpeed () {
  const val = $('#selectspeed').val()
  spamSpeed = 2200 - (20 * val)
}

/**
 * Gives the user an input field to change the name of the channel.
 * @returns {void}
 */
function changeChannel () {
  $('#abovechat').empty()
  const form = $('<form></form>')
  form.attr('onsubmit', 'return false')

  const input = $('<input></input>')
  input.attr('type', 'text')
  input.attr('placeholder', 'channel name')
  input.attr('id', 'channelnameinput')

  const button = $('<input></input>')
  button.attr('type', 'submit')
  button.attr('onClick', 'setChannelName()')
  button.attr('value', 'set')

  form.append(input)
  form.append(button)
  $('#abovechat').append(form)
}

/**
 * Sets the channel name.
 * @returns {void}
 */
function setChannelName () {
  const name = $('#channelnameinput').val()
  $('#abovechat').empty()
  const channelname = $('<p></p>')
  channelname.attr('onclick', 'changeChannel()')
  channelname.attr('id', 'channelname')
  channelname.append(name)
  $('#abovechat').append(channelname)
}

/**
 * Initializes HTML page and inits all onclick functionality.
 * @returns {void}
 */
$(document).ready(function () {
  init()

  $('#channelname').click(function() {
    changeChannel()
  })
  $('#chatButton').click(function() {
    chat()
  })
  $('#settingsButton').click(function() {
    toggleSettings()
  })
})
