import { useRef, useState } from 'react';
import API from '../services/api';

function UploadPoster() {
  const [category, setCategory] = useState('');
  const [positions, setPositions] = useState([
    { id: 'text1', text: 'Your Name', top: 50, left: 50, width: 150, height: 40 },
    { id: 'text2', text: 'Business Name', top: 120, left: 120, width: 200, height: 50 },
  ]);
  const [draggingId, setDraggingId] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (id) => (e) => {
    setDraggingId(id);
  };

  const handleMouseMove = (e) => {
    if (!draggingId) return;

    const container = e.currentTarget.getBoundingClientRect();
    const newPositions = positions.map((pos) => {
      if (pos.id === draggingId) {
        return {
          ...pos,
          left: e.clientX - container.left - pos.width / 2,
          top: e.clientY - container.top - pos.height / 2,
        };
      }
      return pos;
    });
    setPositions(newPositions);
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', category);
    formData.append('positions', JSON.stringify(positions));
    formData.append('image', image);

    try {
      await API.post('/posters/upload', formData);
      alert('Poster uploaded successfully!');
      setCategory('');
      setImage(null);
      setPreview('');
      setPositions([
        { id: 'text1', text: 'Your Name', top: 50, left: 50, width: 150, height: 40 },
        { id: 'text2', text: 'Business Name', top: 120, left: 120, width: 200, height: 50 },
      ]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Upload Poster</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <select value={category} onChange={(e) => setCategory(e.target.value)} required className="input">
          <option value="">Select Category</option>
          <option value="offers">Offers</option>
          <option value="events">Events</option>
          <option value="festivals">Festivals</option>
        </select>

        <input 
          type="file" 
          onChange={handleImageChange} 
          ref={fileInputRef} 
          accept="image/*"
          className="input"
          required
        />

        {preview && (
          <div 
            className="relative w-full h-[400px] border overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            {/* Text Positions */}
            {positions.map((item) => (
              <div 
                key={item.id}
                className="absolute bg-white bg-opacity-50 border p-1 cursor-move text-xs"
                style={{ top: item.top, left: item.left, width: item.width, height: item.height }}
                onMouseDown={handleMouseDown(item.id)}
              >
                {item.text}
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="btn">Upload</button>
      </form>
    </div>
  );
}

export default UploadPoster;
