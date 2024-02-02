import conf from "@/conf/config";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient);

export class appwriteService {
  // Create a new urecord of user inside appwrite
  static async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  // Login user
  static async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  static async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error) {}
    return false;
  }

  static async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.log("Error in getCurrentUser: ", error);
    }
    return null;
  }

  static async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.log("Error in logout: ", error);
    }
  }
}

export default appwriteService;
