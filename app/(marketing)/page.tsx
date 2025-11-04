import Footer from "./_components/Footer";
import Heros from "./_components/Heros";

function Marketingpage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-3 pb-10">
        <Heros />
      </div>
      <Footer />
    </div>
  );
}

export default Marketingpage;
