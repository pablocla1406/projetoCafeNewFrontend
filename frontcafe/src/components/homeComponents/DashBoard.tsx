import BarChartLabel from "../Tela Inicial/BarChartLabel";
import BarChartMixed from "../Tela Inicial/BarChartMixed";
import PieChartLabel from "../Tela Inicial/PieChartLabel";

export default function DashBoard() {
    return (
        <div className="w-[1090px] mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-md dark:shadow-zinc-900 p-8">
            <h1 className="text-2xl pb-7 font-extrabold"> Dashboard </h1>
            <div className="flex gap-4 justify-center items-start">
                <BarChartMixed />
                <PieChartLabel />
                <BarChartLabel />
            </div>
        </div>
    );
}