import {auth} from "@/infrastructure/firebase";
import {AuthRepository} from "./auth";

export const authRepo = new AuthRepository(auth);
