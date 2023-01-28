import {
  makeObjectFromKeys,
  makeRegExp,
  capitalizeFirstLetter,
} from './utils/helpers';
import { varMark } from './utils/index';

const getCommandVariables = (commands) => {
  const regExps = [
    // RegExp(makeRegExp('\\varMark', 'varMark', varMark), 'g'),
    RegExp(makeRegExp('\\varMark\\w+', `varMark`, varMark), 'g'),
  ];
  const variables = commands
    .map((el) => {
      const variable = el.command
        .match(regExps[0])
        ?.map((el) => el.replace(varMark, '').toLowerCase());
      if (!variable) return;
      return { id: el.id, variable };
    })
    .filter((el) => el);
  const withoutCommandId = variables.map((el) => el.variable).flat();
  const fields = makeObjectFromKeys(withoutCommandId);
  const fieldsWithId = { ...withoutCommandId };
  return { withCommandId: variables, withoutCommandId, fields, fieldsWithId };
};

const getFilledCommands = (newCommands, variables, form) => {
  const filledCommands = [...newCommands].map((el) => ({
    ...el,
    command: el.command
      .split(' ')
      .map((el) => {
        const element = el.toLowerCase().trim().replace(varMark, '');
        const isVariable = variables.indexOf(element) >= 0;
        if (isVariable) return form[element];
        return element;
      })
      .join(' '),
  }));
  return filledCommands;
};

const buildFields = (variables) => {
  return [
    ...Object.keys(variables).map((el) => ({
      span: capitalizeFirstLetter(el.replace('_', ' ')),
      name: el,
      type: 'text',
    })),
    { span: 'test', name: 'test', type: 'text' },
  ];
};

const buildCommandsFile = (filledCommands, isLikeText = false) => {
  const blob = new Blob(
    [Object.values(filledCommands.map((el) => el.command)).join('\n')],
    {
      type: 'text/plain',
    }
  );
  if (isLikeText) return filledCommands.map((el) => el.command).join('\n');
  return URL.createObjectURL(blob);
};

export {
  getCommandVariables,
  getFilledCommands,
  buildFields,
  buildCommandsFile,
};
