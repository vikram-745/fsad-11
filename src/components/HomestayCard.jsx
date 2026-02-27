import { Link } from 'react-router-dom';

function HomestayCard({ homestay }) {
  return (
    <article className="card">
      <img className="card-image" src={homestay.image} alt={homestay.name} />
      <div className="card-body">
        <h3>{homestay.name}</h3>
        <p>{homestay.location}</p>
        <p>{homestay.description}</p>
        <div className="card-footer">
          <strong>${homestay.price}/night</strong>
          <Link className="btn btn-solid" to={`/homestays/${homestay.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default HomestayCard;