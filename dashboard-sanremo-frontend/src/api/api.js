export default class Api {
    /**
     * Api constructor, initializes backend url.
     * @constructor
     */
    constructor() {
      this.api_url_base = new URL('http://localhost:5000'); // flask backend endpoint
    }

    get = async (path, params = null) => {
      const url = new URL(path, this.api_url_base)
      
      if(params === null)
        params = {method: 'GET'}

      url.search = new URLSearchParams(params)

      const res = await fetch(url);
      return await res.json();
    }
}