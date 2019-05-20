import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    }
  }
 
  setValue(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }
 
  getFullName() {
    let { firstName, lastName } = this.state;
    if (!firstName && !lastName) {
      return 'Please input your name!'
    } else {
      return firstName + ' ' + lastName;
    }
  }
 
  doReset() {
    this.setState({
      firstName: '',
      lastName: ''
    })
  }
 
  render() {
    const st = this.state;
    const fullName = this.getFullName();
    return (
      <div>
        <h1>This is normal react!</h1>
        <p>First name: <input type="text" value={st.firstName} onChange={e => this.setValue('firstName', e)} /></p>
        <p>Last name: <input type="text" value={st.lastName} onChange={e => this.setValue('lastName', e)} /></p>
        <p>Full name: {fullName}</p>
        <p><button onClick={() => { this.doReset() }}>Reset</button></p>
      </div>
    );
  }
}
