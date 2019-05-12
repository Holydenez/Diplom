import React from 'react';
//assets
import books from './assets/images/books.jpg';
import code from './assets/images/code.jpg';
import './App.css';
//components
import NavigationBar from "./components/NavigationBar"
import TheoryBlock from "./components/TheoryBlock"
import PracticeBlock from "./components/PracticeBlock"
import NavigationBlock from "./components/NavigationBlock"

export default class App extends React.Component {
  state = {
    navigationRoute: "home"
  }
  navigateTo = (navigationaPath) => {
    this.setState({ navigationRoute: navigationaPath ? navigationaPath : "home" })
  }
  render() {
    return (
      <div className="App">
        <NavigationBar navigateTo={this.navigateTo} />
        {
          this.state.navigationRoute === "home" ?
            <div>
              <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <p>
                  Kursova Vetrov Denis
                </p>
              </header>
              <div className="App-navigation">
                <NavigationBlock navigateTo={this.navigateTo} image={books} navigateRoute="theory" title="Theory"/>
                <NavigationBlock  navigateTo={this.navigateTo} image={code} navigateRoute="practice" title="Practice"/>
              </div>
            </div>
            :
            this.state.navigationRoute === "theory" ?
              <TheoryBlock /> :
              this.state.navigationRoute === "practice" ?
                <PracticeBlock image={code}/> :
                null
        }
      </div>
    );
  }
}

