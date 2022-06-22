// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const frase1 = 'You can tell me Brandocean';
  const frase2 = 'I like watching anime';
  const frase3 = 'I have 3 dogs';
  const frase4 = 'I study at Tec de Monterrey in Cuernavaca, Morelos';
  const greetings =
      [frase1, frase2, frase3, frase4];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

async function showServerTime() {
    const responseFromServer = await fetch('/date');
    const textFromResponse = await responseFromServer.text();
  
    const dateContainer = document.getElementById('date-container');
    dateContainer.innerText = textFromResponse;
  }

/** Fetches stats from the server and adds them to the page. */
async function getServerStats() {
    const responseFromServer = await fetch('/server-stats');
    // The json() function returns an object that contains fields that we can
    // reference to create HTML.
    const stats = await responseFromServer.json();
  
    const statsListElement = document.getElementById('server-stats-container');
    statsListElement.innerHTML = '';
  
    statsListElement.appendChild(
        createListElement('Start time: ' + stats.startTime));
    statsListElement.appendChild(
        createListElement('Current time: ' + stats.currentTime));
    statsListElement.appendChild(
        createListElement('Max memory: ' + stats.maxMemory));
    statsListElement.appendChild(
        createListElement('Used memory: ' + stats.usedMemory));
}
  
/** Creates an <li> element containing text. */
function createListElement(text) {
const liElement = document.createElement('li');
liElement.innerText = text;
return liElement;
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** Creates a chart and adds it to the page. */
function drawChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Animal');
  data.addColumn('number', 'Count');
        data.addRows([
          ['School', 8],
          ['Projects', 6],
          ['Family', 1],
          ['Habits', 1],
          ['Sleep', 8]
        ]);

  const options = {
    'title': 'My daily routine',
    'width':500,
    'height':500
  };

  const chart = new google.visualization.PieChart(
      document.getElementById('chart-container'));
  chart.draw(data, options);
}
