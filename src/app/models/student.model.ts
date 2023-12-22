import { Mark } from "./mark.model";

export interface Student {
  id: number;
  nom: string;
  prenom: string;
  niveau: string;
  marks?: Mark[];
}
