"use client";

import { useState } from "react";
import ItemForm from "@/components/ItemForm";
import ItemList from "@/components/ItemList";

export interface Item {
  id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Omit<Item, "id">) => {
    const newItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    };
    setItems([...items, newItem]);
  };

  const updateItem = (updatedItem: Item) => {
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">CRUD Operations Demo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ItemForm onSubmit={addItem} />
        <ItemList items={items} onUpdate={updateItem} onDelete={deleteItem} />
      </div>
    </main>
  );
}
