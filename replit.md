# Overview

Punjab Transport is a mobile-first passenger transport app built with React, Vite, TypeScript, and TailwindCSS. The application serves as a comprehensive platform for managing bus routes, user authentication, and transport services similar to Uber/Ola but focused on public transportation in Punjab. The app features a modern design system with Punjab-specific branding colors (Primary Blue, Punjab Saffron, Punjab Green) and supports both light and dark themes.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a modern React-based architecture with the following key decisions:

- **React + Vite**: Chosen for fast development and build times with hot module replacement
- **TypeScript**: Provides type safety and better developer experience
- **Wouter**: Lightweight routing library instead of React Router for minimal bundle size
- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Shadcn/ui**: Component library built on Radix UI primitives for consistent, accessible components

## State Management
- **React Context API**: Used for global app state (user data, favorites, loading states)
- **TanStack Query**: Handles server state, caching, and API interactions
- **Local Storage**: Persists user authentication and theme preferences

## Design System
- **Color Palette**: Primary Blue (#1976D2), Punjab Saffron (#FF6B35), Punjab Green (#059669)
- **Typography**: Inter font family for clean, modern text rendering
- **Responsive Design**: Mobile-first approach with desktop compatibility
- **Dark Mode**: System-level theme detection with manual toggle support

## Backend Architecture
The backend follows a REST API pattern:

- **Express.js**: Web application framework for handling HTTP requests
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **Schema Validation**: Zod schemas for request/response validation
- **Memory Storage**: In-memory storage implementation for development with interface for easy database migration

## Database Schema
- **Users**: Basic user information with phone-based authentication
- **Routes**: Transport route details including origin, destination, duration, and categories
- **User Favorites**: Many-to-many relationship between users and their favorite routes

## Authentication
- **Phone-based Auth**: SMS OTP verification workflow (mock implementation)
- **Session Storage**: No complex JWT implementation, relies on simple state management

# External Dependencies

## Core Technologies
- **React 18**: Frontend framework with modern hooks and concurrent features
- **Vite**: Build tool and development server
- **TypeScript**: Static typing system
- **Node.js**: Runtime environment for the backend server

## UI/UX Libraries
- **TailwindCSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for creating type-safe component variants

## Database & ORM
- **Drizzle ORM**: Type-safe database toolkit
- **Drizzle Kit**: Database migration and schema management
- **PostgreSQL**: Primary database (configured but may use other databases)
- **Neon Database**: Serverless PostgreSQL provider

## Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Integration**: Development environment plugins for enhanced debugging

## State Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Hookform Resolvers**: Integration with validation libraries

The architecture prioritizes developer experience, type safety, and modern web standards while maintaining a clean separation between frontend and backend concerns.