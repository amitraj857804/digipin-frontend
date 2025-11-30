# eSthan - Your Digital Address Solution

## 🏠 Overview

**eSthan** is a modern digital address platform that simplifies address sharing and management. Instead of sharing complicated physical addresses, users get a unique digital address identifier (e.g., `DIP-1234567890`) that can be used for deliveries, directions, and secure sharing.

## ✨ Key Features

### 🎯 Digital Address Management
- Generate unique digital addresses instantly
- Create multiple addresses for different purposes (home, office, temporary)
- View and manage all your digital addresses in one dashboard
- Copy address ID with one click

### 🔒 Security & Privacy
- Advanced encryption for all data
- Control who can access your address information
- View access logs and delivery history
- Verified account status with security indicators

### 📦 Delivery Tracking
- Real-time delivery tracking
- Monitor all incoming deliveries
- Receive notifications for new deliveries
- Access delivery history and statistics

### 👥 Easy Sharing
- Share your digital address safely with businesses and friends
- No need to share physical addresses
- Manage sharing permissions
- View who has access to your address

### 📊 Dashboard Features
- Quick stats (deliveries count, shared with, pending)
- Account status monitoring
- Security verification badge
- Activity tracking

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **State Management**: Redux with Redux Slice
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React Icons
- **Form Management**: React Hook Form
- **Notifications**: react-hot-toast
- **Build Tool**: Vite

### Authentication
- Token-based authentication
- Redux state management for auth
- Modal-based login/signup system
- Secure token storage

## 📁 Project Structure

```
src/
├── component/
│   ├── Navbar.jsx           # Main navigation bar with responsive mobile menu
│   ├── Home.jsx             # Authenticated user dashboard
│   ├── Landing.jsx          # Landing page for unauthenticated users
│   ├── Login.jsx            # Login form component
│   ├── Signup.jsx           # Registration form component
│   ├── AuthModal.jsx        # Modal overlay for authentication
│   ├── InputField.jsx       # Reusable form input component
│   ├── PrivateRoute.jsx     # Protected route wrapper
│   └── RootRoute.jsx        # Smart root route handler
├── store/
│   ├── authSlice.js         # Redux authentication slice
│   └── store.js             # Redux store configuration
├── api/
│   └── api.js               # API client instance
├── App.jsx                  # Root application component
├── main.jsx                 # Application entry point
└── index.css                # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue-600 (`#2563eb`)
- **Secondary**: Indigo-600 (`#4f46e5`)
- **Accent**: White with gradient backgrounds
- **Gradient**: `from-blue-600 via-indigo-600 to-blue-700`

### Typography
- **Headings**: Bold, high contrast
- **Body**: Clear, readable sans-serif
- **Icons**: Lucide React for consistency

### Components
- Card-based layouts with shadows and borders
- Responsive grid system (mobile-first)
- Smooth transitions and hover effects
- Modal dialogs for user interactions

## 🔐 Routing Structure

### Public Routes
- `/` - Root route (shows Landing if unauthenticated, Home if authenticated)

### Protected Routes
- `/home` - User dashboard (requires authentication)

### Authentication
- Login/Signup via modal overlay
- Token stored in Redux state
- Automatic redirection based on auth status
- Session persistence

## 📱 Responsive Design

- **Mobile**: Optimized for phones (< 640px)
- **Tablet**: Enhanced layout (640px - 1024px)
- **Desktop**: Full-featured layout (> 1024px)

### Mobile Features
- Hamburger menu with smart closing
- Touch-friendly buttons
- Responsive typography
- Stack layout for forms

### Desktop Features
- Horizontal navigation
- Multi-column layouts
- Advanced dropdowns
- Optimized spacing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amitraj857804/digipin-frontend.git
cd digipin-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Digital Address
- `GET /api/addresses` - Get all user addresses
- `POST /api/addresses` - Create new address
- `GET /api/addresses/:id` - Get specific address
- `PUT /api/addresses/:id` - Update address
- `DELETE /api/addresses/:id` - Delete address

### Sharing
- `POST /api/addresses/:id/share` - Share address
- `GET /api/addresses/:id/shares` - Get share history
- `DELETE /api/addresses/:id/shares/:shareId` - Revoke share

## 🎯 User Flows

### First-Time User
1. Land on home page
2. Click "Get Started" or "Sign Up"
3. Fill registration form in modal
4. Redirect to dashboard
5. Dashboard guides to create first address
6. Generate digital address ID
7. Start sharing and receiving deliveries

### Existing User
1. Land on login page
2. Click "Sign In"
3. Enter credentials
4. Redirect to dashboard
5. View and manage all addresses
6. Share addresses or track deliveries

### Create Digital Address
1. Click "Create Digital Address" or "Add New"
2. Select purpose (personal, business, temporary)
3. Enter address name and location
4. Preview generated ID
5. Confirm creation
6. Address added to dashboard

## 🔄 Authentication Flow

1. User submits login/signup form in modal
2. Modal validates form data
3. API call made to backend
4. Token received and stored in Redux
5. AuthModal closes automatically
6. User redirected to dashboard
7. Navbar updates to show user avatar
8. Protected routes become accessible

## 🛡️ Security Features

- ✅ Token-based authentication
- ✅ Secure API endpoints
- ✅ Input validation on forms
- ✅ Protected routes
- ✅ Session management
- ✅ Encrypted data transmission

## 📈 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] QR code generation for addresses
- [ ] Integration with delivery services
- [ ] Mobile app (iOS/Android)
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Two-factor authentication

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💼 Author

**Amit Raj**
- GitHub: [@amitraj857804](https://github.com/amitraj857804)

## 📞 Support

For support, email support@esthan.com or open an issue on GitHub.

## 🙏 Acknowledgments

- React and React Router communities
- Tailwind CSS for styling framework
- Lucide React for beautiful icons
- Redux for state management
- All contributors and users

---

**Made with ❤️ by eSthan Team**

Visit us: [www.esthan.com](https://www.esthan.com)
