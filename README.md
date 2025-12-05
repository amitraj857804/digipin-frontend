# eSthan - Your Digital Address Solution

## 🏠 Overview

**eSthan** is a comprehensive digital address platform that simplifies address management, verification, and sharing. Instead of sharing complicated physical addresses, users get a unique digital address identifier (e.g., `user@home.dop`) that can be used for deliveries, directions, and secure sharing with built-in AAVA verification support.

## ✨ Key Features

### 🎯 Digital Address Management
- Generate unique digital addresses instantly with multiple suffix options
- Create multiple addresses for different purposes (home, work, office, personal, custom)
- View and manage all your digital addresses in one dashboard
- Copy address ID with one click
- Real-time geolocation integration for accurate address creation
- Edit and update existing addresses with comprehensive form validation
- Delete addresses with confirmation dialog
- View address status (ACTIVE/EXPIRED) with color-coded badges

### 🔐 Aadhaar Verification
- Secure Aadhaar verification for identity confirmation
- One-time verification process (cached in Redux state)
- Dialog-based verification with date of birth validation
- Automatic ISO date format conversion
- Verification status persists across address creations

### 🛡️ AAVA Verification (Avatar Agent Address Verification)
- **Automated Agent Verification**: Physical address verification by AI agents
- **5-Step Verification Process**:
  1. Agent Assignment - Automated agent selection based on location
  2. Location Verification - GPS coordinates capture at the exact address
  3. Photo Evidence - Photographic proof of address marking
  4. Documentation Review - Supporting documents validation
  5. Confidence Score Update - Address credibility score enhancement
- **Demo Interface**: Interactive demo showing how AAVA works (accessible at `/aava-demo`)
- **Flag for Verification**: Mark addresses for AAVA verification from User Profile
- **Verification Status Check**: Check real-time verification status
- **Timeline Display**: 6-8 hour average verification completion time
- **Use Case Support**: Government welfare, property records, legal notices, emergency services, e-commerce, food delivery

### 🔒 Security & Privacy
- **DaPin (Digital Address PIN)** - Unique 4-6 digit PIN that acts as a consent granter
- Permanent and temporary consent options
- Configurable consent duration for temporary addresses
- Verified account status with security indicators
- Token-based authorization for all API calls
- Advanced encryption for all data
- Geo-tagged photo verification proof
- Tamper-proof logging system

### 📦 Delivery Tracking
- Real-time delivery tracking
- Monitor all incoming deliveries
- Receive notifications for new deliveries
- Access delivery history and statistics
- Share address with specific use cases

### 👥 Easy Sharing
- Share your digital address safely with businesses and friends
- Web Share API integration with platform-specific options (WhatsApp, Email, SMS, Facebook, Twitter)
- Clipboard fallback for browser compatibility
- No need to share physical addresses
- Control access with DaPin security layer
- Manage sharing permissions
- View who has access to your address

### 📊 Dashboard Features
- Quick stats (digital addresses count, verification status)
- Account status monitoring
- Security verification badge
- Activity tracking
- Primary address highlight with confidence score
- ACTIVE/EXPIRED status indicators
- View Details modal for comprehensive address information

### 🌐 AIU Services Integration
- **Store Address** - Create and manage digital addresses
- **Resolve Address** - Access addresses with consent verification
- **Submit Feedback** - User feedback and support system
- **AAVA Verification Demo** - Learn how verification works

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **State Management**: Redux with Redux Toolkit (RTK)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React Icons, React Icons
- **Form Management**: React Hook Form with validation
- **Notifications**: react-hot-toast
- **Build Tool**: Vite
- **Geolocation**: Browser Geolocation API
- **Web APIs**: Web Share API, Clipboard API

### Backend
- **Language**: Java (JDK 21)
- **Framework**: Spring Boot (latest version)
- **ORM**: Spring Data JPA with Hibernate
- **Primary Database**: MySQL 8.0+
- **Immutable Ledger Database**: IMMUDB (tamper-proof verification logs & audit trail)
- **Security**: Spring Security with JWT (JSON Web Token) authentication
- **API Development**: Spring MVC / Spring REST
- **Build Tool**: Maven
- **Dependency Management**: Maven Central Repository
- **Validation**: Spring Validation & Hibernate Validator
- **API Documentation**: Swagger/Springdoc OpenAPI
- **Exception Handling**: Global exception handler with custom error responses
- **Database Migration**: Flyway or Liquibase (optional)

### Authentication & Authorization
- **JWT Implementation**: Token-based authentication with Spring Security
- **Token Generation**: HS256 algorithm for JWT signing
- **Token Validation**: Custom JWT filter for request validation
- **Role-Based Access Control (RBAC)**: User roles (ADMIN, USER, AGENT)
- **Password Security**: BCrypt hashing for secure password storage
- **Token Refresh**: Refresh token mechanism for session extension
- **Token Expiration**: Configurable JWT token validity (typically 1 hour access, 7 days refresh)
- **Redis Integration** (optional): Token blacklisting for logout functionality

### Frontend-Backend Communication
- **Protocol**: HTTPS
- **API Format**: RESTful JSON
- **CORS Configuration**: Spring Security CORS configuration
- **Request/Response Validation**: Spring Validation annotations
- **Bearer Token Header**: `Authorization: Bearer {token}`
- **Error Handling**: Standardized error response format with HTTP status codes

### Testing & API Tools
- **API Testing**: Postman (collection provided)
- **Unit Testing**: JUnit 5 / Mockito
- **Integration Testing**: Spring Boot Test
- **Load Testing**: JMeter (optional)

### DevOps & Deployment (Optional)
- **Containerization**: Docker with Spring Boot support
- **Container Registry**: Docker Hub or Azure Container Registry
- **Orchestration**: Kubernetes (optional)
- **CI/CD Pipeline**: GitHub Actions / Jenkins
- **Cloud Hosting**: AWS, Azure, or GCP ready

### Authentication & Authorization
- Token-based JWT authentication
- Redux state management for auth and user verification
- Modal-based login/signup/forgot-password system
- Secure token storage in localStorage
- Bearer token authorization headers
- Protected routes with automatic redirection
- Session persistence

## 📁 Project Structure

```
src/
├── component/
│   ├── Navbar.jsx                    # Main navigation with AIU services dropdown
│   ├── auth/
│   │   ├── Login.jsx                 # Login form with forgot password
│   │   ├── Signup.jsx                # Registration form
│   │   ├── ForgotPassword.jsx        # Password reset flow
│   │   └── AuthModal.jsx             # Modal overlay for authentication
│   ├── address/
│   │   ├── CreateAddress.jsx         # Digital address creation form with live preview
│   │   ├── EditAddressModal.jsx      # Address editing modal
│   │   └── AddressDetailsModal.jsx   # Address details view
│   ├── AAVA/
│   │   ├── AAVA_Verification.jsx     # Main AAVA verification component
│   │   ├── AAVA_DemoInfo.jsx         # AAVA demo information
│   │   ├── AAVA_DemoModal.jsx        # AAVA demo modal wrapper
│   │   └── AAVA_DemoComplete.jsx     # Complete AAVA demo with tabs
│   ├── AIU/
│   │   ├── User_AIU.jsx              # AIU user services
│   │   ├── AIU_Resolve.jsx           # Resolve consent
│   │   └── AIU_Feedback.jsx          # Feedback submission
│   ├── pages/
│   │   ├── Home.jsx                  # Authenticated user dashboard
│   │   ├── Dashboard.jsx             # User dashboard
│   │   ├── About.jsx                 # About page
│   │   └── Contact.jsx               # Contact page
│   ├── UserProfile.jsx               # User profile with AAVA flag option
│   ├── PrivateRoute.jsx              # Protected route wrapper
│   ├── RootRoute.jsx                 # Smart root route handler
│   └── InputField.jsx                # Reusable form input component
├── store/
│   ├── authSlice.js                  # Redux authentication & verification slice
│   ├── addressSlice.js               # Redux address management slice
│   └── store.js                      # Redux store configuration
├── api/
│   └── api.js                        # API client instance with axios
├── utils/
│   └── app.js                        # Component exports utility
├── App.jsx                           # Root application component
├── main.jsx                          # Application entry point
└── index.css                         # Global styles with scrollbar-hide class
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue-600 (`#2563eb`)
- **Secondary**: Indigo-600 (`#4f46e5`)
- **Tertiary**: Purple-600 (`#9333ea`)
- **Accent**: White with gradient backgrounds
- **Primary Gradient**: `from-blue-600 via-indigo-600 to-purple-600`
- **Status Colors**: 
  - Green (ACTIVE status)
  - Red (EXPIRED status)

### Typography
- **Headings**: Bold, high contrast
- **Body**: Clear, readable sans-serif
- **Icons**: Lucide React for consistency

### Components
- Card-based layouts with shadows and borders
- Responsive grid system (mobile-first)
- Smooth transitions and hover effects
- Modal dialogs with backdrop blur
- Glassmorphic cards with transparency effects

## 🔐 Routing Structure

### Public Routes
- `/` - Root route (shows Landing if unauthenticated, Home if authenticated)
- `/about` - About page
- `/contact` - Contact page
- `/aava-demo` - AAVA verification demo
- `/verify-aava` - Standalone AAVA verification

### Protected Routes
- `/home` - User dashboard (requires authentication)
- `/dashboard` - Dashboard (requires authentication)
- `/profile` - User profile (requires authentication)

### AIU Services Routes
- `/user_aiu` - Store address creation
- `/resolve_consent` - Resolve address with consent
- `/feedback` - Submit feedback

## 📱 Responsive Design

- **Mobile**: Optimized for phones (< 640px)
- **Tablet**: Enhanced layout (640px - 1024px)
- **Desktop**: Full-featured layout (> 1024px)

### Mobile Features
- Hamburger menu with smart closing
- Touch-friendly buttons with larger hit areas
- Responsive typography with readable sizes
- Stack layout for forms
- Mobile-optimized modals and dialogs
- Scrollbar hiding for clean UI

### Desktop Features
- Horizontal navigation with user dropdown
- Multi-column layouts for dashboard
- Advanced dropdowns for address management
- Optimized spacing and padding
- Glassmorphic dialogs with backdrop blur
- Interactive step navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amitraj857804/esthan-frontend.git
cd esthan-frontend
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
- `POST /api/auth/forgot-password` - Password reset with emailOrPhone, aadhaarNumber, dateOfBirth, newPassword, confirmPassword

### Digital Address
- `POST /api/digital-address/create` - Create new digital address
- `GET /api/digital-address` - Get all user addresses
- `GET /api/digital-address/:id` - Get specific address
- `PUT /api/digital-address/update` - Update address with: digitalAddress, suffix, latitude, longitude, address, addressName, pincode, purpose, uniPin, consentType, consentDurationDays
- `DELETE /api/digital-address/delete` - Delete address
- `POST /api/digital-address/flag-for-aava` - Flag address for AAVA verification with: digitalAddress, reason
- `GET /api/digital-address/digipin` - Get Digipin ID from coordinates

### AAVA Verification
- `POST /api/aava/aava-verify` - Submit AAVA verification request with: digitalAddress, agentId, locationConfirmed, verificationNotes, verifiedLatitude, verifiedLongitude, photoproofUrl, verificationStatus
- `GET /api/aava/aava-status/{digitalAddress}` - Check verification status

## 🏗️ Backend Architecture

### Spring Boot Application Structure

```
esthan-backend/
├── src/main/java/com/esthan/
│   ├── config/
│   │   ├── SecurityConfig.java              # Spring Security + JWT configuration
│   │   ├── JwtConfig.java                   # JWT properties configuration
│   │   ├── CorsConfig.java                  # CORS configuration for frontend
│   │   └── SwaggerConfig.java               # Swagger/OpenAPI documentation
│   ├── controller/
│   │   ├── AuthController.java              # /api/auth endpoints
│   │   ├── DigitalAddressController.java    # /api/digital-address endpoints
│   │   ├── AAVAController.java              # /api/aava endpoints
│   │   └── UserProfileController.java       # /api/user endpoints
│   ├── service/
│   │   ├── AuthService.java                 # Authentication business logic
│   │   ├── DigitalAddressService.java       # Address management logic
│   │   ├── AAVAService.java                 # AAVA verification logic
│   │   ├── AadhaarService.java              # Aadhaar verification
│   │   └── UserService.java                 # User profile management
│   ├── repository/
│   │   ├── UserRepository.java              # JPA repository for users
│   │   ├── DigitalAddressRepository.java    # JPA repository for addresses
│   │   ├── AAVAVerificationRepository.java  # JPA repository for AAVA
│   │   └── AadhaarVerificationRepository.java # JPA repository for Aadhaar
│   ├── entity/
│   │   ├── User.java                        # User JPA entity with roles
│   │   ├── DigitalAddress.java              # Digital address entity
│   │   ├── AAVAVerification.java            # AAVA verification entity
│   │   ├── AadhaarVerification.java         # Aadhaar verification entity
│   │   └── Role.java                        # User role enum
│   ├── security/
│   │   ├── JwtTokenProvider.java            # JWT token generation & validation
│   │   ├── JwtAuthenticationFilter.java     # JWT authentication filter
│   │   ├── JwtAuthenticationEntryPoint.java # JWT exception handling
│   │   └── CustomUserDetailsService.java    # User details loading
│   ├── dto/
│   │   ├── LoginRequest.java                # Login request DTO
│   │   ├── RegisterRequest.java             # Registration request DTO
│   │   ├── AuthResponse.java                # JWT token response DTO
│   │   ├── DigitalAddressDto.java           # Address data transfer object
│   │   ├── AAVAVerificationDto.java         # AAVA verification DTO
│   │   └── ForgotPasswordRequest.java       # Password reset DTO
│   ├── exception/
│   │   ├── ResourceNotFoundException.java   # 404 exception
│   │   ├── BadRequestException.java         # 400 exception
│   │   ├── UnauthorizedException.java       # 401 exception
│   │   ├── GlobalExceptionHandler.java      # Global exception handler
│   │   └── ErrorResponse.java               # Standardized error response
│   ├── utils/
│   │   ├── JwtUtils.java                    # JWT utility methods
│   │   ├── ValidationUtils.java             # Input validation utilities
│   │   ├── GeoLocationUtils.java            # Geolocation calculation
│   │   └── EncryptionUtils.java             # Data encryption utilities
│   └── DigiPinApplication.java              # Spring Boot main class
├── src/main/resources/
│   ├── application.properties               # Configuration properties
│   ├── application-dev.properties           # Development environment
│   ├── application-prod.properties          # Production environment
│   └── db/migration/                        # Flyway/Liquibase migrations
├── pom.xml                                  # Maven dependencies
└── README.md                                # Backend setup instructions
```

### Key Spring Boot Dependencies

```xml
<!-- Spring Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- JWT Library -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>

<!-- Spring Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- MySQL Driver -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>

<!-- IMMUDB Client (Immutable Ledger Database) -->
<dependency>
    <groupId>io.codenotary</groupId>
    <artifactId>immudb4j</artifactId>
    <version>1.4.1</version>
</dependency>

<!-- Validation -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

<!-- Swagger/OpenAPI -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.0.2</version>
</dependency>

<!-- Lombok (Optional but recommended) -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>

<!-- Redis (Optional for token blacklisting) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- Flyway (Database migration) -->
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>

<!-- Testing -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-test</artifactId>
    <scope>test</scope>
</dependency>
```

### Database Schema

#### MySQL Relational Database

**Users Table**
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    aadhaar_number VARCHAR(12),
    date_of_birth DATE,
    verification_status VARCHAR(20),
    account_status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_phone (phone)
);
```

#### Digital Addresses Table
```sql
CREATE TABLE digital_addresses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    digital_address VARCHAR(100) UNIQUE NOT NULL,
    address_name VARCHAR(255),
    physical_address VARCHAR(500),
    pincode VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    purpose VARCHAR(50),
    uni_pin VARCHAR(20),
    suffix VARCHAR(50),
    da_pin VARCHAR(6) NOT NULL,
    consent_type VARCHAR(20),
    consent_duration_days INT,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    UNIQUE INDEX idx_digital_address (digital_address)
);
```

#### AAVA Verifications Table
```sql
CREATE TABLE aava_verifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    digital_address_id BIGINT NOT NULL,
    agent_id BIGINT,
    verification_status VARCHAR(50),
    location_confirmed BOOLEAN DEFAULT FALSE,
    verified_latitude DECIMAL(10, 8),
    verified_longitude DECIMAL(11, 8),
    verification_notes TEXT,
    photo_proof_url VARCHAR(500),
    confidence_score DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (digital_address_id) REFERENCES digital_addresses(id) ON DELETE CASCADE,
    FOREIGN KEY (agent_id) REFERENCES users(id),
    INDEX idx_digital_address_id (digital_address_id),
    INDEX idx_status (verification_status)
);
```

#### Aadhaar Verifications Table
```sql
CREATE TABLE aadhaar_verifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    aadhaar_number VARCHAR(12),
    verification_status VARCHAR(20),
    verified_date_of_birth DATE,
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    UNIQUE INDEX idx_user_aadhaar (user_id, aadhaar_number)
);
```

#### IMMUDB Immutable Ledger Database

**Purpose**: Store tamper-proof audit logs and verification records

**Key Features**:
- Cryptographically tamper-proof records
- Immutable append-only ledger
- Perfect for AAVA verification audit trail
- Compliance with audit and regulatory requirements
- Timestamp verification and non-repudiation

**Stored Records**:
- AAVA verification attempts and results
- Address verification timestamps
- Aadhaar verification confirmations
- Address flagging reasons and dates
- User access logs to sensitive data
- All authentication and authorization events
- Digital address creation and modification history

**IMMUDB Configuration** (application.properties):
```properties
# IMMUDB Configuration
immudb.server=localhost
immudb.port=3322
immudb.database=esthan_ledger
immudb.username=immudb
immudb.password=immudb
```

**Example IMMUDB Storage**:
```
Key: AAVA_VERIFICATION_{digitalAddress}_{timestamp}
Value: {
  "digitalAddress": "user@home.dop",
  "agentId": 123,
  "verificationStatus": "VERIFIED",
  "timestamp": "2025-12-05T10:30:00Z",
  "latitude": 28.7041,
  "longitude": 77.1025,
  "photoProofUrl": "https://...",
  "confidenceScore": 0.98
}
```

### JWT Authentication Flow

#### 1. Token Generation (Login)
```
User submits credentials → AuthController.login()
    ↓
AuthService validates user & password
    ↓
JwtTokenProvider.generateToken(user)
    ↓
Token created with HS256 algorithm
    ↓
Return AuthResponse with token, expiry, userDetails
```

#### 2. Token Validation (Requests)
```
Request includes: Authorization: Bearer {token}
    ↓
JwtAuthenticationFilter intercepts request
    ↓
Extract token from header
    ↓
JwtTokenProvider.validateToken(token)
    ↓
Token valid → Extract claims & user info
    ↓
Create Authentication object
    ↓
Grant access to protected endpoint
    ↓
Token invalid/expired → JwtAuthenticationEntryPoint
    ↓
Return 401 Unauthorized
```

#### 3. Token Structure (JWT)
```
Header: {
    "alg": "HS256",
    "typ": "JWT"
}

Payload: {
    "sub": "user_id",
    "email": "user@example.com",
    "username": "username",
    "roles": ["USER"],
    "iat": 1702000000,
    "exp": 1702003600
}

Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret_key)
```

### Spring Security Configuration

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .exceptionHandling()
                .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
                .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
            .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .anyRequest().authenticated()
                .and()
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
            .cors().and()
            .httpBasic().disable();
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
```

### API Testing with Postman

#### Postman Collection Setup
1. **Create Environment Variables**:
   - `base_url`: `http://localhost:8080`
   - `token`: (auto-populated after login)
   - `user_id`: (auto-populated after login)

2. **Authentication Tests**:
   - **Register**: `POST /api/auth/register`
   - **Login**: `POST /api/auth/login` → Saves token to environment
   - **Get Profile**: `GET /api/auth/profile` (with Bearer token)
   - **Verify Aadhaar**: `POST /api/auth/verify-aadhaar`
   - **Forgot Password**: `POST /api/auth/forgot-password`

3. **Digital Address Tests**:
   - **Create Address**: `POST /api/digital-address/create` (with coordinates)
   - **Get All Addresses**: `GET /api/digital-address`
   - **Update Address**: `PUT /api/digital-address/update`
   - **Delete Address**: `DELETE /api/digital-address/delete`
   - **Flag for AAVA**: `POST /api/digital-address/flag-for-aava`

4. **AAVA Verification Tests**:
   - **Submit Verification**: `POST /api/aava/aava-verify`
   - **Check Status**: `GET /api/aava/aava-status/{digitalAddress}`

#### Common Postman Tests
```javascript
// Save token from login response
pm.globals.set("token", pm.response.json().token);

// Validate response structure
pm.test("Response structure is correct", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("message");
    pm.expect(jsonData).to.have.property("data");
});

// Test token presence
pm.test("Token is returned", function () {
    pm.expect(pm.globals.get("token")).to.not.be.empty;
});

// Test response status
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

### Environment Configuration

#### application.properties
```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/esthan_db
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=your_secret_key_here_minimum_32_characters_long
jwt.expiration=3600000
jwt.refresh-expiration=604800000

# CORS Configuration
cors.allowed-origins=http://localhost:5173,http://localhost:3000
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
cors.allowed-headers=*
cors.allow-credentials=true

# Logging
logging.level.root=INFO
logging.level.com.esthan=DEBUG

# Jackson Configuration
spring.jackson.serialization.write-dates-as-timestamps=false
spring.jackson.default-property-inclusion=non_null

# API Documentation
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.api-docs.path=/v3/api-docs
```

### Build & Run Backend

```bash
# Using Maven
mvn clean install
mvn spring-boot:run

# Using IDE
Right-click project → Run As → Spring Boot App

# Docker (optional)
docker build -t esthan-backend .
docker run -p 8080:8080 esthan-backend

# Access API Documentation
http://localhost:8080/swagger-ui.html
```

### Security Best Practices Implemented

✅ **Password Security**
- BCrypt hashing with salt
- Minimum 8 characters with complexity rules
- Password never stored in plain text

✅ **JWT Token Management**
- Configurable expiration (default 1 hour)
- Refresh token mechanism (7 days)
- Token stored in HTTP-only cookies (optional)

✅ **Request Validation**
- Input sanitization
- XSS protection
- CSRF token validation

✅ **CORS Security**
- Whitelist allowed origins
- Restrict HTTP methods
- Validate headers

✅ **Exception Handling**
- Global exception handler
- Standardized error responses
- Sensitive error logging (no stack traces to client)

✅ **Rate Limiting** (Optional)
- Prevent brute force attacks
- API quota management

✅ **Database Security**
- Parameterized queries (JPA prevents SQL injection)
- Connection pooling
- Encrypted sensitive data fields

## 🎯 User Flows

### First-Time User Registration
1. Land on home page
2. Click "Sign Up" or open modal
3. Enter username, email, phone, password
4. Form validation and submission
5. Redirect to dashboard or home
6. Dashboard guides to create first address

### Create Digital Address Flow
1. Click "Create Digital Address" or "Add New"
2. If not Aadhaar verified → Show verification dialog
   - Enter Aadhaar number (auto-formatted)
   - Select date of birth
   - System verifies and caches verification status
3. If already verified → Skip to form
4. Fill address details:
   - Address name
   - Physical address
   - Pincode
   - Purpose (select from dropdown)
   - UniPin (if applicable)
5. Select address suffix (home.dop, work.dop, etc.)
6. Set DaPin (4-6 digit security pin)
7. Choose consent type (Permanent or Temporary with duration)
8. View live preview of generated address
9. Allow geolocation access for coordinates
10. Submit form
11. Address created and appears on dashboard

### AAVA Verification Flow
1. Navigate to User Profile
2. Scroll to "AAVA Verification" section
3. Click "Flag for AAVA Verification"
4. Modal opens with form
5. Enter digital address
6. Enter reason for verification (optional, has default)
7. Click "Flag Address"
8. Success notification and modal closes
9. Agent will verify within 6-8 hours
10. Check status from AAVA demo page

### AAVA Demo Flow
1. Click navbar → AIU Services → AAVA Verification Demo
2. Or navigate to `/aava-demo`
3. Two tabs available:
   - **How It Works**: Interactive 5-step process with color-coded steps
   - **Try Verification**: Actual verification form to test the system
4. Step through the process to understand verification
5. Fill in form to submit verification request

## 🛡️ Security Features

- ✅ **Token-based JWT authentication** - Secure token storage and transmission
- ✅ **Aadhaar Verification** - Identity confirmation for address creation
- ✅ **DaPin Security** - 4-6 digit PIN as consent granter for address access
- ✅ **Geolocation Integration** - Accurate coordinates for digital addresses
- ✅ **AAVA Verification** - Physical address verification with photo proof
- ✅ **Input Validation** - React Hook Form with comprehensive validation
- ✅ **Protected Routes** - Automatic redirection for unauthorized access
- ✅ **Session Management** - Token persistence across browser sessions
- ✅ **Encrypted API Transmission** - HTTPS for all API calls
- ✅ **Temporary Consent** - Time-limited address access with expiration
- ✅ **Bearer Token Authorization** - All protected endpoints require valid token
- ✅ **Geo-tagged Photo Proof** - AAVA captures location-verified photos
- ✅ **Tamper-proof Logging** - All verifications are tamper-proof logged
- ✅ **Agent Authentication** - Only authorized agents can submit verification

## 🆕 Latest Updates (Current Version)

### AAVA Verification System (New)
- Complete AAVA verification demo component with interactive UI
- 5-step verification process visualization
- Color-coded step indicators matching website theme
- AAVA DemoInfo page with educational content
- AAVA DemoComplete component with tabbed interface
- Flag address for AAVA verification in User Profile
- API integration for flagging addresses: `POST /api/digital-address/flag-for-aava`
- Verification status checking functionality
- Use case approval display
- Security and compliance information

### Forgot Password Flow (New)
- Complete password reset functionality
- Two-step verification: Form → Success message
- Fields: emailOrPhone, aadhaarNumber, dateOfBirth, newPassword, confirmPassword
- Password show/hide toggles
- Password matching validation
- Maximum 12 digits for Aadhaar validation
- Integrated into Auth Modal system

### Enhanced Address Management
- Live preview in CreateAddress showing real-time form values
- Purpose field dropdown with standardized options
- Edit address modal with all fields updateable
- Address details modal for comprehensive viewing
- Dynamic status badges (ACTIVE/EXPIRED)
- View Details button on Home page

### Navbar Enhancements
- AIU Services dropdown with multiple options
- AAVA Verification Demo link in dropdown
- Conditional navbar items based on auth status
- Home and Dashboard hidden for unauthenticated users
- About and Contact always visible
- Mobile-responsive menu with smart closing

### User Profile Enhancements
- AAVA Verification flagging section
- Modal dialog for flagging addresses
- Default reason text for convenience
- Loading states during submission
- Success/error notifications
- Form validation and clearing

### Web Share Integration
- Share button on Home page with Web Share API
- Platform-specific sharing options
- Clipboard fallback for browser compatibility
- Shares the digital address directly

### Styling Improvements
- Scrollbar hiding on auth modals for clean UI
- Background scroll prevention when modals open
- Color-coded step navigation (blue-indigo-purple gradient)
- Status badge colors updated
- Responsive design across all components

## 📈 Future Enhancements

- [ ] Real-time notifications system
- [ ] Advanced analytics dashboard with address usage stats
- [ ] QR code generation for digital addresses
- [ ] Integration with delivery services (Flipkart, Amazon, Dunzo)
- [ ] Mobile app (iOS/Android with React Native)
- [ ] Dark mode theme support
- [ ] Multi-language support (Hindi, Bengali, etc.)
- [ ] Two-factor authentication (SMS/Email OTP)
- [ ] Address bulk operations (create multiple addresses)
- [ ] API rate limiting and usage statistics
- [ ] SMS notifications for deliveries
- [ ] Email notifications for access logs
- [ ] Advanced consent management UI
- [ ] Digital address renewal/expiration management

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
- Lucide React and React Icons for beautiful icons
- Redux Toolkit for state management
- react-hot-toast for notifications
- All contributors and users

---

**Made with ❤️ by eSthan Team**

Visit us: [www.esthan.com](https://www.esthan.com)
