# Actions Pane V4 Redesign

This project is a prototype for the redesigned Actions Pane in Power Automate Desktop, including its interaction with a Library Modal for managing built-in actions, connectors, custom actions, UI collections, and templates.
Preview: https://cimaja.github.io/actions-pane-V4/

## Project Overview

The redesign focuses on:
- Improved clarity and organization of actions
- Scalable architecture for growing action library
- User-friendly interaction using Fluent Design System components

## Features

- **Resizable Actions Pane** (default: ~360px, min: ~320px, max: ~500px)
- **Top Section** with search input and filter tabs/pills
- **Grouped Headers** for organized content display
- **Sub-Groups Support** for better organization
- **Favorites Tab** for quick access to frequently used actions
- **Library Modal** for comprehensive management of actions, connectors, and templates

## Project Structure

```
actions-pane-v4/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # React components
│   │   └── ActionsPane/ # Actions Pane components
│   ├── contexts/        # React contexts for state management
│   ├── hooks/           # Custom React hooks
│   ├── models/          # TypeScript interfaces and types
│   ├── styles/          # CSS and style files
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── index.tsx        # Entry point
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/actions-pane-v4.git
   cd actions-pane-v4
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run lint` - Lints the codebase
- `npm run format` - Formats the codebase using Prettier

## Design System

This project uses the Fluent Design System through the `@fluentui/react-components` package, ensuring a consistent look and feel with other Microsoft products.

## Task Management

This project uses TaskMaster for task management. The tasks are organized in the `tasks/` directory with a main `tasks.json` file defining the project roadmap.

To view tasks:
```
mcp0_get_tasks
```

To mark a task as in-progress:
```
mcp0_set_task_status --id=<task_id> --status=in-progress
```

To mark a task as complete:
```
mcp0_set_task_status --id=<task_id> --status=done
```
