#!/usr/bin/env node

/**
 * Task Master development script
 * This script provides a command-line interface for managing tasks in the project.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Paths
const projectRoot = path.resolve(__dirname, '..');
const tasksDir = path.join(projectRoot, 'tasks');
const tasksJsonPath = path.join(tasksDir, 'tasks.json');

// Ensure tasks directory exists
if (!fs.existsSync(tasksDir)) {
  fs.mkdirSync(tasksDir, { recursive: true });
  console.log('Created tasks directory');
}

// Create initial tasks.json if it doesn't exist
if (!fs.existsSync(tasksJsonPath)) {
  const initialTasks = {
    "tasks": [
      {
        "id": "1",
        "title": "Set Up Project Architecture",
        "description": "Define and implement the core architecture for the Actions Pane V4 prototype",
        "status": "in-progress",
        "priority": "high",
        "details": "Establish the foundational architecture for the Actions Pane V4 prototype, including component structure, data models, and state management approach.",
        "testStrategy": "Review architecture documentation for completeness and alignment with requirements. Verify that the project structure supports all required components.",
        "subtasks": [
          {
            "id": "1.1",
            "title": "Initialize Project Repository",
            "status": "done",
            "description": "Set up the initial project structure with necessary configuration files",
            "details": "Create the project repository with appropriate folder structure. Set up package.json with required dependencies. Configure build tools and development environment. Initialize version control system."
          },
          {
            "id": "1.2",
            "title": "Define Component Architecture",
            "status": "pending",
            "description": "Design the component architecture based on Fluent Design System",
            "details": "Identify all required UI components based on the PRD. Create a component hierarchy diagram. Define component interfaces and props. Document component reuse strategy and patterns."
          },
          {
            "id": "1.3",
            "title": "Create State Management Plan",
            "status": "pending",
            "description": "Design the state management approach for the application",
            "details": "Identify all state requirements (UI state, user preferences, data). Define state management patterns and libraries to use. Create diagrams for state flow and data flow. Document state update patterns and side effects handling."
          },
          {
            "id": "1.4",
            "title": "Design API and Data Models",
            "status": "pending",
            "description": "Define the data models and API interfaces for the application",
            "details": "Create data models for all entities (actions, connectors, modules, etc.). Define interfaces for data access and manipulation. Document API requirements for backend integration. Create mock data for development."
          },
          {
            "id": "1.5",
            "title": "Document Architecture Decisions",
            "status": "pending",
            "description": "Create comprehensive architecture documentation",
            "details": "Document all architecture decisions and patterns. Create diagrams for component structure, state flow, and data flow. Document technical constraints and considerations. Create a development roadmap based on the architecture."
          }
        ]
      }
    ]
  };
  
  fs.writeFileSync(tasksJsonPath, JSON.stringify(initialTasks, null, 2));
  console.log('Created initial tasks.json file');
}

// Command to set task status
function setTaskStatus(id, status) {
  if (!fs.existsSync(tasksJsonPath)) {
    console.error('tasks.json file not found');
    return;
  }
  
  const tasksData = JSON.parse(fs.readFileSync(tasksJsonPath, 'utf8'));
  let found = false;
  
  // Helper function to update task status
  function updateTaskStatus(tasks) {
    for (const task of tasks) {
      if (task.id === id) {
        task.status = status;
        found = true;
        return true;
      }
      
      if (task.subtasks) {
        const subtaskFound = updateTaskStatus(task.subtasks);
        if (subtaskFound) return true;
      }
    }
    return false;
  }
  
  updateTaskStatus(tasksData.tasks);
  
  if (found) {
    fs.writeFileSync(tasksJsonPath, JSON.stringify(tasksData, null, 2));
    console.log(`Task ${id} status updated to ${status}`);
    
    // Generate individual task files
    generateTaskFiles(tasksData);
  } else {
    console.error(`Task with ID ${id} not found`);
  }
}

// Generate individual task files
function generateTaskFiles(tasksData) {
  if (!fs.existsSync(tasksDir)) {
    fs.mkdirSync(tasksDir, { recursive: true });
  }
  
  function processTask(task, parentTitle = '') {
    const taskTitle = parentTitle ? `${parentTitle} > ${task.title}` : task.title;
    const taskFilePath = path.join(tasksDir, `task_${task.id.padStart(3, '0')}.txt`);
    
    let content = `# Task ID: ${task.id}\n# Title: ${task.title}\n# Status: ${task.status}\n`;
    
    if (task.dependencies) {
      content += `# Dependencies: ${Array.isArray(task.dependencies) ? task.dependencies.join(', ') : task.dependencies}\n`;
    } else {
      content += '# Dependencies: None\n';
    }
    
    if (task.priority) {
      content += `# Priority: ${task.priority}\n`;
    }
    
    if (task.description) {
      content += `# Description: ${task.description}\n`;
    }
    
    if (task.details) {
      content += `# Details:\n${task.details}\n\n`;
    }
    
    if (task.testStrategy) {
      content += `# Test Strategy:\n${task.testStrategy}\n\n`;
    }
    
    if (task.subtasks && task.subtasks.length > 0) {
      content += '# Subtasks:\n';
      
      for (const subtask of task.subtasks) {
        content += `## ${subtask.id}. ${subtask.title} [${subtask.status}]\n`;
        content += `### Dependencies: ${subtask.dependencies || 'None'}\n`;
        content += `### Description: ${subtask.description || 'No description provided'}\n`;
        content += `### Details:\n${subtask.details || 'No details provided'}\n\n`;
      }
    }
    
    fs.writeFileSync(taskFilePath, content);
    console.log(`Generated task file: ${taskFilePath}`);
    
    // Process subtasks recursively
    if (task.subtasks) {
      for (const subtask of task.subtasks) {
        processTask(subtask, taskTitle);
      }
    }
  }
  
  for (const task of tasksData.tasks) {
    processTask(task);
  }
}

// Process command line arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'set-status':
    const idIndex = args.findIndex(arg => arg.startsWith('--id='));
    const statusIndex = args.findIndex(arg => arg.startsWith('--status='));
    
    if (idIndex === -1 || statusIndex === -1) {
      console.error('Usage: node scripts/dev.js set-status --id=<task-id> --status=<status>');
      process.exit(1);
    }
    
    const id = args[idIndex].split('=')[1];
    const status = args[statusIndex].split('=')[1];
    
    setTaskStatus(id, status);
    break;
    
  case 'generate':
    if (fs.existsSync(tasksJsonPath)) {
      const tasksData = JSON.parse(fs.readFileSync(tasksJsonPath, 'utf8'));
      generateTaskFiles(tasksData);
    } else {
      console.error('tasks.json file not found');
    }
    break;
    
  default:
    console.log('Available commands:');
    console.log('  set-status --id=<task-id> --status=<status>  Set the status of a task');
    console.log('  generate                                     Generate individual task files from tasks.json');
    break;
}
