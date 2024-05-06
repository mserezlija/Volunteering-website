# Volunteering website

This is a project I did as a final for my course at Digitalna Dalmacija.

## Overview

This website provides functionalities for managing activities, volunteers, and volunteering organizations. Users can interact with the platform either as regular users or administrators.

## Features

### Activities

- View all activities and filter them based on various criteria.
- Click on an activity to view detailed information in a pop-up.
- **User**: Sign up for any activity.
- **Admin**: Delete activities.

### Volunteers

- Browse all registered volunteers and filter them by city or job type.
- **Admin**: Add, edit, or delete volunteers.

### Organizations

- Explore a list of volunteering organizations.
- **User**: View existing organizations and filter them by name, address, or city. Submit requests to add new organizations.
- **Admin**: Review pending requests, approve or reject them, and manage existing organizations.

## Installation and Setup

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run dev`.

## Dependencies

- [JSON Server]: Used as a mock REST API for backend data. **The project is run on `port 5000`.**
- [Axios]: A promise-based HTTP client for making API requests.
- [React Router]: Used for declarative routing in React applications.
- [Bootstrap]: A popular CSS framework for building responsive and mobile-first websites.

## Usage

1. Navigate to the desired section (Activities, Volunteers, or Organizations) on the website.
2. Explore the available features and interact with the interface based on your role (user or admin).
