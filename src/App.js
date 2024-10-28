import './App.css';

const App = () => {
  const name = 'Username';
  const isNameShowing = true;
  return (
    <div className="App">
      <h1>Hello, Buenos Dias {isNameShowing ? name : 'someone'}!</h1>
    </div>
  );
}

export default App;
