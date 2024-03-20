import logo from '../../styles/sporttape_svg.svg';

export default function Loading() {
  return (
    <div class="fixed inset-0 bg-black bg-opacity-75 z-20">
      <div class="flex justify-center items-center h-full">
        <img src={logo} alt="Loading..." className="animate-pulse" />
      </div>
    </div>
  );
}
