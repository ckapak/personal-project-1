import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import Form from './Form'

class New extends React.Component {

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

    if (ginId) {
      this.setState({ ginId })
      try {
        const response = await axios.get(`/api/gins/${ginId}`)
        this.setState({ 
          data: response.data 
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }
  
  handleSubmit = async e => {
    e.preventDefault()

    if (this.state.ginId) { 
      console.log('PUTing')
      try {
        const res = await axios.put(`/api/gins/${this.state.ginId}`, this.state.data, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        this.props.history.push(`/gins/${res.data._id}`)
      } catch (err) {
        console.log(err.response)
      }
    } else {
      console.log('POSTing')
      try {
        const res = await axios.post('/api/gins/', this.state.data, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        this.props.history.push(`/gins/${res.data._id}`)
      } catch (err) {
        console.log(err.response)
      }
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

export default New