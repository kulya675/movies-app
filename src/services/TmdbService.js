/* eslint-disable no-console */
class TmdbService {
  API_BASE = 'https://api.themoviedb.org/3/';

  API_BASE_SEARCH = `${this.API_BASE}search/movie`;

  API_BASE_AUTHENTICATION = `${this.API_BASE}authentication/guest_session/`;

  API_BASE_RATE = `${this.API_BASE}movie/`;

  API_KEY = '503aa50f19b9fe0264b5fb74042cc1f7';

  GUEST_SESSION_ID = '';

  async getSearchResources(searchValue, pageValue) {
    const url = `${this.API_BASE_SEARCH}?api_key=${this.API_KEY}&query=${searchValue}&page=${pageValue}`;
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}`);
    }

    return result.json();
  }

  async getSearchResults(searchValue, pageValue) {
    const res = await this.getSearchResources(searchValue, pageValue);

    return res.results.map(this.transformRequestResults);
  }

  async getTotalResults(searchValue) {
    const res = await this.getSearchResources(searchValue);
    return res.total_results;
  }

  async createGuestSession() {
    const url = `${this.API_BASE_AUTHENTICATION}new?api_key=${this.API_KEY}`;
    const result = await fetch(url);

    return result.json().then(({ expires_at: expires, guest_session_id: sessionId }) => {
      this.setCookieSession(expires, sessionId);
    });
  }

  async rateMovie(movieId, rateCount) {
    const guestId = this.getCookieSessionId();
    const url = `${this.API_BASE_RATE}${movieId}/rating?api_key=${this.API_KEY}&guest_session_id=${guestId}`;
    const fetchParam = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ value: rateCount }),
    };

    const response = await fetch(url, fetchParam);

    return response.json();
  }

  async getRatedMovies() {
    const id = this.getCookieSessionId();
    const url = `${this.API_BASE}guest_session/${id}/rated/movies?api_key=${this.API_KEY}`;
    const res = await fetch(url);
    const json = await res.json();

    return json.results.map(this.transformRequestResults);
  }

  async getGenres() {
    const url = `${this.API_BASE}genre/movie/list?api_key=${this.API_KEY}`;
    const res = await fetch(url);

    return res.json();
  }

  setCookieSession(expire, sessionId) {
    let expireAt = new Date(expire);
    expireAt = expireAt.toUTCString();
    document.cookie = `guest_session_id=${sessionId}; expires=${expireAt}`;
    this.GUEST_SESSION_ID = sessionId;
  }

  getCookieSessionId() {
    const [cookieTitle, guestId] = document.cookie.split('=');
    if (cookieTitle === 'guest_session_id') {
      this.GUEST_SESSION_ID = guestId;
      return this.GUEST_SESSION_ID;
    }
    return false;
  }

  transformRequestResults = (result) => {
    return {
      id: result.id,
      title: result.title,
      overview: result.overview,
      posterPath: result.poster_path,
      releaseDate: result.release_date,
      voteAverage: result.vote_average,
      genreIds: result.genre_ids,
      rating: result.rating,
    };
  };
}

export default TmdbService;
