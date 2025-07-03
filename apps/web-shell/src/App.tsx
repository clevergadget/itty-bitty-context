import { useState, useEffect } from 'react'
import type { Item, CreateItemDto } from '@/contracts'
import { apiService } from './services/api'
import { ItemForm } from './components/ItemForm'
import styles from './App.module.css'

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load items on mount
  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await apiService.getItems()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (itemData: CreateItemDto) => {
    try {
      setError(null)
      const newItem = await apiService.createItem(itemData)
      setItems(prev => [...prev, newItem])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item')
    }
  }

  const handleUpdate = async (itemData: CreateItemDto) => {
    if (!editingItem) return

    try {
      setError(null)
      const updatedItem = await apiService.updateItem(editingItem.id, itemData)
      setItems(prev => prev.map(item => 
        item.id === editingItem.id ? updatedItem : item
      ))
      setEditingItem(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      setError(null)
      await apiService.deleteItem(id)
      setItems(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item')
    }
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Items Management</h1>
        <p>Itty Bitty Context - AI-Friendly Template</p>
      </header>

      <main className={styles.main}>
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <section className={styles.formSection}>
          <h2>{editingItem ? 'Edit Item' : 'Create New Item'}</h2>
          <ItemForm
            initialData={editingItem || undefined}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onCancel={editingItem ? () => setEditingItem(null) : undefined}
          />
        </section>

        <section className={styles.listSection}>
          <h2>Items List</h2>
          
          {loading ? (
            <div className={styles.loading}>Loading items...</div>
          ) : items.length === 0 ? (
            <div className={styles.empty}>No items found. Create your first item above!</div>
          ) : (
            <div className={styles.itemsList}>
              {items.map(item => (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.itemContent}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <small>Created: {new Date(item.createdAt).toLocaleDateString()}</small>
                  </div>
                  <div className={styles.itemActions}>
                    <button 
                      onClick={() => setEditingItem(item)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
