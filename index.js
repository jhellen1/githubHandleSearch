'use strict';


function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the jsonResponse array, stopping at the max number of objects
  for (let i = 0; i < responseJson.length; i++) {
    // for each repo object in the jsonResponse
    //array, add a list item to the results 
    //list with the repo name linking to the repos
    //url
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}" target="blank">${responseJson[i].name}</a></h3></li>`
    )};
  $('#results').removeClass('hidden');
};

function getRepos() {
  const userName = $('#js-user-handle').val();

  const url = `https://api.github.com/users/${userName}/repos`;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getRepos();
  });
}

$(watchForm);