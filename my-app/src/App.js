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
                <h6>
                  ДНІПРОВСЬКИЙ НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ
                   ІМЕНІ ОЛЕСЯ ГОНЧАРА
                   ФАКУЛЬТЕТ ПРИКЛАДНОЇ МАТЕМАТИКИ
                   КАФЕДРА ОБЧИСЛЮВАЛЬНОЇ МАТЕМАТИКИ ТА
                   МАТЕМАТИЧНОЇ КІБЕРНЕТИКИ
                </h6>
                <h1>
                  ДИМПЛОМНА РОБОТА
                </h1>
                <h3>
                  з дисциплін професійної підготовки
                </h3>
                <h2>
                  на тему «МОДЕЛЮВАННЯ НЕЛІНІЙНОЇ СИСТЕМИ З УРАХУВАННЯМ ДИСИПАЦІЇ»
                </h2>
                <div>
                  <p>Виконав:</p>
                  <p>Студент групи ПА–16–1</p>
                  <p>спеціальності 113 – Прикладна математика</p>
                  <p>Вєтров Денис Максимович</p>

                  <p>Керівник: доцент кафедри ОМ та МК</p>
                  <p>Тонкошкур І.С.</p>
                </div>
              </header>
              <div className="App-navigation">
                <NavigationBlock navigateTo={this.navigateTo} image={books} navigateRoute="theory" title="ТЕОРЕТИЧНА ДОВІДКА" />
                <NavigationBlock navigateTo={this.navigateTo} image={code} navigateRoute="practice" title="ПРАКТИЧНА ЧАСТИНА" />
              </div>
            </div>
            :
            this.state.navigationRoute === "theory" ?
              <TheoryBlock /> :
              this.state.navigationRoute === "practice" ?
                <PracticeBlock image={code} /> :
                null
        }
      </div>
    );
  }
}

