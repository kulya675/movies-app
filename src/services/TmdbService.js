class TmdbService {
  API_BASE_SEARCH = 'https://api.themoviedb.org/3/search/movie';

  API_KEY = '503aa50f19b9fe0264b5fb74042cc1f7';

  async getResources(searchValue, pageValue) {
    const url = `${this.API_BASE_SEARCH}?api_key=${this.API_KEY}&query=${searchValue}&page=${pageValue}`;
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}`);
    }
    return result.json();
  }

  async getSearchResults(searchValue, pageValue) {
    const res = await this.getResources(searchValue, pageValue);
    return res.results.map(this.transformSearchResults);
  }

  async getTotalResults(searchValue) {
    const res = await this.getResources(searchValue);
    return res.total_results;
  }

  transformSearchResults = (result) => {
    return {
      id: result.id,
      title: result.title,
      overview: result.overview,
      posterPath: result.poster_path,
      releaseDate: result.release_date,
    };
  };
}

export default TmdbService;
