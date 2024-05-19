"use client"
import FileUpload from '@/components/FileUpload';
import Map from '@/components/Map';

const Home = () => {
  return (
    <div>
      <h1>Geospatial Data Management</h1>
      <FileUpload />
      <Map />
    </div>
  );
};

export default Home;