### `README.md`

# TaskSync

TaskSync is a real-time task management application designed to streamline collaboration between admins and users. Admins can create rooms, create tasks, and monitor user responses instantly, while users can join with a unique room ID to update task statuses as "Done" or "Issue." TaskSync ensures seamless and efficient task tracking for teams.

---

## Features

- **Real-Time Task Management**: Tasks and responses are updated instantly across all connected users.
- **Room-Based Collaboration**: Admins create unique 6-digit room IDs for task groups, and users join to collaborate.
- **Status Updates**: Users can update tasks with statuses like "Done" or "Issue," visible to the admin in real time.
- **Admin Dashboard**: Monitor task statuses and user responses dynamically.
- **Easy-to-Use Interface**: Minimalistic and intuitive UI for both admins and users.

---

## Tech Stack

- **Frontend**: React.js with Socket.IO Client
- **Backend**: Node.js with Socket.IO
- **Database**: Optional (for persisting tasks and user data, e.g., MongoDB)
- **Styling**: Tailwind CSS (or your preferred CSS framework)

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system
- [pnpm](https://pnpm.io/) as the package manager

### Clone the Repository

```bash
git clone https://github.com/sandeepkumardev/TaskSync.git
cd TaskSync
```

### Install Dependencies

For the backend:

```bash
cd backend
pnpm install
```

For the frontend:

```bash
cd frontend
pnpm install
```

---

## Usage

### Start the Backend Server

```bash
cd backend
pnpm dev
```

### Start the Frontend

```bash
cd frontend
pnpm dev
```

Open the app in your browser at `http://localhost:5173`.

---

## How It Works

1. **Admin Workflow**:

   - Create a unique 6-digit room.
   - Share the room link (e.g., `http://localhost:5173/<room-id>`) with users.
   - Assign tasks to the room.
   - Monitor responses from users in real time.

2. **User Workflow**:
   - Join a room using the shared room ID or link.
   - View assigned tasks.
   - Respond to tasks with "Done" or "Issue."

---

## Roadmap

### Current Features:

- Real-time task updates and status tracking.
- Room-based task organization.

### Planned Features:

- User authentication for secure access.
- Task history and archiving.
- Notifications for task updates.
- Multi-admin support.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Added feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or support, please reach out to:

- **Email**: sandeepypb@gmail.com
- **GitHub**: [sandeepkumardev](https://github.com/sandeepkumardev)
