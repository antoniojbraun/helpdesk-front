import Navlinks from "./nav-links";

export default function Sidebar() {
  return (
    <div className={`flex items-start bg-[#ecf6ff] transition-all`}>
      <div className="p-[10px]">
        <Navlinks />
      </div>
    </div>
  );
}
