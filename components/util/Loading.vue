<!-- components/Loading.vue -->
<template>
    <div class="loading" :class="{ 'loading-small': size === 'small', 'loading-medium': size === 'medium', 'loading-large': size === 'large' }">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      size: {
        type: String,
        default: 'medium', // Default size is medium
        validator: (value) => ['small', 'medium', 'large'].includes(value),
      },
    },
  };
  </script>
  
  <style scoped>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
    
  .spinner {
    border: 4px solid #c0c0c0;
    border-top: 4px solid #ffffff;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }
  
  .loading-small .spinner {
    width: 16px;
    height: 16px;
  }
  
  .loading-large .spinner {
    width: 32px;
    height: 32px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  