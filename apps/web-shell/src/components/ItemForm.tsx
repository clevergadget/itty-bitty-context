import React, { useState, useEffect } from 'react';
import type { CreateItemDto, Item } from '@/contracts';
import styles from './ItemForm.module.css';

interface ItemFormProps {
  onSubmit: (item: CreateItemDto) => Promise<void>;
  onCancel?: () => void;
  initialData?: Item;
  isLoading?: boolean;
}

export const ItemForm: React.FC<ItemFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreateItemDto>({
    name: '',
    description: ''
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description
      });
    } else {
      setFormData({ name: '', description: '' });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }
    
    try {
      await onSubmit(formData);
      
      // Reset form only if it's a create form (no initial data)
      if (!initialData) {
        setFormData({ name: '', description: '' });
      }
    } catch {
      // Error handling is done by parent component
    }
  };

  const handleChange = (field: keyof CreateItemDto) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Name *</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          disabled={isLoading}
          placeholder="Enter item name"
          className={styles.input}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange('description')}
          disabled={isLoading}
          placeholder="Enter item description"
          rows={3}
          className={styles.textarea}
        />
      </div>
      
      <div className={styles.buttonGroup}>
        <button 
          type="submit" 
          disabled={isLoading || !formData.name.trim()}
          className={styles.submitButton}
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Item' : 'Create Item'}
        </button>
        
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            disabled={isLoading}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
