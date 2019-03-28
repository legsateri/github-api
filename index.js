'use strict';

function displayResults(responseJson) {
    console.log(responseJson);
    $('results-list').empty();
    for (let i = 0; i <responseJson.repos.length; i++) {
        $('#results-list').append(
            //`<li><h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
            //<p>${responseJson.articles[i].source.name}</p>
            //<p>By ${responseJson.articles[i].author}</p>
            //<p>${responseJson.articles[i].description}</p>
            //<img src='${responseJson.articles[i].urlToImage}'>
            //</li>`
        )};
    $('#results').removeClass('hidden');
}

function getRepos(userName) {
    
    //Logs URL to the console.
    console.log(`https://api.github.com/users/:${userName}/repos`)

    //GET request pulling repos based on GitHub user name.
    fetch(`https://api.github.com/users/:${userName}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))

        //Triggers error message if necessary.
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

//Watch for submit on form.
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userName = $('#js-user-name').val();
        getRepos(userName);
    });
}

//Runs when the page loads.
$(watchForm);