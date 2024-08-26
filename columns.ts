"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface newUserData {
    Firstname: string;
    Lastname: string;
    Email: string;  
    Country: string;
    Employment: string;
     // Use 'string' or 'Date' depending on how you parse it
    
  }

export const columns: ColumnDef<newUserData>[] = [
  {
    accessorKey: "Firstname",
    header: "Firstname",
  },
  {
    accessorKey: "Lastname",
    header: "Lastname",
  },
  {
    accessorKey: "Email",
    header: "Email",
  },

  {
    accessorKey: "Country",
    header: "Country",
  },

  {
    accessorKey: "Employment",
    header: "Employment",
  },
]
