/**
 * twitch.html companion. Manages Twitch chat UI interactions and speech/volume to spam handling.
 *
 * @file Contains speech-to-text handling, spam handling, and UI interactivity.
 * @author Kathryn DiPippo
 */

/* global twitchData */
let spamming = false
let spamType = 'laughing'
let spamSpeed = 1200

// eslint-disable-next-line no-use-before-define, no-undef
const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continuous = true
recognition.addEventListener('error', function (event) {
  console.error('Speech recognition error detected: ' + event.error)
})

/**
 * Writes a random message in the chat.
 * @returns {void}
 */
function writeMessage () {
  $('#chattext').append(getMessage())
  cutTopOfChat()
  scrollToBottom()
}

/**
 * Randomly selects a string from a provided array.
 * @param {string[]} arr - Array of messages.
 * @returns {string} Randomly selected entry.
 */
function getRandomItem (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Returns the chat message HTML.
 * @param {string} [username=getUserName()] - Username text.
 * @param {string} [msg=Randomly selected message] - Chat message text.
 * @returns {string} message.
 */
function getMessage (
  username = getUserName(),
  msg = replaceEmotes(getRandomItem(twitchData.messages[spamType]))
) {
  return `
<div class="chatMessage">
  <div class="username ${getRandomItem(twitchData.usernameColors)}">${username}</div>
  <div class="text">${msg}</div>
</div>
`
}

/**
 * Replace the emote abbreviations in a string with img HTML.
 * @param {string} msg - message with text emotes.
 * @returns {string} message with img emotes.
 */
function replaceEmotes (msg) {
  msg = ` ${msg} ` // Add space before and after.
  for (let i = 0; i < twitchData.emotes.length; i++) {
    msg = msg.replaceAll(` ${twitchData.emotes[i][0]} `, ` <img src='pics/twitch_emotes/${twitchData.emotes[i][1]}' alt='${twitchData.emotes[i][1]}'> `)
  }
  msg = msg.slice(1, -1) // Remove the added spaces.
  return msg
}

/**
 * Returns a random username.
 * @returns {string} randomly generated username.
 */
function getUserName () {
  let username = getRandomItem(twitchData.usernamePrefixes) + getRandomItem(twitchData.usernameSuffixes)
  if (Math.random() > 0.5) {
    username += `${Math.floor(Math.random() * 120)}`
  }
  return username
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
  const textfield = $('#textfield').val()
  if (textfield !== '') {
    $('#chattext').append(getMessage(undefined, replaceEmotes(textfield)))
    scrollToBottom()
    cutTopOfChat()
  }
  $('#textfield').val('') // Clear contents of textfield.
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
 * Scrolls to the bottom of the chat.
 * @returns {void}
 */
function scrollToBottom () {
  const chattext = document.getElementById('chattext')
  chattext.scrollTop = chattext.scrollHeight
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
  console.log(`val = ${val}`)
  // TODO - slider is on a scale of 0 to 100, while volume meter is from 0 to 1
  spamSpeed = 2200 - (20 * val)
}

/**
 * Starts recognition detection and updates speech-to-text interface elements.
 * @returns {void}
 */
function startRecording () {
  recognition.onstart = function () {
    console.log('-- onstart')
    $('#recordingbutton').addClass('active')
    $('#output').html('[Listening]')
  }
  recognition.onresult = function (event) {
    const index = event.results.length - 1
    const transcript = event.results[index][0].transcript
    $('#output').html(transcript)
    handleTranscript(transcript)
  }

  recognition.start()

  recognition.onend = function () {
    console.log('-- onend')
    $('#recordingbutton').removeClass('active')
    $('#output').html('[Off]')
  }
}

/**
 * Disables recognition detection and updates speech-to-text interface elements.
 * @returns {void}
 */
function stopRecording () {
  recognition.stop()
  $('#recordingbutton').removeClass('active')
}

/**
 * Sets spam type and updates spamType select dropdown.
 * @param {string} newSpamType - Spam type string.
 * @returns {void}
 */
function setSpamType (newSpamType) {
  spamType = newSpamType
  $('#selectspamtype').val(newSpamType)
}

/**
 * Interprets live speech-to-text transcript and changes spam type based on dialogue.
 * @param {string} transcript - Input live dialogue.
 * @returns {void}
 */
function handleTranscript (transcript) {
  // laughing, positive, negative, jams, weebs
  if (transcript.includes('haha')) {
    setSpamType('laughing')
  }
  if (transcript.includes('banger')) {
    setSpamType('jams')
  }
  if ((transcript.includes('weebs')) || (transcript.includes('anime'))) {
    setSpamType('weebs')
  }
  spamType = $('#selectspamtype').val()
}

/**
 * Initializes HTML page and inits all onclick functionality.
 * @returns {void}
 */
$(function () {
  spam()

  $('#clearButton').on('click', function () {
    clearChat()
  })

  $('#spamButton').on('click', function () {
    spam()
  })

  $('#selectspamtype').on('change', function () {
    chooseSpam()
  })

  $('#selectspeed').on('change', function () {
    chooseSpeed()
  })

  $('#textfield').on('keyup', function (event) {
    if (event.code === 'Enter') {
      chat()
    }
  })

  $('#chatButton').on('click', function () {
    chat()
  })

  $('#chatButtonToggle').on('click', function () {
    $('#input').toggle()
  })

  $('#recordingbutton').on('click', function () {
    if ($('#recordingbutton').hasClass('active')) {
      stopRecording()
      stopListening() // eslint-disable-line no-undef
    } else {
      startRecording()
      startListening() // eslint-disable-line no-undef
    }
  })
})
