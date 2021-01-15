
import axios from 'axios';

export const uploadAction = async (image) => {
  //el HTML requerido para generar la funcionalidad de Multer es incompatible con la sintaxis jsx
  //por eso se genera un Form por una funcionan, se agrega una propiedad con value y por header le asignamos el tipo
  // de upload que va a ejecutar, en este caso multiples archivos
  const fd = new FormData();
  fd.append('image', image);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/multer/subir`, fd, config);
  } catch (err) {
    console.log(err);
  }
}