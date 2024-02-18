# Young Schema Questionnaire
<p>Implementation of Jeffrey Young's schema questionnaire. Comfortable completion of the questionnaire, saving and sending results by email, the ability to view the results and a detailed description of each scheme.</p>

# [LIVE DEMO](https://young-schema-questionnaire.pp.ua/)
(the server is hosted on free hosting render.com, there may be delays in data loading)

# [SERVER REPO](https://github.com/vlkzmn/shema_api)

# Technologies used

<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>Sass</li>
  <li>React</li>
  <li>TypeScript</li>
  <li>Node.js</li>
  <li>Express</li>
  <li>Sequelize</li>
  <li>PostgreSQL</li>
</ul>

# Features Overview

<ul>
  <li>Layout is adaptive and responsive. It works correctly on all screen sizes (mobile, tablet and desktop).</li>
  <li>Custom domain was connected to GitHub pages.</li>
  <li>PWA implemented on the page.</li>
  <li>Multilingual functionality has been implemented, with a choice between Ukrainian, English and Russian.</li>
  <li>Ability to choose between light and dark application themes.</li>
  <li>Saving the testing process for each question, if the device turns off, you can return to where you left off.</li>
  <li>During the test, you can return to previous questions.</li>
  <li>Demonstration of progress in completing the questionnaire.</li>
  <li>Test results are saved to a database.</li>
  <li>Optionally, it is possible to send the results to the email specified by the user, a PDF file is generated on the server for sending.</li>
  <li>Viewing all test results is available with a password, the access/refresh token solution is implemented.</li>
  <li>In the results viewing mode, in the table, items with values higher than critical are highlighted in red.</li>
  <li>In the results viewing mode, in the table, when you click on one of the schemes, its detailed description opens.</li>  
</ul>

# Preview

<p align="center">
  <img src="https://github.com/vlkzmn/shema/raw/master/public/preview.gif" alt="Young Schema Questionnaire">
</p>
