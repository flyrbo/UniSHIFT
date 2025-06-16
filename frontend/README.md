# UniSHIFT Charity Website

A Vue 3 + TypeScript charity website for UniSHIFT organization with question submission functionality, MongoDB integration, and Discord bot management.

## Features

- Modern, responsive design
- FAQ section with expandable questions
- Contact form with question submission
- MongoDB database for storing enquiries and donations
- Discord bot for donation management and Q&A responses
- Real-time donation tracking
- Email response system

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation
- Discord Bot Token and Server Setup

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure your `.env` file with:
   - MongoDB connection string
   - Discord bot token and server IDs
   - Email service credentials

4. Start the development server:
```bash
npm run dev
```

5. In a separate terminal, start the backend server:
```bash
npm run server
```

6. In another terminal, start the Discord bot:
```bash
npm run bot
```

The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:3001`.

## API Endpoints

### Questions/Enquiries
- **POST** `/api/questions` - Submit a new question
- **GET** `/api/questions` - Get all enquiries (admin)
- **GET** `/api/questions/stats` - Get enquiry statistics
- **PUT** `/api/questions/:id` - Update enquiry status and response

### Donations
- **GET** `/api/donations` - Get all donations with pagination
- **POST** `/api/donations` - Add a new donation
- **GET** `/api/donations/total` - Get total donation amount

### Health Check
- **GET** `/api/health` - Health check endpoint

## Discord Bot Commands

### Slash Commands
- `/add <amount>` - Add a new donation to the database
- `/view [page]` - View all donations with pagination

### Features
- Automatic question notifications in designated Discord channel
- Interactive response system with email delivery
- Donation confirmation system with embed messages
- Paginated donation viewing

## Database Structure

### Donations Collection
```json
{
  "amount": 25.50,
  "date": "2024-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Enquiries Collection
```json
{
  "email": "user@example.com",
  "question": "What is UniSHIFT?",
  "status": "new",
  "response": "",
  "ipAddress": "127.0.0.1",
  "discordMessageId": "1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Environment Variables

Create a `.env` file with the following variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/unishift
DISCORD_TOKEN=your_discord_bot_token
DISCORD_GUILD_ID=your_discord_server_id
DISCORD_QUESTIONS_CHANNEL_ID=your_questions_channel_id
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=info@unishift.org
```

## Build for Production

```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── components/          # Vue components
│   ├── composables/         # Vue composables
│   ├── App.vue             # Main app component
│   └── main.ts             # App entry point
├── server/
│   ├── models/             # MongoDB models
│   ├── config/             # Database configuration
│   ├── utils/              # Utility functions
│   └── index.js            # Express server
├── bot/
│   ├── index.js            # Discord bot
│   └── package.json        # Bot dependencies
└── public/                 # Static assets
```

## Technologies Used

- **Frontend**: Vue 3, TypeScript, Vite
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Bot**: Discord.js
- **Email**: Nodemailer
- **Styling**: CSS with custom properties
- **Icons**: Lucide Vue Next

## Discord Bot Setup

1. Create a Discord application and bot at https://discord.com/developers/applications
2. Copy the bot token to your `.env` file
3. Invite the bot to your server with appropriate permissions
4. Create a dedicated channel for questions and copy its ID to `.env`
5. Copy your server (guild) ID to `.env`
6. Run the bot with `npm run bot`

## Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in the `EMAIL_PASS` environment variable

## MongoDB Setup

### Using MongoDB Atlas (Recommended)
1. Create a free account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user
4. Get the connection string and add it to `.env`

### Using Local MongoDB
1. Install MongoDB locally
2. Start the MongoDB service
3. Use `mongodb://localhost:27017/unishift` as your connection string