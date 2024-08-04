# Pantry Tracker App

This project is a Pantry Tracker application developed using Next.js and JavaScript. It is designed to help users keep track of their pantry inventory and find recipes based on available ingredients. The app is deployed on Vercel.

## Table of Contents
- [Features](#features)
- [Future Enhancements](#future-enhancements)
- [What I learned](#what-i-learned)
- [Installation](#installation)
- [Usage](#usage)

## Features
- **Low Stock Alert**: Items with less than five in stock are highlighted.
- **Inventory Management**: Add, remove, and sort items in your pantry.
- **Search Functionality**: Quickly search for items in your inventory.
- **Recipe Finder**: Generate recipes based on available ingredients using Meta's AI model through OpenRouterAI.
- **About Page**: A simple page providing an overview of the application.

## Future Enhancements
- **Improved Recipe Formatting**: Enhance the display and formatting of the recipe results.
- **Expanded API Requests**: Increase the number of API requests for more robust recipe suggestions.
- **Error Handling**: Implement better error handling for API requests and user interactions.
- **User Authentication**: Add user authentication to save personal inventories and preferences.
- **Mobile Responsiveness**: Improve mobile responsiveness for a better user experience on different devices.

## What I learned
- **FireBase Integration**: Integrating a Firebase database holding the inventory. 
- **API Integration**: Integrating external APIs and handling limited requests.
- **Material-UI**: Utilizing Material-UI components for improved UI/UX.
- **State Management**: Managing state effectively across different components.
- **Deployment**: Deploying a Next.js application on Vercel.

## Installation
To clone and run this project, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/your-username/pantry-tracker.git

# Go into the repository
$ cd pantry-tracker

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## Usage
- Low Stock Items: View items with less than five in stock on the home page.
- Inventory Management: Navigate to the Inventory tab to add, remove, and sort pantry items.
- Search Items: Use the search bar to find specific items in your inventory.
- Find Recipes: Generate recipes based on your pantry inventory by navigating to the Recipes tab.
- About Page: Learn more about the app on the About page.