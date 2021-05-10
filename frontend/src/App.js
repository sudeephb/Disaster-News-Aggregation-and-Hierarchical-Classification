// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import NewsContextProvider from './contexts/NewsContext';
import NewsList from './components/NewsList';
import NewsSelector from './components/NewsSelector';
import NavBar from './components/NavBar';
import TabBarLabel1 from './components/TabBarLabel1';
import TabBarsContainer from './components/TabBarsContainer';
import ContentArea from './components/ContentArea';

function App() {
  return (
    <div className="App">
      <NavBar />
          <NewsContextProvider>
            <TabBarsContainer />

            <div className="body-content">
              <NewsSelector />
              <ContentArea />
          <div className="null-component border border-gray-400" />
            </div>

          </NewsContextProvider>
        </div>

  );
}

export default App;