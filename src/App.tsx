import React from 'react';
import { Button } from './components/UI/Button/Button';

function App() {
  return (
    <div className="App">
      <Button
        type="primary"
        onCLick={() => {
          console.log('sdfij');
        }}
      >
        ok
      </Button>
    </div>
  );
}

export default App;
