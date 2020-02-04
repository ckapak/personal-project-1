import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import Form from './Form'

class Edit extends React.Component {
  
  state = {
    data: {
      name: '',
      origin: '',
      image: '',
      description: ''
    }
  }

  async componentDidMount() {
    const ginId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/gins/${ginId}`)
      this.setState({ data: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const ginId = this.props.match.params.id
    try {
      const { data } = await axios.put(`/api/gins/${ginId}`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/gins/${data._id}`)
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <Form
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </section>
    )
  }
}

export default Edit