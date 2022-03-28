# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![dark-theme-desktop](screenshots\dark-theme-desktop-screen.png)
![dark-theme-mobile](screenshots\dark-theme-mobile-screen.png)
![light-theme-desktop-modal](screenshots\light-theme-desktop-modal-screen.png)
![light-theme-desktop](screenshots\light-theme-desktop-screen.png)
![dark-theme-desktop-modal](screenshots\dark-theme-desktop-modal-screen.png)
![light-theme-desktop-modal](screenshots\light-theme-mobile-screen.png)

### Links

- Solution URL: [Github repo](https://github.com/CallMe-AL/frontendmentor-todoapp)
- Live Site URL: [Github page](https://callme-al.github.io/frontendmentor-todoapp/)

## My process

### Built with

- Semantic HTML5 markup
- SASS with light/dark theme
- Flexbox
- Mobile-first workflow

### What I learned

Nice refresher on using SCSS and a cool chance to use the Drag and Drop API for the first time in a project! Learned all about the API as well as updates to SCSS, such as the use of imports for files (tripped me up when using the config variables). Used the JavaScript "reduce" function for the first time, as well, to help find the closest element to the element currently being dragged (so as to swap their positions in the DOM).

Additionally, I used localstorage to save a user's tasks. It was a nice refresher that localstorage saves data as strings, so objects, including arrays, have to be stringified first before storing. I should always remember the following:

```js
localStorage.setItem("myTasks", JSON.stringify(todoArray));
```

### Continued development

I want to keep finding ways to make my code more concise. I feel there is probably a better way I could have taken advantage of SCSS variables to make switching themes more efficient. I also feel my JavaScript file, at 411 lines, is likely too large for what's needed for this project. If so, I should find ways to make reusable functions throughout my app to make my code more DRY, or discover how to perform more simple operations solely using css and html.

I'm also always looking for ways to improve my code's accessibility or SEO, even though this project (thankfully!) received great Lighthouse scores on Chrome!

### Useful resources

- [Mozilla's main guide to the Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#examples_and_demos) - There's tons of related guides on the page, too.
- [Web Dev Simplified's Drag & Drop Tutorial](https://www.youtube.com/watch?v=jfYWwQrtzzY) - A nice concise video on sorting with the API. Traversy Media also has a nice video [here](https://www.youtube.com/watch?v=wv7pvH1O5Ho).
- [About SCSS's @use rule](https://sass-lang.com/documentation/at-rules/use) - Useful info about the @use rule on the official SASS docs, among others.

## Author

- Website - [My portfolio!](https://callme-al.github.io/portfolio/)
- Frontend Mentor - [@CallMe-AL](https://www.frontendmentor.io/profile/CallMe-AL)
