import { type User, type InsertUser, type Route, type InsertRoute, type UserFavorite, type InsertUserFavorite } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Routes
  getRoutes(): Promise<Route[]>;
  getRoute(id: string): Promise<Route | undefined>;
  createRoute(route: InsertRoute): Promise<Route>;
  
  // User Favorites
  getUserFavorites(userId: string): Promise<UserFavorite[]>;
  addUserFavorite(favorite: InsertUserFavorite): Promise<UserFavorite>;
  removeUserFavorite(userId: string, routeId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private routes: Map<string, Route>;
  private userFavorites: Map<string, UserFavorite>;

  constructor() {
    this.users = new Map();
    this.routes = new Map();
    this.userFavorites = new Map();
    
    // Initialize with dummy routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const dummyRoutes: InsertRoute[] = [
      {
        number: "Route #42",
        fromLocation: "Chandigarh",
        toLocation: "Mohali",
        duration: "25 min",
        distance: "12.5 km",
        seats: "24 seats",
        status: "Active",
        category: ["popular"]
      },
      {
        number: "Route #108",
        fromLocation: "Gurudwara Sahib",
        toLocation: "Golden Temple",
        duration: "45 min",
        distance: "18.2 km",
        seats: "30 seats",
        status: "En Route",
        category: ["religious"]
      },
      {
        number: "Route #156",
        fromLocation: "Ludhiana",
        toLocation: "Delhi",
        duration: "180 min",
        distance: "95.4 km",
        seats: "40 seats",
        status: "Delayed",
        category: ["highway", "popular"]
      }
    ];

    dummyRoutes.forEach(route => {
      const id = randomUUID();
      const fullRoute: Route = {
        id,
        number: route.number,
        fromLocation: route.fromLocation,
        toLocation: route.toLocation,
        duration: route.duration,
        distance: route.distance,
        seats: route.seats,
        status: route.status,
        category: route.category,
        createdAt: new Date()
      };
      this.routes.set(id, fullRoute);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.phone === phone,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Routes
  async getRoutes(): Promise<Route[]> {
    return Array.from(this.routes.values());
  }

  async getRoute(id: string): Promise<Route | undefined> {
    return this.routes.get(id);
  }

  async createRoute(insertRoute: InsertRoute): Promise<Route> {
    const id = randomUUID();
    const route: Route = {
      id,
      number: insertRoute.number,
      fromLocation: insertRoute.fromLocation,
      toLocation: insertRoute.toLocation,
      duration: insertRoute.duration,
      distance: insertRoute.distance,
      seats: insertRoute.seats,
      status: insertRoute.status,
      category: insertRoute.category,
      createdAt: new Date()
    };
    this.routes.set(id, route);
    return route;
  }

  // User Favorites
  async getUserFavorites(userId: string): Promise<UserFavorite[]> {
    return Array.from(this.userFavorites.values()).filter(
      (favorite) => favorite.userId === userId
    );
  }

  async addUserFavorite(insertFavorite: InsertUserFavorite): Promise<UserFavorite> {
    const id = randomUUID();
    const favorite: UserFavorite = {
      ...insertFavorite,
      id,
      createdAt: new Date()
    };
    this.userFavorites.set(id, favorite);
    return favorite;
  }

  async removeUserFavorite(userId: string, routeId: string): Promise<void> {
    const favoriteToRemove = Array.from(this.userFavorites.entries()).find(
      ([, favorite]) => favorite.userId === userId && favorite.routeId === routeId
    );
    
    if (favoriteToRemove) {
      this.userFavorites.delete(favoriteToRemove[0]);
    }
  }
}

export const storage = new MemStorage();
