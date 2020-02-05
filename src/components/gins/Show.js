import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class Show extends React.Component {

  state = {
    gin: {},
    text: ''
  }

  async componentDidMount() {
    const ginId = this.props.match.params.id
    try {
      const response = await axios.get(`/api/gins/${ginId}`)
      this.setState({
        gin: response.data
      })
      console.log(response.data)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const ginId = this.props.match.params.id
    axios.post(`/api/gins/${ginId}/comments`, { text: this.state.text }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        this.setState({ gin: res.data, text: '' })
      })
      .catch(err => console.log(err))
  }

  handleDelete = async () => {
    const ginId = this.props.match.params.id
    try {
      await axios.delete(`/api/gins/${ginId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/gins')
    } catch (err) {
      console.log(err.response)
    }
  }

  isOwner = () => {
    console.log(this.state.gin.user)
    return Auth.getPayload().sub === this.state.gin.user._id
  }

  render() {
    if (!this.state.gin._id)
      return null

    const { gin } = this.state
    console.log(this.state.gin)
    console.log(this.state.text, 'text')
    return (
      <section className="section show">
        <div className="container">
          <h2 className="title">{gin.name}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img src={gin.image} alt={gin.name} />
              </figure>
            </div>
            <div className="column is-half">
              <h4 className="title is-4">Origin</h4>
              <hr />
              <p>{gin.origin}</p>
              <hr />
              <h4 className="title is-4">What we enjoy most about {gin.name}</h4>
              <p>{gin.description}</p>
              <hr />
              <form className="form title is-4" onSubmit={this.handleSubmit}>
                Tell us what you think!
                <hr />
                <textarea name="text" onChange={this.handleChange}
                  value={this.state.text}
                  placeholder="Type your comment here...maximum character length is 50"></textarea>
                <br />
                <input type="submit" value="Submit" />
              </form>
              <div className="comment-text">{gin.comments.map(comment =>
                <div key={comment._id}>
                  {comment.text}
                </div>)}</div>
              <hr />
              {this.isOwner() &&
                <>
                  <Link to={`/gins/${gin._id}/edit`} className="button is-warning">Edit My Gin</Link>
                  <button onClick={this.handleDelete} className="button is-danger">Delete My Gin</button>
                </>
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Show