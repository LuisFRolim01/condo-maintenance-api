import React from 'react';

interface Area {
  id: number;
  name: string;
  description: string;
  email: string;
}

interface Props {
  areas: Area[];
  selectedAreaId: number | null;
  onSelectArea: (id: number) => void;
}

const AreaList: React.FC<Props> = ({ areas, selectedAreaId, onSelectArea }) => {
  if (areas.length === 0) {
    return (
      <div className="w-full md:w-1/3 bg-white p-4 rounded shadow">
        <p className="text-gray-500">Nenhuma área cadastrada</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/3 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Áreas</h2>
      <ul className="space-y-3">
        {areas.map((area) => (
          <li
            key={area.id}
            onClick={() => onSelectArea(area.id)}
            className={`cursor-pointer p-3 rounded border ${
              selectedAreaId === area.id
                ? 'bg-blue-100 border-blue-400'
                : 'hover:bg-gray-100 border-gray-200'
            }`}
          >
            <p className="font-bold text-gray-800">{area.name}</p>
            <p className="text-gray-600 text-sm">{area.description}</p>
            <p className="text-gray-500 text-xs">{area.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AreaList;
