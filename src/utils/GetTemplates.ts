import axios from 'axios';

const JSON_TEMPLATES_BASE_URL =
  'https://raw.githubusercontent.com/Theryston/dev-template/master/dev-template.json';

export const GetTemplates = async () => {
  const { data: templates } = await axios.get(JSON_TEMPLATES_BASE_URL);
  return { templates };
};
