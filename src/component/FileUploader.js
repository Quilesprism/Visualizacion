import React, { useState } from 'react'; 

const FileUploader = () => {
  const [file, setFile] = useState(null); 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUploadClick = () => {
    if (!file) {
      alert('Primero selecciona un archivo');
      return;
    }

    console.log('Archivo seleccionado:', file);
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Éxito:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Subir archivo</button>
    </div>
  );
};

export default FileUploader;
