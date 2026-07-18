const API_BASE = '/api';

// Authentication state listeners
const listeners: Array<(event: string, session: any) => void> = [];

const triggerAuthChange = (event: string, session: any) => {
  listeners.forEach(cb => {
    try {
      cb(event, session);
    } catch (err) {
      console.error("Auth listener error:", err);
    }
  });
};

// Helper for sending requests to local Express API
async function apiRequest(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('freshmart_token');
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.statusText}`);
  }

  return response.json();
}

// Main mock client implementing the Supabase interface
export const supabase = {
  auth: {
    async signUp({ email, password, options }: any) {
      try {
        const displayName = options?.data?.display_name || '';
        const data = await apiRequest('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ email, password, display_name: displayName })
        });
        
        localStorage.setItem('freshmart_token', data.token);
        const session = { access_token: data.token, user: data.user };
        triggerAuthChange('SIGNED_IN', session);
        return { data: { user: data.user, session }, error: null };
      } catch (err: any) {
        return { data: null, error: err };
      }
    },

    async signInWithPassword({ email, password }: any) {
      try {
        const data = await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
        
        localStorage.setItem('freshmart_token', data.token);
        const session = { access_token: data.token, user: data.user };
        triggerAuthChange('SIGNED_IN', session);
        return { data: { user: data.user, session }, error: null };
      } catch (err: any) {
        return { data: null, error: err };
      }
    },

    async signOut() {
      localStorage.removeItem('freshmart_token');
      triggerAuthChange('SIGNED_OUT', null);
      return { error: null };
    },

    async getSession() {
      const token = localStorage.getItem('freshmart_token');
      if (!token) {
        return { data: { session: null }, error: null };
      }
      try {
        const user = await apiRequest('/auth/me');
        const session = { access_token: token, user };
        return { data: { session }, error: null };
      } catch (err: any) {
        localStorage.removeItem('freshmart_token');
        return { data: { session: null }, error: err };
      }
    },

    onAuthStateChange(callback: (event: string, session: any) => void) {
      listeners.push(callback);
      
      // Auto-trigger with initial state on subscribe
      const token = localStorage.getItem('freshmart_token');
      if (token) {
        apiRequest('/auth/me')
          .then(user => callback('INITIAL_SESSION', { access_token: token, user }))
          .catch(() => {
            localStorage.removeItem('freshmart_token');
            callback('INITIAL_SESSION', null);
          });
      } else {
        setTimeout(() => callback('INITIAL_SESSION', null), 0);
      }

      return {
        data: {
          subscription: {
            unsubscribe() {
              const index = listeners.indexOf(callback);
              if (index !== -1) listeners.splice(index, 1);
            }
          }
        }
      };
    }
  },

  from(table: string) {
    return {
      select(fields?: string) {
        return {
          order(field: string, options?: any) {
            // Intercepting SELECT query
            return (async () => {
              try {
                const endpoint = table === 'products' ? '/products' : '/users';
                const data = await apiRequest(endpoint);
                return { data, error: null };
              } catch (err: any) {
                return { data: null, error: err };
              }
            })();
          },
          eq(field: string, value: any) {
            return {
              eq(field2: string, value2: any) {
                return {
                  async maybeSingle() {
                    // Intercepting useAuth admin role check
                    if (table === 'user_roles' && field2 === 'role' && value2 === 'admin') {
                      try {
                        const user = await apiRequest('/auth/me');
                        return { data: user.isAdmin ? { role: 'admin' } : null, error: null };
                      } catch (err: any) {
                        return { data: null, error: err };
                      }
                    }
                    return { data: null, error: null };
                  }
                };
              },
              async maybeSingle() {
                // Intercepting single product lookup by ID
                if (table === 'products' && field === 'id') {
                  try {
                    const data = await apiRequest(`/products/${value}`);
                    return { data, error: null };
                  } catch (err: any) {
                    return { data: null, error: err };
                  }
                }
                return { data: null, error: null };
              }
            };
          }
        };
      },

      // Handle raw object insertions (e.g. products, user admin promotions)
      async insert(row: any) {
        try {
          if (table === 'user_roles') {
            // Promote user to admin
            const userId = row.user_id;
            const data = await apiRequest(`/users/${userId}/promote`, {
              method: 'POST'
            });
            return { data, error: null };
          } else if (table === 'products') {
            // Insert product (fallback if Admin page does not use multipart form data)
            const data = await apiRequest('/products', {
              method: 'POST',
              body: JSON.stringify(row)
            });
            return { data, error: null };
          }
          return { data: null, error: new Error(`Insert not supported on table ${table}`) };
        } catch (err: any) {
          return { data: null, error: err };
        }
      },

      delete() {
        return {
          async eq(field: string, value: any) {
            try {
              if (table === 'products' && field === 'id') {
                const data = await apiRequest(`/products/${value}`, {
                  method: 'DELETE'
                });
                return { data, error: null };
              }
              return { data: null, error: new Error('Delete operation not supported') };
            } catch (err: any) {
              return { data: null, error: err };
            }
          }
        };
      }
    };
  }
};
