export default cb => {
  const recognizer = new webkitSpeechRecognition({ lang: 'en-US'});

  recognizer.onresult = ({ results }) => {
    let result = results[event.resultIndex];
    let text = result[0].transcript.toLowerCase()
    if (result.isFinal) cb(text)
  }

  recognizer.onend = event => {
    recognizer.stop();
    recognizer.start();
  }

  recognizer.start();
}
