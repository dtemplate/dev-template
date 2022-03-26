const JSON_TEMPLATES_BASE_URL =
  'https://raw.githubusercontent.com/Theryston/dev-template/master/dev-template.json';

const responses = fetch(JSON_TEMPLATES_BASE_URL);

responses
  .then(response => {
    return response.json();
  })
  .then(json => {
    json.forEach(template => {
      const templateContainer = document.createElement('div');
      templateContainer.classList.add('template-container');
      templateContainer.innerHTML = `
      <a href="${template.git_url.replace('.git', '')}" target="_blank">
        <div class="card-template">
          <img
            src="./assets/img/Logo.png"
            alt="computer with code"
            class="card-template__logo"
          />
          <div class="cord-container__body">
            <h1>${template.name}</h1>
            <p>
              ${template.description}
            </p>
            <span> Version: ${template.version}</span>
          </div>
        </div>
      </a>
      `;
      document
        .querySelector('.container__card-template')
        .appendChild(templateContainer);
    });
  })
  .catch(error => {
    console.log(error);
  });
