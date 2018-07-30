$(document).ready(() => {
	$('#searchForm').on('submit',(e) => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});

function getMovies(searchText) {
	axios.get('http://www.omdbapi.com/?apikey=92032d0c&s='+searchText)
	.then((response) =>{

		console.log(response);
		let movies = response.data.Search;
		let output = '';
		$.each(movies, (index, movie) => {

			output += `
			<div class="col-md-3">
			<div class="well text-center">
            <img src="${movie.Poster}">
			<h5>${movie.Title}</h5>
			<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
			</div>
			</div>
			`; 
		});

		$('#movies').html(output);

	})

.catch((err)=>{
	console.log(err);
});

}

function movieSelected(id) {
	sessionStorage.setItem('movieId', id);
	window.location = 'movie.html';
	return false;
}

function getMovie() {
	let movieId = sessionStorage.getItem('movieId');
	axios.get('http://www.omdbapi.com/?apikey=92032d0c&i='+movieId)
	.then((response) =>{

		console.log(response);
		let movie = response.data;
		let output= `
          <div class="row">
           
          <div class="col-md-4">
           <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
            <li class="list-group-item"><strong>Genre: <i class="fab fa-gripfire"></i> </strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Type: <i class="fas fa-camera-retro"></i> </strong> ${movie.Type}</li>
            <li class="list-group-item"><strong>Released: <i class="far fa-calendar-alt"></i> </strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Runtime: <i class="far fa-clock"></i></strong> ${movie.Runtime}</li>
            <li class="list-group-item"><strong>Rated: <i class="fas fa-star-half-alt"></i></strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>Language: <i class="fas fa-language"></i></strong> ${movie.Language}</li>
            <li class="list-group-item"><strong>IMDB: <i class="fab fa-imdb"></i></strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Production: <i class="fab fa-python"></i></strong> ${movie.Production}</li>
            <li class="list-group-item"><strong>Website: <i class="fab fa-python"></i></strong> ${movie.Website}</li>
            <li class="list-group-item"><strong>Director: <i class="fas fa-user"></i></strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer: <i class="fas fa-pen-nib"></i></strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors: <i class="fas fa-users"></i></strong> ${movie.Actors}</li>
            <li class="list-group-item"><strong>Box Office Collection: <i class="fas fa-dollar-sign"></i></strong> ${movie.BoxOffice}</li>
            <li class="list-group-item"><strong>Awards: <i class="fas fa-trophy"></i></strong> ${movie.Awards}</li>
            </ul>
          </div>

          </div>
           <div class="row text">
                <div class="well">
                <br>
                <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html"class="btn btn-primary">Go Back To search</a> 

           </div>

		`;
         $('#movie').html(output);

	})

.catch((err)=>{
	console.log(err);
});
}