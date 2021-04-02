
/**
 * index.html companion. Manages UI interaction to open twitch.html popup.
 *
 * @file Contains speech-to-text handling, spam handling, and UI interactivity.
 * @author Kathryn DiPippo
 */

/**
 * Opens a popup containing twitch.html.
 * @returns {void}
 */
function miniWindow () {
  const params = {
    scrollbars: 'no',
    resizable: 'no',
    status: 'no',
    location: 'no',
    toolbar: 'no',
    menubar: 'no',
    width: 800,
    height: 600,
    left: 0,
    top: 0
  }
  const flatparams = JSON.stringify(params).replaceAll('"', '').replaceAll(':', '=').replaceAll('{', '').replaceAll('}', '')
  open('twitch.html', 'test', flatparams)
}

/**
 * Initializes HTML page and inits all onclick functionality.
 * @returns {void}
 */
$(function () {
  $('#miniwindow').on('click', function () {
    miniWindow()
  })
})
