/*
 * INCREMENT_SAMPLE_NUMBER
 */

export interface IncrementSampleNumberAction {
  type: 'INCREMENT_SAMPLE_NUMBER',
}

/*
 * DECREMENT_SAMPLE_NUMBER
 */

export interface DecrementSampleNumberAction {
  type: 'DECREMENT_SAMPLE_NUMBER',
}

/*
 * SET_SAMPLE_NUMBER
 */

export interface SetSampleNumberAction {
  type: 'SET_SAMPLE_NUMBER',
  payload: {
    value: number,
  },
}

/*
 * FETCH_SAMPLE_COUNTRIES
 */

export interface FetchSampleCountriesAction {
  type: 'FETCH_SAMPLE_COUNTRIES',
}

/*
 * FETCH_SAMPLE_COUNTRIES_SUCCESS
 */

export interface FetchSampleCountriesSuccessAction {
  type: 'FETCH_SAMPLE_COUNTRIES_SUCCESS',
  payload: {
    countries: any[],
  }
}

/*
 * FETCH_SAMPLE_COUNTRIES_ERROR
 */

export interface FetchSampleCountriesErrorAction {
  type: 'FETCH_SAMPLE_COUNTRIES_ERROR',
  payload: {
    error: any,
  }
}

/*
 * FETCH_SAMPLE_COUNTRY
 */

export interface FetchSampleCountryAction {
  type: 'FETCH_SAMPLE_COUNTRY',
  payload: {
    code: string,
  },
}

/*
 * FETCH_SAMPLE_COUNTRY_SUCCESS
 */

export interface FetchSampleCountrySuccessAction {
  type: 'FETCH_SAMPLE_COUNTRY_SUCCESS',
  payload: {
    country: any,
  }
}

/*
 * FETCH_SAMPLE_COUNTRY_ERROR
 */

export interface FetchSampleCountryErrorAction {
  type: 'FETCH_SAMPLE_COUNTRY_ERROR',
  payload: {
    error: any,
  }
}
