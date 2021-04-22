import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(process.env.REACT_APP_API_HOST + url, { signal: abortCont.signal })
            .then(res => {
                if (res.status !== 200 && res.status !== 304) {
                    throw Error('could not fetch data')
                }
                return res.json()
            })
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setIsLoading(false);
                    setError(err.message);
                }
            });
        return () => abortCont.abort();
    }, [url]);

    return { data, isLoading, error }
}

export default useFetch;