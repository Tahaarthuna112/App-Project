import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Leaf } from 'lucide-react';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [cart, setCart] = useState({});

  // Plant data organized by categories
  const plantCategories = {
    'Aromatic Plants': [
      {
        id: 1,
        name: 'African Violet',
        price: 25.99,
        image: '/images/africaviolet.jpg',
        description: 'Beautiful purple flowering plant with velvety leaves. Perfect for indoor spaces with bright, indirect light.'
      },
      {
        id: 2,
        name: 'Aloe Vera',
        price: 18.99,
        image: '/images/aloevera.jpg',
        description: 'Succulent plant known for its healing properties. Low maintenance and perfect for beginners.'
      },
      {
        id: 3,
        name: 'Echeveria',
        price: 15.99,
        image: '/images/echeveria.jpg',
        description: 'Stunning rosette-shaped succulent with blue-green leaves. Drought tolerant and easy to care for.'
      }
    ],
    'Medicinal Plants': [
      {
        id: 4,
        name: 'Fiddle Leaf Fig',
        price: 89.99,
        image: '/images/fiddleleaffig.jpg',
        description: 'Large, glossy leaves make this a stunning statement plant. Requires bright, indirect light.'
      },
      {
        id: 5,
        name: 'Jade Plant',
        price: 22.99,
        image: '/images/jadeplant.jpg',
        description: 'Symbol of good luck and prosperity. Thick, fleshy leaves store water, making it very low maintenance.'
      },
      {
        id: 6,
        name: 'Monstera',
        price: 45.99,
        image: '/images/monstera.jpg',
        description: 'Iconic split-leaf plant that adds tropical vibes to any room. Easy to grow and propagate.'
      }
    ],
    'Exotic Plants': [
      {
        id: 7,
        name: 'Orchid',
        price: 35.99,
        image: '/images/orchid.jpg',
        description: 'Elegant flowering plant with long-lasting blooms. Perfect for adding sophistication to your home.'
      },
      {
        id: 8,
        name: 'Snake Plant',
        price: 28.99,
        image: '/images/snakeplant.jpg',
        description: 'Air-purifying plant with striking upright leaves. Extremely low maintenance and tolerates low light.'
      },
      {
        id: 9,
        name: 'Bird of Paradise',
        price: 65.99,
        image: '/images/birdofparadise.jpg',
        description: 'Tropical plant with large paddle-shaped leaves and striking orange-blue flowers. Makes a bold statement piece.'
      }
    ]
  };

  // Get total cart quantity
  const getTotalQuantity = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  // Get total cart cost
  const getTotalCost = () => {
    let total = 0;
    Object.entries(cart).forEach(([plantId, quantity]) => {
      const plant = findPlantById(parseInt(plantId));
      if (plant) {
        total += plant.price * quantity;
      }
    });
    return total;
  };

  // Find plant by ID
  const findPlantById = (id) => {
    for (const category of Object.values(plantCategories)) {
      const plant = category.find(p => p.id === id);
      if (plant) return plant;
    }
    return null;
  };

  // Add to cart
  const addToCart = (plantId) => {
    setCart(prev => ({
      ...prev,
      [plantId]: (prev[plantId] || 0) + 1
    }));
  };

  // Update cart quantity
  const updateCartQuantity = (plantId, newQuantity) => {
    if (newQuantity <= 0) {
      const newCart = { ...cart };
      delete newCart[plantId];
      setCart(newCart);
    } else {
      setCart(prev => ({
        ...prev,
        [plantId]: newQuantity
      }));
    }
  };

  // Remove from cart
  const removeFromCart = (plantId) => {
    const newCart = { ...cart };
    delete newCart[plantId];
    setCart(newCart);
  };

  // Navigation component
  const Navigation = () => (
    <nav className="bg-green-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Paradise Nursery</h1>
        </div>
        <div className="flex space-x-6">
          <button 
            onClick={() => setCurrentPage('landing')}
            className={`hover:text-green-200 transition-colors ${currentPage === 'landing' ? 'text-green-200' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('products')}
            className={`hover:text-green-200 transition-colors ${currentPage === 'products' ? 'text-green-200' : ''}`}
          >
            Plants
          </button>
          <button 
            onClick={() => setCurrentPage('cart')}
            className={`flex items-center space-x-2 hover:text-green-200 transition-colors relative ${currentPage === 'cart' ? 'text-green-200' : ''}`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
            {getTotalQuantity() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cart-badge-pulse">
                {getTotalQuantity()}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );

  // Landing page component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 fade-in">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-8">
            <Leaf className="h-24 w-24 text-green-600 mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-green-800 mb-4">Welcome to Paradise Nursery</h1>
            <p className="text-xl text-green-700 mb-8">Where Green Dreams Come True</p>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
              Discover our extensive collection of beautiful house plants that will transform your living space 
              into a green paradise. From aromatic herbs to exotic succulents, we have the perfect plants 
              to brighten your home and purify your air.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Premium Quality</h3>
              <p className="text-gray-600">Hand-selected plants from trusted growers, ensuring the highest quality for your home.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Expert Care Guides</h3>
              <p className="text-gray-600">Detailed care instructions included with every plant to help you succeed as a plant parent.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Quick and safe delivery to ensure your plants arrive healthy and ready to thrive.</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('products')}
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Shop Our Plants
          </button>
        </div>
      </div>
    </div>
  );

  // Plant card component
  const PlantCard = ({ plant }) => {
    const [imageError, setImageError] = useState(false);
    
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 plant-card">
        <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
          {!imageError ? (
            <img
              src={process.env.PUBLIC_URL + plant.image}
              alt={plant.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <Leaf className="h-24 w-24 text-green-600" />
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{plant.name}</h3>
          <p className="text-gray-600 mb-4 text-sm">{plant.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-green-600">${plant.price}</span>
            <button
              onClick={() => addToCart(plant.id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Products page component
  const ProductsPage = () => (
    <div className="min-h-screen bg-gray-50 fade-in">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Our Plant Collection</h1>
          <p className="text-lg text-gray-700">Choose from our carefully curated selection of house plants</p>
        </div>

        {Object.entries(plantCategories).map(([categoryName, plants]) => (
          <div key={categoryName} className="mb-16">
            <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">{categoryName}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plants.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Cart item component
  const CartItem = ({ plant, quantity }) => {
    const [imageError, setImageError] = useState(false);
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {!imageError ? (
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover rounded-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            <Leaf className="h-8 w-8 text-green-600" />
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{plant.name}</h3>
          <p className="text-gray-600">${plant.price} each</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateCartQuantity(plant.id, quantity - 1)}
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
          <button
            onClick={() => updateCartQuantity(plant.id, quantity + 1)}
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-green-600">${(plant.price * quantity).toFixed(2)}</p>
          <button
            onClick={() => removeFromCart(plant.id)}
            className="text-red-500 hover:text-red-700 mt-2 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  // Cart page component
  const CartPage = () => {
    const cartItems = Object.entries(cart).map(([plantId, quantity]) => ({
      plant: findPlantById(parseInt(plantId)),
      quantity
    })).filter(item => item.plant);

    if (cartItems.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center fade-in">
          <div className="text-center">
            <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <button
              onClick={() => setCurrentPage('products')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 fade-in">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-green-800 mb-8">Shopping Cart</h1>
          
          <div className="space-y-4 mb-8">
            {cartItems.map(({ plant, quantity }) => (
              <CartItem key={plant.id} plant={plant} quantity={quantity} />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center text-2xl font-bold text-green-800 mb-6">
              <span>Total: ${getTotalCost().toFixed(2)}</span>
              <span>Items: {getTotalQuantity()}</span>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('products')}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Continue Shopping</span>
              </button>
              <button
                onClick={() => alert('Thank you for shopping at Paradise Nursery! Checkout functionality would be implemented here.')}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'products' && <ProductsPage />}
      {currentPage === 'cart' && <CartPage />}
    </div>
  );
};

export default App;