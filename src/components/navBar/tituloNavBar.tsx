import { Link } from "react-router-dom";

export function TituloNavBar() {
  return (
    <div className="flex items-center justify-center mt-4 mb-4">
      <Link to="/Home" className="flex items-center hover:cursor-pointer">
      <img src="/images/LogoCafeAppel1.png" alt="Logo" className="w-10 h-10 mr-2 rounded-full " />
      <h1 className="text-xl font-bold text-foreground dark:text-white">Appel Café</h1>
      </Link>
    </div>
  )
}
