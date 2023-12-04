export interface Movie {
    title: string;
    year: string;
    imdbID: string;
    type: string;
    poster: string;
}

export interface MovieDetail {
    title: string;
    year: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    poster: string;
    production: string;
}

export const fetchMovie = async (title: string): Promise<Movie[]> => {
    const res = await fetch(`/api/list?searchKeyword=${title}`);

    if (res.status === 400) {
        const textResponse = await res.text();
        throw new Error(`입력 오류: ${textResponse}`);
    }

    if (res.status === 500) {
        const textResponse = await res.text();
        throw new Error(`서버 오류: ${textResponse}`);
    }

    return res.json();
};

export const fetchMovieDetail = async (id: string): Promise<MovieDetail> => {
    const res = await fetch(`/api/list?i=${id}`);

    if (res.status === 400) {
        const textResponse = await res.text();
        throw new Error(`입력 오류: ${textResponse}`);
    }

    if (res.status === 500) {
        const textResponse = await res.text();
        throw new Error(`서버 오류: ${textResponse}`);
    }

    return res.json();
};
