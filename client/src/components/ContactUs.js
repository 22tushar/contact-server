import React, { Component } from 'react';
import './ContactUs.css'; // Import your CSS file

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, message } = this.state;

    // Send message to backend
    fetch('http://localhost:8000/saveMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    })
    .then(response => {
      if (response.ok) {
        alert('Message sent successfully!');
        this.setState({ name: '', email: '', message: '' }); // Clear form fields after successful submission
      } else {
        throw new Error('Failed to send message.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while sending the message. Please try again later.');
    });
  }

  render() {
    return (
      <section id="contact">
        <div className="row section-head">
          <div className="ten columns">
            <p className="lead">
              Feel free to contact me for any work or suggestions below
            </p>
          </div>
        </div>
        <div className="row">
          <aside className="eigth columns footer-widgets">
            <div className="widget">
              <h4>Linkedin : {this.props.resumeData.linkedinId}</h4>
              <form onSubmit={this.handleSubmit} className="contact-form">
                <div className="row">
                  <div className="six columns">
                    <label className="form-label">
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        className="form-input"
                      />
                    </label>
                  </div>
                  <div className="six columns">
                    <label className="form-label">
                      Email:
                      <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        className="form-input"
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="twelve columns">
                    <label className="form-label">
                      Message:
                      <textarea
                        name="message"
                        value={this.state.message}
                        onChange={this.handleInputChange}
                        className="form-textarea"
                        style={{ height: '150px', width: '100%' }} // Adjust height and width
                      />
                    </label>
                  </div>
                </div>
                <button type="submit" className="form-submit">Send Message</button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    );
  }
}
