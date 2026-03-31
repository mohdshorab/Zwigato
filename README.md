# Zwigato 🛒🍕
**A High-Performance Food Mobile Application**

Zwigato is a cross-platform mobile experience built with **React Native** and **TypeScript**. This project is a dedicated side-practice to master the complexities of a real-world "Food-Tech" app, focusing on high-speed list rendering, robust state management, and seamless authentication.

> [!IMPORTANT]
> **Project Status: In Progress**
> This is a personal learning project. While the core "happy path" (Browsing to Cart) is functional, advanced features like real-time tracking and live payments are scheduled for the final development phase.

---

## 🚀 Tech Stack

* **Framework:** [React Native](https://reactnative.dev/) (Android & iOS)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **State Management:** [Redux Toolkit (RTK)](https://redux-toolkit.js.org/) + Middleware Listeners & Thunks
* **Database/Auth:** [Firebase](https://firebase.google.com/) (OTP Login, Token Management)
* **List Rendering:** [Shopify FlashList](https://shopify.github.io/flash-list/) for buttery-smooth scrolling
* **Networking:** [Axios](https://axios-http.com/)
* **Debugging:** [Reactotron](https://github.com/infinitered/reactotron)
* **Mock Backend:** `json-server` & `json-server-auth` (Mimicking Restaurant & Auth APIs)

---

## 🛠️ Key Features

* **Secure Auth:** Firebase-powered OTP authentication with automated session/token handling.
* **Smart Cart:** Advanced quantity logic and removal alerts powered by Redux Listener Middleware.
* **Restaurant Discovery:** High-performance listing using `FlashList` with support for search and category filtering.
* **Global Error Handling:** A centralized "Watcher" using Redux Matchers to catch and toast API failures instantly.
* **Navigation:** Nested navigation stacks for a fluid user journey from Home to Checkout.

---

## 📂 Project Structure

Zwigato utilizes a **Feature-Based Folder Structure**, keeping logic, UI, and state localized to specific domains (e.g., `features/auth`, `features/cart`).

---

## ⚙️ Development Setup

### 1. Start the Mock Restaurant API
Zwigato relies on a local JSON server to simulate real-world backend responses.
```
npm run server
```


2. Install Dependencies
```
npm install
```

# For iOS:
```
cd ios && pod install && cd ..
```

3. Launch the Application
# Android
```
npm run android
```
# iOS
```
npm run ios
```

---

## 📝 Learning Roadmap & Progress

* **Redux Toolkit Architecture** (Slices & Listeners)
* **Firebase OTP Authentication** Integration
* **High-performance Restaurant Listing** (FlashList)
* **Cart Management & Logic**
* **Advanced Search & Multi-Filter Logic** (In Progress)
* **Checkout & Payment Gateway Integration** (Planned)
* **Real-time Push Notification Polish** (Planned)
