export interface Movie {
    title: string;
    year: string;
    imdbID: string;
    type: string;
    poster: string;
}

export const fetchMovie = async (title: string): Promise<Movie[]> => {
    const res = await fetch(`/api/list?searchKeyword=${title}`);

    if (res.status === 400) {
        const textResponse = await res.text();
        alert(`입력 오류: ${textResponse}`);
        return [];
    }

    if (res.status === 500) {
        const textResponse = await res.text();
        alert(`서버 오류: ${textResponse}`);
        return [];
    }

    return res.json();
};
