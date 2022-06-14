import React from 'react';
import FirstStage from './components/Learning/FirstStage/FirstStage';

function App() {
  return (
    <div className="App">
      <FirstStage
        wordLearning="informative"
        wordNative="aufschlussreich"
        onComplete={() => console.log}
      />
    </div>
  );
}

export default App;
