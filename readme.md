# 🛒 React Native E-Commerce App

A simple mock e-commerce app built with **React Native** (using **Expo**) for the React Native Developer Assignment.

## 📱 Overview

This application demonstrates a basic yet functional e-commerce flow, from browsing products to placing an order. It uses **mock data** to simulate a real-world shopping experience.

### 🔧 Core Features Implemented:

1. **Home Screen**

   - Banner/Carousel showcasing promotions
   - Multiple horizontal product carousels (e.g., “Best Sellers”, “New Arrivals”)
   - Tags like `Free Delivery`, `Selling Fast` for visual appeal
2. **Search Screen**

   - Top search bar
   - Real-time product filtering from mock data
3. **Product Details Screen**

   - Slider of product images
   - Product name, description, price
   - Add to cart / Remove from cart functionality
   - Persistent cart button in bottom tab
4. **Cart Screen**

   - List of products added to cart
   - Increase/decrease quantity
   - Remove item from cart
   - Total price summary
   - “Checkout” button navigation
5. **Cart Review Screen**

   - Itemized summary of cart
   - Selected payment method (mocked)
   - Subtotal, tax, total
   - "Place Order" button
6. **Order Confirmation Screen**

   - Success message and checkmark icon
   - Button to return to Home screen

### 🧪 Additional Screens (Bonus):

- **Profile Screen**
- **Wishlist Screen**
- **Notifications Screen**

These were added to simulate a more complete app experience.

---

## 🧠 Technical Highlights

- **State Management**:Used `useState`, `useEffect` and context-based cart logic to manage product and cart state.
- **Animation**:Used **React Native Reanimated** and **React Native's built-in Animated API** to demonstrate knowledge of both libraries for UI transitions and effects.
- **Navigation**:React Navigation for stack and tab navigators.
- **Mock Data**:All product data, banners, and user information is mocked locally (due to lack of static APIs). Simulated API-like behavior with `Promise` and artificial delays for loading states.
- **Styling**:Clean, minimal, mobile-friendly UI using StyleSheet and conditional styling based on state.
- **Development Platform**:
  Built using **Expo** for faster prototyping and ease of testing.

---

## 🧪 Future Improvements (If Given More Time)

- ✅ Unit tests using Jest and React Native Testing Library
- ✅ Responsive image loading with placeholders
- ✅ Better state management using Redux Toolkit or Zustand
- ✅ Persisting cart data using AsyncStorage
- ✅ Add animation to cart interactions (drag to delete, etc.)
- ✅ Integration of deep links for product sharing

---

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone <repo>
   cd <app-folder>
   ```
