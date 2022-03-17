//To-Do
//1. Give basic Html and Css ✅✅
//2. try fetching the data from the Api and console ✅✅
//3. ConsoleLog the Search url ✅✅
//4. try adding basic contents on the document ✅✅
//5. retrieve image from the api ✅✅
//6. append image in to the doc ✅✅
//7. give some more css ✅✅
//8. implement pop-up modal ✅✅
//9. fetch the movie info ✅✅
//9. implement watch trailer button for each movie in the pop up✅


//refreshing the page on header click
function refreshPage() {
    window.location.reload();
};

// expressing the elements
const url = 'http://www.omdbapi.com/?t=batman&apikey=1f4503a2';
const searchValue = document.querySelector('#searchValue');
const searchButton = document.querySelector('#searchButton');
const movieContainer = document.querySelector('#movie-list');
const contentModal = document.querySelector('.content-modal');
const closeModal = document.querySelector('#close-modal');


//adding events to the search button
searchButton.addEventListener('click', event => {
    event.preventDefault();
    const textValue = searchValue.value;  

    const searchURL = `https://www.omdbapi.com/?s=${textValue}&apikey=1f4503a2`

    fetch(searchURL)
    .then(response => response.json())
    .then(renderMovies)
        
        // movieContainer.innerHTML = ""; 
        // const movies = data.Search;                  //has been moved to a new function
        // const newMovieList = movieList(movies);           
        // movieContainer.appendChild(newMovieList);
        // console.log(data)

    .catch(error => console.log('Error:', error));

    searchValue.value = '';   //empties the search after each input
})

function imageSection(movies) {   //fetching images based on imdbID
    return movies.map((movie) => {
        if(movie.Poster !== "N/A"){
            return `<img                    
                src="${movie.Poster}"          
                data-id="${movie.imdbID}"
            />`;             //removes extra spaces in the appended html
        }
    })
}

function movieList(movies) {        //creating div and section to hold the images
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movies');
    const movieSection = `
        <section class="imageSection">
        ${imageSection(movies)}  
        </section>`;          //passing imageSection function to work better with template literal
    movieElement.innerHTML = movieSection;
    return movieElement;
}

function renderMovies(data) {
      movieContainer.innerHTML = ''; //adding an empty html gives new search within, without reloading the page 
     const movies = data.Search;
     const newMovieList = movieList(movies);     // calling the movieList function to retrive the search data      
     movieContainer.appendChild(newMovieList);
     console.log(data);
}

document.addEventListener('click', event => {
    const target = event.target
    if(target.tagName.toLowerCase() === 'img'){     //converting tagNAME into lowercase as its uppercase by default
        // console.log('hy') 
        const movieId = event.target.dataset.id;
        console.log(movieId);

        const section = event.target.parentElement;
        const divMovies = section.parentElement;
        const divMoviesList = divMovies.parentElement;
        const globalContainer = divMoviesList.parentElement;
        const contentModal = globalContainer.nextElementSibling;      //targeting the target with event bubbling
        contentModal.classList.add('content-modal-display');    //adding pop up


        fetch (`https://www.omdbapi.com/?i=${movieId}&apikey=1f4503a2`)      //fetching the info 
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // console.log(data.Title);
            // console.log(data.Poster);

            const content =`
                <button type="close" id="close-modal">X</button>
                <div class="movie-image">
                    <img src="${data.Poster}" alt="movies image">
                </div>
                <div class="movie-info">
                    <h1 class="movie-title">${data.Title}</h1>
                    <ul class="more-movie-info">
                        <li class="year">Year: ${data.Year}</li>
                        <li class="rate">Ratings: ${data.Rated}</li>
                        <li class="release">Released: ${data.Releases}</li>
                    </ul>
                    <br>
                    <p class="genre"><b>Genre:</b> ${data.Genre}</p>
                    <p class="writer"><b>Writer:</b> ${data.Writer}</p>
                    <p class="actors"><b>Actors:</b> ${data.Actors}</p>
                    <p class="plot"><b>Plot:</b> ${data.Plot}</p>
                    <p class="awards"><b>Awards:</b> ${data.Awards}</p>
                    <img src="./images/youtube.webp" id="yt-logo">
                    <button id="youtube-logo" style="text-align: center;"/><b>Watch Trailer</b></button>
                </div>`

            const contentModalTwo = document.querySelector('.content-modal-display'); 
            contentModalTwo.innerHTML = content;        //adding the info in the content-Modal
       
        })
    }
    if(target.id === 'youtube-logo') {          //embedding a yt playlist when the watch trailor button is clicked
        // const contentModalThree = document.createElement('div');
        // contentModalThree.setAttribute('class', 'trailer')
        // contentModalThree.innerHTML = `

        // <button id="close-iframe" onclick="this.parentElement.remove();">X</button>
        // <iframe width="560" height="315" id="iframe"
        // src="https://www.youtube.com/embed/videoseries?list=PLpaBntXEYpU2wHh4vyIq2M8LAyeT538DD" 
        // title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
        // clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        // `;
        // contentModal.appendChild(contentModalThree);
        // const contentModalThree = document.createElement('div');
        // contentModalThree.setAttribute('class', 'trailer')
        // contentModalThree.innerHTML = `<form onsubmit="getTrailer(); return false;" id="search-trailer-form" >
        // <input type="text"  id="search-trailer"/>
        // <input type="submit" value="Search movie" id="submit-trailer" />
        // </form>`
        // contentModal.appendChild(contentModalThree);
        const movieTitle = document.querySelector('.movie-title');
        const iframeValue = movieTitle.innerHTML;
        const iframeUrl = `https://youtube-v31.p.rapidapi.com/search?q=${iframeValue}+trailer&maxResults=1`
        fetch((iframeUrl), {
	        "method": "GET",
	        "headers": {
		    "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
		    "x-rapidapi-key": "285626be1emsh6252dd238a98631p1c38c5jsn328387bb55ff"
	        }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const contentModalThree = document.createElement('div');
            contentModalThree.setAttribute('class', 'trailer')
            contentModalThree.innerHTML = `
    
            <button id="close-iframe" onclick="this.parentElement.remove();">X</button>
            <iframe width="560" height="315" id="iframe"
            src="https://www.youtube.com/embed/${iframeValue}+trailer&maxResults=1" 
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
            clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
            contentModal.appendChild(contentModalThree);

        })
        .catch(err => {
	        console.error(err);
        });

    }
    if(target.id === 'close-modal') {
        const modal = target.parentElement;
        modal.classList.remove('content-modal-display');    //closing pop-up
    }
})
/* <form onsubmit="getTrailer(); return false;" id="search-trailer-form" >
<input type="text"  id="search-trailer"/>
<input type="submit" value="Search movie" id="submit-trailer" />
</form> */

// function getTrailer(){
//     const baseUrl = `https://www.youtube.com/embed/videoseries?list==${search_field}` ;
//     const searchTrailer = document.getElementById('search-trailer').value ;
//     const targetUrl = baseUrl + searchTrailer ;
//     const iframe = document.getElementById('iframe') ;
//     iframe.src = targetUrl ;
//     return false ;
// }


// fetch("https://youtube-search6.p.rapidapi.com/trending?country=US&lang=en", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "youtube-search6.p.rapidapi.com",
// 		"x-rapidapi-key": "285626be1emsh6252dd238a98631p1c38c5jsn328387bb55ff"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });



