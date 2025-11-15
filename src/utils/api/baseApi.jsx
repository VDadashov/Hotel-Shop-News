const BaseApi = "https://api.hotelshop.az/api"; // Fallback default

// API utility functions for multilingual support
export const createApiHeaders = (language = "az") => {
  return {
    "Accept-Language": language,
    "Content-Type": "application/json",
  };
};

// Generic API fetch function with multilingual support
export const apiFetch = async (endpoint, options = {}, language = "az") => {
  const url = `${BaseApi}${endpoint}`;
  const headers = {
    ...createApiHeaders(language),
    ...options.headers,
  };

  console.log("API Request:", {
    url,
    headers,
    language
  });

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API fetch error for ${endpoint}:`, error);
    throw error;
  }
};

// Specific API functions for common endpoints
export const apiEndpoints = {
  getTrendingProducts: (language = "az") => 
    apiFetch("/trending", {}, language),
  
  getTestimonials: (language = "az") => 
    apiFetch("/testimonials", {}, language),
  
  getBestSellers: (ids, language = "az") => 
    apiFetch(`/bestseller/${ids}`, {}, language),
  
  getSettings: (key, language = "az") => 
    apiFetch(`/settings/${key}`, {}, language),
  
  getProducts: (params = {}, language = "az") => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/products?${queryString}` : "/products";
    return apiFetch(endpoint, {}, language);
  },
  
  getProductById: (id, language = "az", allLanguages = false) => {
    const params = allLanguages ? "?allLanguages=true" : "";
    return apiFetch(`/products/${id}${params}`, {}, language);
  },

  //Contact endpoints
  submitContactForm: (data, language = "az") => 
    apiFetch("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }, language),
  
  // Category endpoints
  getCategoriesMenu: (language = "az") => 
    apiFetch("/categories/menu", {}, language),
  
  // Cart endpoints
  createCart: (items, language = "az") => 
    apiFetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({ items }),
    }, language),
  
  getCartItems: (token, page = 1, limit = 8, language = "az") => 
    apiFetch(`/cart/items?token=${token}&page=${page}&limit=${limit}`, {}, language),
  
  confirmCart: (token, language = "az") => 
    apiFetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({ token, isConfirmed: true }),
    }, language),
  
  // FAQ endpoints
  getFaqs: (language = "az") => 
    apiFetch("/faqs", {}, language),
  
  // Brand endpoints
  getBrands: (params = {}, language = "az") => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/brands?${queryString}` : "/brands";
    return apiFetch(endpoint, {}, language);
  },
  
  // Promo endpoints
  getPromos: (language = "az") => 
    apiFetch("/promos", {}, language),
  
  // Section endpoints
  getSections: (type, language = "az") => 
    apiFetch(`/sections?type=${type}`, {}, language),
};

export default BaseApi;
