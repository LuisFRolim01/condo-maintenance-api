import { useEffect, useState } from 'react';
import AreaList from './components/AreaList';
import MaintenanceList from './components/MaintenanceList';

interface Area {
  id: number;
  name: string;
  description: string;
  email: string;
}

function App() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/area')
      .then((res) => res.json())
      .then((data) => setAreas(data))
      .catch((err) => console.error('Erro ao buscar áreas:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Condomínio Maintenance
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <AreaList
          areas={areas}
          selectedAreaId={selectedAreaId}
          onSelectArea={setSelectedAreaId}
        />
        {selectedAreaId && <MaintenanceList areaId={selectedAreaId} />}
      </div>
    </div>
  );
}

export default App;
