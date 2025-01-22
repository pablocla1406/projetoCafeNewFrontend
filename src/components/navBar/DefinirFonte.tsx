
interface DefinirFonteProps {
  setFont: string;
  setTempFont: (font: string) => void;
}

export default function DefinirFonte({ setFont, setTempFont }: DefinirFonteProps) {
  const handleFontChange = (value: string) => {
    setTempFont(value);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="font-select" className="block text-sm font-medium">
        Escolha o tipo de fonte:
      </label>
      <select
        id="font-select"
        value={setFont}
        onChange={(e) => handleFontChange(e.target.value)}
        className="w-full p-2 border rounded bg-background text-foreground"
      >
        <option value="sans">Sans-serif</option>
        <option value="serif">Serif</option>
        <option value="mono">Monospace</option>
        <option value="roboto">Roboto</option>
      </select>

      <div
        className={`mt-4 p-4 border rounded font-${setFont} bg-background`}
        style={{ minHeight: "100px" }}
      >
        <p className="text-lg">
          Esta é uma pré-visualização com a fonte selecionada: <strong>{setFont}</strong>
        </p>
      </div>
    </div>
  );
}
