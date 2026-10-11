import { useState } from "react"; 
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch"; 
import MenuList from "../components/MenuList";

const SAMPLE = [
  {
    id: 1,
    name: "Kottu Roti",
    price: 750,
    category: "Mains",
    available: true,
  },
  {
    id: 2,
    name: "Fried Rice",
    price: 850,
    category: "Mains",
    available: true,
  },
  {
    id: 3,
    name: "Veg Sub",
    price: 600,
    category: "Snacks",
    available: false,
  },
  {
    id: 4,
    name: "Watalappan",
    price: 350,
    category: "Dessert",
    available: true,
  },
  {
    id: 5,
    name: "Iced Milo",
    price: 300,
    category: "Drinks",
    available: true,
  },
];

  
function MenuPage() { 
  // Search state
  const [query, setQuery] = useState("");

  // Debounce search
  const debounced = useDebounce(query, 400);
  
  // Fetch menu data
  const { data: dishes, isLoading, error } = useFetch("/menu.json"); 
  
  if (isLoading) 
    return <p>Loading menu…</p>;        // 1. loading 
  if (error)     
    return <p>Could not load menu: {error}</p>; // 2. error 

  // Filter fetched data
  const filtered = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(debounced.toLowerCase())
  );
  // 3. success → render search + <MenuList dishes={...} /> 
  return ( 
    <div> 
        <h1>CampusEats DashBoard</h1>
      <input 
        text="text"
        placeholder="Search dishes..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        
      /> 
      <MenuList dishes={filtered} /> 
    </div> 
  ); 
} 
export default MenuPage; 