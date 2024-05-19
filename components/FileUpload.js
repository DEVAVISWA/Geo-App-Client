import { useState } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://127.0.0.1:3001/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json()
    if (res.status==200) {
      alert('File uploaded');
    } else {
      alert('Error uploading file');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}