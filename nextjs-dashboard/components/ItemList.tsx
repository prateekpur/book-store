'use client'

import { useState } from 'react'

interface ItemListProps {
  items: Item[]
  onUpdate: (item: Item) => void
  onDelete: (id: string) => void
}

interface Item {
    id: string
    title: string
    description: string
  }

export default function ItemList({ items, onUpdate, onDelete }: ItemListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const startEdit = (item: Item) => {
    setEditingId(item.id)
    setEditTitle(item.title)
    setEditDescription(item.description)
  }

  const saveEdit = (id: string) => {
    onUpdate({
      id,
      title: editTitle,
      description: editDescription
    })
    setEditingId(null)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Items List</h2>
      {items.map(item => (
        <div key={item.id} className="p-4 bg-white rounded-lg shadow">
          {editingId === item.id ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="space-x-2">
                <button
                  onClick={() => saveEdit(item.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => startEdit(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 