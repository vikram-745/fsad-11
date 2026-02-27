import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, getAttractionsByHomestay } from '../services/api';

function HomestayDetails() {
  const { id } = useParams();
  const [homestay, setHomestay] = useState(null);

  useEffect(() => {
    const loadHomestay = async () => {
      const data = await api.getHomestayById(id);
      setHomestay(data || null);
    };
    loadHomestay();
  }, [id]);

  if (!homestay) {
    return <p>Homestay not found.</p>;
  }

  const attractions = getAttractionsByHomestay(homestay.id);

  return (
    <section className="details-wrap">
      <img className="details-image" src={homestay.image} alt={homestay.name} />
      <div className="details-content">
        <h2>{homestay.name}</h2>
        <p>{homestay.location}</p>
        <p>{homestay.description}</p>
        <p>
          <strong>Price:</strong> ${homestay.price}/night
        </p>
        <button className="btn btn-solid">Book Now</button>

        <h3>Nearby Tourism Places</h3>
        <ul>
          {attractions.map((place) => (
            <li key={place.name}>
              <strong>{place.name}</strong> - {place.distance} - {place.tip}
            </li>
          ))}
        </ul>

        <Link to="/search" className="btn btn-outline">
          Back to Search
        </Link>
      </div>
    </section>
  );
}

export default HomestayDetails;
