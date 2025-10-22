# GEMINI.md

This file provides a comprehensive overview of the project for the Gemini AI agent.

## Project Overview

This is a Next.js web application that serves as a landing page for an AI consulting business. The application is built with React and Tailwind CSS, and it showcases the company's services and products. It also includes a contact form for potential clients. The project uses a dark theme and has a modern and clean design. The application is not just a static landing page, but has some dynamic AI-powered features.

## Building and Running

To build and run this project, you need to have Node.js and npm installed.

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the development server on [http://localhost:3000](http://localhost:3000).

3.  **Build for production:**
    ```bash
    npm run build
    ```

4.  **Start the production server:**
    ```bash
    npm run start
    ```

5.  **Lint the code:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   The project uses Tailwind CSS for styling.
*   The code is written in JavaScript and JSX.
*   The project follows the standard Next.js project structure.
*   The project uses ESLint for linting.

## File Structure

The project has the following file structure:

*   `app/`: Contains the main application code.
    *   `layout.js`: The main layout of the application.
    *   `page.js`: The main page of the application.
    *   `globals.css`: The global CSS file.
    *   `components/`: Contains the React components.
        *   `Navbar.js`: The navigation bar.
        *   `landingPage/`: Contains the components for the landing page.
            *   `productAndServices.js`: The products and services section.
            *   `contactus.js`: The contact form.
*   `api/`: Contains the API files.
    *   `aiAPI.js`: Contains the functions for interacting with the AI API.
*   `public/`: Contains the public assets.
*   `package.json`: The project's dependencies and scripts.
*   `next.config.mjs`: The Next.js configuration file.
*   `tailwind.config.mjs`: The Tailwind CSS configuration file.

## API

The application interacts with a backend AI service. The API is defined in `api/aiAPI.js`. The following functions are available:

*   `getAICarousel(type)`: Gets the AI carousel data.
*   `askQuery(query, llmModel)`: Asks a query to the AI model.
*   `conversationalAI(messagesList, llmModel)`: Interacts with the conversational AI.
*   `generalCryptoAnalysis(llmModel)`: Performs a general crypto analysis.
*   `generalCoinCryptoAnalysis(symbol, timeframe, interval, llmModel)`: Performs a general coin crypto analysis.
*   `askWeb3Agent(query, llmModel)`: Asks a query to the Web3 agent.
*   `generateResponseRAG(ragAgentName, query, llmModel)`: Generates a response from the RAG agent.
