import React from 'react'

const Form = ({  data, handleChange, handleSubmit }) => {
  
  return (
    <div className="columns">
      <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input 
              className="input"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Origin</label>
          <div className="control">
            <input 
              className="input"
              placeholder="Origin"
              name="origin"
              onChange={handleChange}
              value={data.origin}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input 
              className="input"
              placeholder="Image URL"
              name="image"
              onChange={handleChange}
              value={data.image}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea 
              className="textarea"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={data.description}
            />
          </div>
        </div>
        <div className="field">
          <button type="submit" className="button is-fullwidth is-warning">Make my gin!</button>
        </div>
      </form>
    </div>
  )
}

export default Form
