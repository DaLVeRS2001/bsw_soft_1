import './App.scss';
import { useEffect, useState, useMemo } from 'react';
import { getAllCommands, sendCommandsFile } from './api';
import {
  getCommandVariables,
  getFilledCommands,
  buildFields,
  buildCommandsFile,
} from './functions';
import { makeObjectFromKeys } from './utils/helpers';

function App() {
  const [commands, setCommands] = useState([]);
  const [form, changeForm] = useState(null);
  const [filledCommands, setFilledCommands] = useState([]);

  const commandVariables = useMemo(
    () => getCommandVariables(commands),
    [commands]
  );

  const fields = useMemo(
    () => buildFields(commandVariables.fields),
    [commandVariables]
  );

  const [commandBlob, commandOnlyText] = useMemo(
    () => [
      buildCommandsFile(filledCommands),
      buildCommandsFile(filledCommands, true),
    ],
    [filledCommands]
  );

  useEffect(() => {
    if (!!commands.length) {
      const parsedFields = makeObjectFromKeys(
        fields.map((field) => field.name)
      );
      changeForm({ ...form, ...parsedFields });
    }
  }, [commands]);

  useEffect(() => {
    getAllCommands().then((data) => setCommands(data.commands));
  }, []);

  const onChangeField = (e) => {
    const [value, name] = [e.currentTarget.value, e.currentTarget.name];
    changeForm({ ...form, [name]: value });
  };

  const onFilledCommands = () => {
    setFilledCommands(
      getFilledCommands(commands, commandVariables.withoutCommandId, form)
    );
  };

  if (!commands.length || !form) return <h1>Loading commands!!!</h1>;

  return (
    <div className="App">
      <header>header</header>
      <main>
        <div>Main</div>
        {!!filledCommands.length && (
          <a href={commandBlob} download="commands.sh">
            Install commands
          </a>
        )}
        <div>
          {fields.map((field) => (
            <div key={field.name}>
              <div>{field.span}</div>
              <input
                onChange={onChangeField}
                value={form[field.name]}
                name={field.name}
                type={field.type}
              />
            </div>
          ))}
        </div>
        <div>
          <button onClick={onFilledCommands}>Build commands</button>
        </div>
        <div>
          <button
            onClick={() => sendCommandsFile(commandOnlyText)}
            disabled={!filledCommands.length}
          >
            Send commands to src/server/data
          </button>
        </div>
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default App;

//const getHandler = (e) => {
//   axios
//     .get('https://sheet.best/api/sheets/8abed0bc-fec0-42f2-8edc-8260b3433f8d')
//     .then((response) => {
//       // console.log(response);
//     });
// };
// useEffect(() => {
//   getHandler();
// }, []);
