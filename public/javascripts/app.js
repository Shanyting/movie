$(document).ready(function() {
  const titleInput = $('#movie-title');
  const poster = $('#poster');
  const runtime = $('#runtime');
  const released = $('#released');
  const genre = $('#genre');
  const errorMessage = $('#error-message');
  const website = $('#website');
  const imdbRating = $('#imdbRating');
  titleInput.on('keyup', function(e) {
    if (e.key === "Enter") {
      const movieTitle = titleInput.val();
      titleInput.val('');
      $.get(`/movieInfo?title=${movieTitle}`, (response) => {
        if (response.poster) {
          errorMessage.addClass('hidden');
          poster.removeClass('hidden');
          poster.attr('src', response.poster);
          genre.text(`Genre: ${response.genre}`);
          runtime.text(`Runtime: ${response.runtime}`);
          released.text(`Released: ${response.released}`);
          website.text(`Website: ${response.website}`)
          imdbRating.text(`IMBD Rating: ${response.imdbRating}`)
        }
        else {
          errorMessage.removeClass('hidden');
          errorMessage.text(`Could not locate the poster for ${movieTitle}`);
          poster.addClass('hidden');
        }
      })
    }
  })
})
