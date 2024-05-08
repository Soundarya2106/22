import React, {useState, useEffect} from 'react'
import axios from 'axios'

const FetchNum = () => {
  const [numId, setNumId] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/numbers/${numId}`);
      setResponse(res.data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (numId !== '') {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numId, fetchData]);


  return (
    <>
      <h2>Number Fetcher</h2>
      <label>
        Enter qualified number ID (p for prime, f for Fibonacci, e for even, r for random):
        <input type="text" value={numId} onChange={(e) => setNumId(e.target.value)} />
      </label>
      <button onClick={fetchData}>Fetch Data</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {response && (
        <div>
          <h3>Response:</h3>
          <p>WindowPrevState: {response.windowPrevState.join(', ')}</p>
          <p>WindowCurrState: {response.windowCurrState}</p>
          <p>Numbers: {response.numbers.join(', ')}</p>
          <p>Avg: {response.avg}</p>
        </div>
      )}
    </>
  )
}

export default FetchNum
