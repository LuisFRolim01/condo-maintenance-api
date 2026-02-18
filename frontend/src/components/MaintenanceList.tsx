import React, { useEffect, useState } from 'react';

interface Maintenance {
  id: number;
  type: string;
  nextMaintenanceDate: string;
  daysRemaining: number;
  status: 'OK' | 'UPCOMING' | 'OVERDUE';
}

interface Props {
  areaId: number;
}

const MaintenanceList: React.FC<Props> = ({ areaId }) => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

  useEffect(() => {
    fetch(`/api/maintenance/upcoming?areaId=${areaId}`)
      .then((res) => res.json())
      .then((data) => setMaintenances(data))
      .catch((err) => console.error('Erro ao buscar manutenções:', err));
  }, [areaId]);

  if (maintenances.length === 0) {
    return (
      <div className="flex-1 bg-white p-4 rounded shadow">
        <p className="text-gray-500">Nenhuma manutenção pendente para esta área</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Manutenções</h2>
      <ul className="space-y-3">
        {maintenances.map((m) => (
          <li
            key={m.id}
            className={`p-3 rounded border ${
              m.status === 'OVERDUE'
                ? 'bg-red-100 border-red-400'
                : 'bg-yellow-100 border-yellow-400'
            }`}
          >
            <p className="font-bold text-gray-800">{m.type}</p>
            <p className="text-gray-600 text-sm">
              Próxima manutenção: {new Date(m.nextMaintenanceDate).toLocaleDateString()} ({m.daysRemaining} dias)
            </p>
            <p
              className={`font-semibold ${
                m.status === 'OVERDUE' ? 'text-red-600' : 'text-yellow-700'
              }`}
            >
              {m.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceList;
