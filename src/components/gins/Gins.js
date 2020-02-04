import React from 'react'
import axios from 'axios'
import Card from './Card'

class Gins extends React.Component {
  
  state = { 
    gins: [] 
  }

  async componentDidMount()  {
    console.log('ComponentDidMount in Index has run')
    try {
      const response = await axios.get('/api/gins')
      this.setState({ gins: response.data })
      console.log(response)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.gins.map(gin =>( 
              <Card id={gin._id} key={gin._id} {...gin}/>
            ))}
          </div>
        </div>
      </section>
    )
  }
}

export default Gins