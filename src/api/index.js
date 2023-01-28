const getAllCommands = () =>
  fetch('/api')
    .then((res) => res.json())
    .then((data) => data.data);

const sendCommandsFile = (commandsText) => {
  return fetch('/api', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ text: commandsText }),
  });
};

export { getAllCommands, sendCommandsFile };
