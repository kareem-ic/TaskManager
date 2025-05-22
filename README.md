Task Manager App

A simple task management application built with React Native, designed to help users organize their tasks with ease. Users can add tasks with brief descriptions, mark them as complete, delete tasks once they're no longer needed, and filter between All / Active / Done views.

Features:
Add Task: Users can add a new task with a title and brief description.
Mark Task as Complete: Tap on a task to mark it as complete. Completed tasks will appear visually distinct from incomplete ones.
Delete Task: Easily remove a task from the list by pressing the "Delete" button.
Filter Tabs – One-tap switch between All, Active (incomplete), and Done (completed) tasks.
Modern UI – Dark background, accent color, floating action button, and responsive layout.





App Structure

The app consists of two main components:

App.js: The main entry point, where tasks are added, marked as complete, and deleted.
Task.js: A component that represents individual tasks, with options to visually display completion status.
How to Use the App

Adding a Task:
Enter the task title and description in the input fields at the bottom of the screen.
Press the "+" button to add the task to the list.
Marking a Task as Complete:
Tap on any task to mark it as complete. The task will be visually distinguished (you can change the appearance of completed tasks by editing the styles).
Deleting a Task:
Press the "Delete" button next to a task to remove it from the list.
Filtering Tasks
Tap All, Active, or Done at the top of the list to view only tasks in that category.