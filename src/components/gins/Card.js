import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ _id, name, image, origin }) => (
  
  <div key={_id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">

    <Link to={`/gin/${_id}`}>
      <div className="card">
        <div className="card-header">
          <h4 className="card-header-title">{name}</h4>
        </div>
        <div className="card-image">
          <figure className="image">
            <img src={image} alt={name} />
          </figure>
        </div>
        <div className="card-content">
          <h5 className="title is-6">{origin}</h5>
        </div>
      </div>
    </Link>
    
  </div>
)

export default Card