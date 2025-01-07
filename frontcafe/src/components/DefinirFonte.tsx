import { useState } from "react";

export default function DefinirFonte() {
  const [font, setFont] = useState("sans");

  const handleFontChange = (value: string) => {
    setFont(value);
  };

  return (
    <div className="p-4">
      <label htmlFor="font-select" className="block mb-2 text-sm font-medium">
        Escolha o tipo de fonte:
      </label>
      <select
        id="font-select"
        onChange={(e) => handleFontChange(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="sans">Sans-serif</option>
        <option value="serif">Serif</option>
        <option value="mono">Monospace</option>
      </select>

      {/* Área de pré-visualização com a fonte aplicada */}
      <div
        className={`mt-4 p-4 border rounded bg-gray-50 font-${font}`}
        style={{ minHeight: "100px" }}
      >
        <p className="text-lg">
          Esta é uma pré-visualização com a fonte selecionada: <strong>{font}</strong>.
        </p>
      </div>
    </div>
  );
}
