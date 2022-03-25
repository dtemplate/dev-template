import axios from 'axios';

const JSON_TEMPLATES_BASE_URL =
  'https://gist.githubusercontent.com/Theryston/879cb0c003d7450763326ab7496506ed/raw/0319fbb4f988228d49dfc071191b2819bcf0cf76/dev-template.json';

export const RequestTemplates = async () => {
  const { data: templates } = await axios.get(JSON_TEMPLATES_BASE_URL);
  return { templates };
};
