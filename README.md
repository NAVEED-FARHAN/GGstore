# GG Store (Game Galaxy Store)

## Introduction

This is a game store website project that I built to improve my skills with React and web development. I wanted to make something that looks really good and feels modern, so I spent a lot of time working on the design and animations.

The main idea was to create a place where you can browse different games, filter them by genre, and search for specific titles. It's not a real store where you buy things yet, but the front-end part works pretty well and looks cool.

## Key Features

I added a bunch of features to make the site feel alive:

- **Tech Stack**: I used React with Vite because it's much faster than Create React App, and I used TypeScript to help catch bugs early.
- **UI Design**: The interface is built using Chakra UI and some custom Tailwind CSS. I tried to make it look clean and professional.
- **Animations**: This is the part I'm most proud of. I used a few different libraries to get the effects I wanted:
  - Framer Motion for general layout animations.
  - GSAP for some of the more complex stuff.
  - I added a cool tilt and glare effect to the game cards so they react when you hover over them.
  - There's also a shuffle text effect that I think looks pretty neat.
- **Background**: I managed to get an interactive background working using tsParticles and Three.js. It gives the site a nice depth.
- **Search and Filter**: You can type in the search bar to find games instantly, or use the sidebar to pick a genre like Action or RPG.
- **Responsive**: It works on mobile phones too, not just desktop computers.

## Screenshots

Here is what it looks like:

![Game Grid](./screenshots/preview-1.jpg)

![Games List](./screenshots/preview-2.png)

## Tech Stack used

Here is a list of all the main libraries and tools I used in this project:

### Core
- React (The main library for the UI)
- TypeScript (For adding types to JavaScript)
- Vite (For running the dev server and building the app)

### Styling & Components
- Chakra UI (Used for the basic layout components)
- Tailwind CSS (Used for styling specific elements)
- Emotion (Used for CSS-in-JS)

### Animations & Graphics
- Framer Motion (Great for React animations)
- GSAP (Used for timeline animations)
- Three.js (For 3D elements)
- tsParticles (For the background particles)

## Project Structure

I tried to keep the files organized. Here is how the folders are set up:

```bash
GGstore/
├── public/              # Where static files go
├── src/
│   ├── assets/          # Images and icons
│   ├── components/      # This is where all my React components are
│   │   ├── game/        # Components just for the games (like the Grid and Cards)
│   │   ├── layout/      # Main layout stuff (Navbar, Sidebar, Background)
│   │   └── ui/          # Smaller UI bits (like the Hover effects)
│   ├── data/            # I put some fake data here to test with
│   ├── lib/             # Helper functions
│   ├── types/           # TypeScript definitions
│   ├── App.tsx          # The main app component
│   └── main.tsx         # The entry file
├── .eslintrc.cjs        # Linter config
├── tailwind.config.js   # Tailwind config
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite config
```

## Getting Started

If you want to run this on your own computer, here is how you do it.

### Prerequisites
You need to have Node.js installed. Version 16 or higher should work fine.

### Installation Steps

1.  **Clone the repo**
    First, download the code:
    ```bash
    git clone https://github.com/yourusername/gg-store.git
    cd gg-store
    ```

2.  **Install the packages**
    Run this command to download all the dependencies:
    ```bash
    npm install
    ```

3.  **Run the server**
    Start the local development server:
    ```bash
    npm run dev
    ```

4.  **Open it up**
    Go to `http://localhost:5173` in your browser and you should see it running.

## Scripts

These are the commands you can run:

- `npm run dev`: Starts the app in development mode.
- `npm run build`: Builds the app so it's ready for production.
- `npm run lint`: Checks the code for any errors or style issues.
- `npm run preview`: Lets you see what the built version looks like.

## Contributing

If you find any bugs or have ideas on how to make it better, feel free to fork the project and make a pull request. I'm still learning, so any feedback is appreciated!

## License

I'm using the MIT License for this.
