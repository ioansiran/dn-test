This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## DN Test project

##### This project was build with React, SCSS and Redux </br>

Some other dependencies include:
* react-router-dom
* react-redux
* node-sass

I've kept the app simple without overmodularizing everything: <br/>
* One main reducer for all actions since it's acting on the same data source
* Components contain all the primitive elements that serve the same purpose
* One main theme `SCSS` file to keep important variables

##### Extra features besides specifications: 
* Reducer is written in a way that can easily support pagination with minor modifications
* When a user searches for a string and selects all, only the search results are selected
* Buttons don't shift positions when all rows are removed
* Theme colors and global variables can be changed from `theme.scss`
* In the requirement sheet, the on click events on every row were overlapping (selection and edit action) so I've added an edit button for simplicity of the user experience
* Editing IDs in the array would cause overlapping in all the rest of the actions, so disabling the ID form field was the best solution so that the data wouldn't be corrupted
* Added "No items found" message when the list is empty
* Made the design a bit cooler, buttons slimmer, shadows etc.

What could be done next:
* Add lazy loading to higher than 100 items per page
* Split the main reducer into Search, selection, edit reducers and combine them in App.js
* Add error boundary to the 2 Routes
* A search action can easily be added by cloning the filter action and removing the list limits

In the project directory, you can run:

### `npm install` =>  `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.