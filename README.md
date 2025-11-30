# eSthan - Your Digital Address Solution

## 🏠 Overview

**eSthan** is a modern digital address platform that simplifies address sharing and management. Instead of sharing complicated physical addresses, users get a unique digital address identifier (e.g., `DIP-1234567890`) that can be used for deliveries, directions, and secure sharing.

## ✨ Key Features

### 🎯 Digital Address Management
- Generate unique digital addresses instantly with multiple suffix options
- Create multiple addresses for different purposes (home, work, office, personal, custom)
- View and manage all your digital addresses in one dashboard
- Copy address ID with one click
- Real-time geolocation integration for accurate address creation

### 🔐 Aadhaar Verification
- Secure Aadhaar verification for identity confirmation
- One-time verification process (cached in Redux state)
- Dialog-based verification with date of birth validation
- Automatic ISO date format conversion
- Verification status persists across address creations

### 🔒 Security & Privacy
- **DaPin (Digital Address PIN)** - Unique 4-6 digit PIN that acts as a consent granter
- Permanent and temporary consent options
- Configurable consent duration for temporary addresses
- Verified account status with security indicators
- Token-based authorization for all API calls
- Advanced encryption for all data

### 📦 Delivery Tracking
- Real-time delivery tracking
- Monitor all incoming deliveries
- Receive notifications for new deliveries
- Access delivery history and statistics

### 👥 Easy Sharing
- Share your digital address safely with businesses and friends
- No need to share physical addresses
- Control access with DaPin security layer
- Manage sharing permissions
- View who has access to your address

### 📊 Dashboard Features
- Quick stats (deliveries count, shared with, pending)
- Account status monitoring
- Security verification badge
- Activity tracking
- Multiple digital address display

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **State Management**: Redux with Redux Slice
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React Icons
- **Form Management**: React Hook Form with validation
- **Notifications**: react-hot-toast
- **Build Tool**: Vite
- **Geolocation**: Browser Geolocation API

### Authentication & Authorization
- Token-based JWT authentication
- Redux state management for auth and user verification
- Modal-based login/signup system
- Secure token storage in localStorage
- Bearer token authorization headers
- Protected routes with automatic redirection

## 📁 Project Structure

```
src/
├── component/
│   ├── Navbar.jsx                    # Main navigation bar with responsive mobile menu
│   ├── Home.jsx                      # Authenticated user dashboard
│   ├── Landing.jsx                   # Landing page for unauthenticated users
│   ├── Login.jsx                     # Login form component
│   ├── Signup.jsx                    # Registration form component
│   ├── AuthModal.jsx                 # Modal overlay for authentication
│   ├── InputField.jsx                # Reusable form input component
│   ├── PrivateRoute.jsx              # Protected route wrapper
│   ├── RootRoute.jsx                 # Smart root route handler
│   ├── CreateAddress.jsx             # Digital address creation form
│   └── AadhaarVerificationDialog.jsx # Aadhaar verification modal
├── store/
│   ├── authSlice.js                  # Redux authentication & verification slice
│   └── store.js                      # Redux store configuration
├── api/
│   └── api.js                        # API client instance with axios
├── utils/
│   └── geolocation.js                # Geolocation utility & address creation
├── App.jsx                           # Root application component
├── main.jsx                          # Application entry point
└── index.css                         # Global styles
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
- `/aadhaar-verified/:verificationId` - Verification confirmation (requires authentication)

### Authentication
- Login/Signup via modal overlay
- Token stored in Redux state and localStorage
- Automatic redirection based on auth status
- Session persistence via JWT token
- Verification status cached in Redux

## 📱 Responsive Design

- **Mobile**: Optimized for phones (< 640px)
- **Tablet**: Enhanced layout (640px - 1024px)
- **Desktop**: Full-featured layout (> 1024px)

### Mobile Features
- Hamburger menu with smart closing (click outside or resize to desktop)
- Touch-friendly buttons with larger hit areas
- Responsive typography with readable sizes
- Stack layout for forms
- Mobile-optimized modals and dialogs

### Desktop Features
- Horizontal navigation with user avatar dropdown
- Multi-column layouts for dashboard
- Advanced dropdowns for address management
- Optimized spacing and padding
- Glassmorphic dialogs with backdrop blur

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
- `GET /api/auth/profile` - Fetch user profile with token
- `POST /api/auth/verify-aadhaar` - Verify Aadhaar with date of birth

### Digital Address
- `POST /api/digital-address/create` - Create new digital address with geolocation
- `GET /api/addresses` - Get all user addresses
- `GET /api/addresses/:id` - Get specific address
- `PUT /api/addresses/:id` - Update address
- `DELETE /api/addresses/:id` - Delete address

### Sharing
- `POST /api/addresses/:id/share` - Share address with DaPin verification
- `GET /api/addresses/:id/shares` - Get share history
- `DELETE /api/addresses/:id/shares/:shareId` - Revoke share

## 🎯 User Flows

### First-Time User
1. Land on home page
2. Click "Get Started" or "Sign Up"
3. Fill registration form in modal
4. Redirect to dashboard
5. Dashboard guides to create first address
6. Verify identity with Aadhaar verification dialog
7. Select address purpose (personal, business, temporary)
8. Allow geolocation access for precise coordinates
9. Set DaPin security pin
10. Configure consent (permanent or temporary with duration)
11. Generate digital address (e.g., `username@home.add`)
12. View unique ID and copy for sharing

### Existing User
1. Land on login page
2. Click "Sign In"
3. Enter credentials
4. Redirect to dashboard
5. View and manage all addresses
6. Create additional addresses without re-verification (cached verification)
7. Share addresses or track deliveries

### Create Digital Address Flow
1. Click "Create Digital Address" or "Add New"
2. If not Aadhaar verified → Show verification dialog
   - Enter Aadhaar number (auto-formatted as XXXX XXXX XXXX)
   - Select date of birth
   - System verifies and caches verification status
3. If already verified → Skip to form
4. Select address purpose and enter name
5. Enter physical address and pincode
6. Select address suffix (home.add, work.add, custom)
7. Set DaPin (4-6 digit security pin)
8. Choose consent type:
   - **Permanent**: Always accessible
   - **Temporary**: Specify number of days (30, 90, 365, etc.)
9. Review generated address format
10. Allow geolocation access (for lat/long coordinates)
11. Submit form
12. Address created and added to dashboard

### Aadhaar Verification Flow
1. User initiates address creation
2. If not verified → Dialog opens
3. User enters 12-digit Aadhaar number
4. User selects date of birth
5. System validates and calls `/api/auth/verify-aadhaar`
6. Success → Dialog closes, verification cached
7. Redux state updated with `userVerified: true`
8. Subsequent address creations skip verification
9. Error → User can retry after 3 seconds

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
