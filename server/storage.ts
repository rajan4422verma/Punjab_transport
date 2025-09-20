import { users, routes, userFavorites, type User, type InsertUser, type Route, type InsertRoute, type UserFavorite, type InsertUserFavorite } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize with dummy routes on first run
    this.initializeRoutes();
  }

  private async initializeRoutes() {
    try {
      // Check if routes already exist
      const existingRoutes = await db.select().from(routes);
      if (existingRoutes.length > 0) {
        return; // Routes already initialized
      }

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

      await db.insert(routes).values(dummyRoutes);
    } catch (error) {
      console.log('Routes may already be initialized or error occurred:', error);
    }
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.phone, phone));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Routes
  async getRoutes(): Promise<Route[]> {
    return await db.select().from(routes);
  }

  async getRoute(id: string): Promise<Route | undefined> {
    const [route] = await db.select().from(routes).where(eq(routes.id, id));
    return route || undefined;
  }

  async createRoute(insertRoute: InsertRoute): Promise<Route> {
    const [route] = await db
      .insert(routes)
      .values(insertRoute)
      .returning();
    return route;
  }

  // User Favorites
  async getUserFavorites(userId: string): Promise<UserFavorite[]> {
    return await db
      .select()
      .from(userFavorites)
      .where(eq(userFavorites.userId, userId));
  }

  async addUserFavorite(insertFavorite: InsertUserFavorite): Promise<UserFavorite> {
    const [favorite] = await db
      .insert(userFavorites)
      .values(insertFavorite)
      .returning();
    return favorite;
  }

  async removeUserFavorite(userId: string, routeId: string): Promise<void> {
    await db
      .delete(userFavorites)
      .where(
        and(
          eq(userFavorites.userId, userId),
          eq(userFavorites.routeId, routeId)
        )
      );
  }
}

export const storage = new DatabaseStorage();
