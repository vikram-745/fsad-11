import { useEffect, useMemo, useState } from 'react';
import HomestayCard from '../components/HomestayCard';
import { api } from '../services/api';

function Search() {
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(200);
  const [homestays, setHomestays] = useState([]);

  useEffect(() => {
    const loadHomestays = async () => {
      const data = await api.getHomestays();
      setHomestays(data);
    };
    loadHomestays();
    window.addEventListener('classicStaysHomestaysUpdated', loadHomestays);
    return () => window.removeEventListener('classicStaysHomestaysUpdated', loadHomestays);
  }, []);

  const results = useMemo(() => {
    return homestays.filter(
      (h) =>
        (h.location.toLowerCase().includes(query.toLowerCase()) || h.name.toLowerCase().includes(query.toLowerCase())) &&
        h.price <= Number(maxPrice)
    );
  }, [query, maxPrice]);

  return (
    <section>
      <div className="section-head">
        <h2>Search Homestays</h2>
      </div>

      <div className="filters">
        <input
          placeholder="Search by place or homestay name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label>
          Max Budget: ${maxPrice}
          <input type="range" min="40" max="300" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </label>
      </div>

      <div className="grid">
        {results.length ? (
          results.map((stay) => <HomestayCard key={stay.id} homestay={stay} />)
        ) : (
          <p>No homestays found for current filters.</p>
        )}
      </div>
    </section>
  );
}

export default Search;
