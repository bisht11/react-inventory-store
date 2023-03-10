import "./App.css";
import { useRef, useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  // Refs here
  let itemName = useRef();
  let itemQuantity = useRef();
  useEffect(() => {
    itemName.current.focus(); // focus on this item when page loads
  }, []);

  // item change handler
  function handleItemChange(event) {
    setNewItem(event.target.value);
  }

  // item quantity change handler
  function handleQuantityChange(event) {
    setNewQuantity(event.target.value);
  }

  // submit handler
  function handleSubmit(event) {
    event.preventDefault();
    if (currentIndex >= 0) {
      const updateItem = [...items];
      updateItem[currentIndex] = { item: newItem, quantity: newQuantity };
      setItems(updateItem);
      setCurrentIndex(-1);
    } else {
      if (itemName.current.value === "" || itemQuantity.current.value === "") {
        window.alert("Add item name and quantity");
      } else {
        setItems([...items, { item: newItem, quantity: newQuantity }]);
      }
      setNewItem("");
      setNewQuantity("");
    }
  }

  function handleDelete(index) {
    window.confirm("Delete item?") &&
      setItems(items.filter((item, idx) => idx !== index));
  }

  function handleEdit(index) {
    setCurrentIndex(index);
    const { item, quantity } = items[index];
    setNewItem(item);
    setNewQuantity(quantity);
  }

  return (
    <div className="container">
      <h1 className="title text-center">Inventory Items</h1>
      <form
        className="d-flex"
        style={{ justifyContent: "center" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group m-1">
          <input
            type="text"
            placeholder="Item name"
            style={{ border: "1px solid #7633f9" }}
            ref={itemName}
            value={newItem}
            onChange={handleItemChange}
          />
        </div>
        <div className="form-group m-1">
          <input
            type="text"
            placeholder="Item quantity"
            style={{ border: "1px solid #7633f9" }}
            ref={itemQuantity}
            value={newQuantity}
            onChange={handleQuantityChange}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          {currentIndex >= 0 ? "Save" : "Add"}
        </button>
      </form>

      <ul className="container text-left" style={{ width: 420 }}>
        {items.map((item, index) => (
          <li
            key={index}
            className="d-flex space-between mb-1"
            style={{ borderBottom: "1px solid #333" }}
          >
            {item.item} ({item.quantity})
            <div>
              <button className="btn btn-sm" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(index)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
