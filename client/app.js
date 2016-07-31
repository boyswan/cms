import './index.html'



var recognizer = new webkitSpeechRecognition();

// Start producing results before the person has finished speaking
recognizer.interimResults = true;

// Set the language of the recognizer
recognizer.lang = 'en-US';

// Define a callback to process results
recognizer.onresult = function (event) {
  var result = event.results[event.resultIndex];

  if (result.isFinal) {
   console.log('You said: ' + result[0].transcript);
  }
  //  else {
  //  console.log('Interim result', result[0].transcript);
  // }
};

// Start listening...
recognizer.start();

const App = () =>
  <div> hello client here </div>


ReactDOM.render(<App/>, document.getElementById('app'))
