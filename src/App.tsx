import React from 'react';
import FirstStage from './components/Learning/Stages/FirstStage/FirstStage';
import SecondStage from './components/Learning/Stages/SecondStage/SecondStage';

function App() {
  return (
    <div className="App">
      <SecondStage
        wordLearning="informative"
        wordNative="aufschlussreich"
        onComplete={() => console.log}
      />
    </div>
  );
}

export default App;
