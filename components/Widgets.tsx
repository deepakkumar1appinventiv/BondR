import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"


export const Widgets = () => {
  return (
    <div className=" p-3 space-y-3 w-[400px]  hidden lg:flex flex-col ps-10 ">

      <div className="flex space-x-3 bg-[#EFF3F4] text-[#857756] items-center rounded-full w-full h-[50px] p-2 border border-black">
        <MagnifyingGlassIcon className="w-[25px] h-[25px]"/>
        <input type="text" placeholder="BondR Search Here" className="bg-transparent outline-none"/>
      </div>
      <div className=" bg-[#EFF3F4] rounded-lg p-3 h-[400px]">
        <h1 className="text-lg font-bold mb-2">
          What's happening
        </h1>
        <div className="flex flex-col py-3">
          <div className="flex justify-between text-[#536471]">
            <span>Trending in India</span>
            <EllipsisHorizontalIcon className="w-[20px] "/>
          </div>
          <span className="text-sm font-bold" >#Reactjs</span>
          <span className="text-xs text-[#5536271]">250k BondR</span>
        </div>

        <div className="flex flex-col py-3">
          <div className="flex justify-between text-[#536471]">
            <span>Trending in India</span>
            <EllipsisHorizontalIcon className="w-[20px] "/>
          </div>
          <span className="text-sm font-bold" >#Reactjs</span>
          <span className="text-xs text-[#5536271]">250k BondR</span>
        </div>

        <div className="flex flex-col py-3">
          <div className="flex justify-between text-[#536471]">
            <span>Trending in India</span>
            <EllipsisHorizontalIcon className="w-[20px] "/>
          </div>
          <span className="text-sm font-bold" >#Reactjs</span>
          <span className="text-xs text-[#5536271]">250k BondR</span>
        </div>

        <div className="flex flex-col py-3">
          <div className="flex justify-between text-[#536471]">
            <span>Trending in India</span>
            <EllipsisHorizontalIcon className="w-[20px] "/>
          </div>
          <span className="text-sm font-bold" >#Reactjs</span>
          <span className="text-xs text-[#5536271]">250k BondR</span>
        </div>

      </div>

      <div className=" bg-[#EFF3F4] rounded-lg p-3 h-[400px]">
        <h1 className="text-lg font-bold mb-2">Who to Follow</h1>

        <div className="flex justify-between py-3">
        <div className="flex items-center space-x-3">
          <img src="/assets/Bondr.jpg" alt="Profile Picture" width={56} height={56} className="rounded-full w-14 h-14" />
          <div className="flex flex-col text-sm">
            <span className="font-bold text-sm">Rishabh Sharma</span>
            <span className="text-sm text-[#5536271]"> @RishabhSharma</span>

          </div>
          </div>
        <button className="bg-black text-white   w-[72px] h-[32px] rounded-full">Follow</button>
        </div>
        <div className="flex justify-between py-3">
        <div className="flex items-center space-x-3">
          <img src="/assets/Bondr.jpg" alt="Profile Picture" width={56} height={56} className="rounded-full w-14 h-14" />
          <div className="flex flex-col text-sm">
            <span className="font-bold text-md">Jayant Tyagi</span>
            <span className="text-sm text-[#5536271]"> @JayantTyagi</span>

          </div>
          </div>
        <button className="bg-black text-white   w-[72px] h-[32px] rounded-full">Follow</button>
        </div>
        <div className="flex justify-between py-3">
        <div className="flex items-center space-x-3">
          <img src="/assets/Bondr.jpg" alt="Profile Picture" width={56} height={56} className="rounded-full w-14 h-14" />
          <div className="flex flex-col text-sm">
            <span className="font-bold text-md">Yash Rajput</span>
            <span className="text-sm text-[#5536271]"> @YashRajput</span>

          </div>
          </div>
        <button className="bg-black text-white   w-[72px] h-[32px] rounded-full">Follow</button>
        </div>
        

      </div>
    </div>
  )
}
