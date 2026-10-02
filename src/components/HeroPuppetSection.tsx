import React from 'react';

interface HeroPuppetSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSubmitSearch: () => void;
  onSelectCategory?: (category: string) => void;
}

export const HeroPuppetSection: React.FC<HeroPuppetSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSubmitSearch,
  onSelectCategory,
}) => {
  return (
    <section className="relative w-full bg-white select-none">
      {/* 1. Full-Width Top Red Bar with "Spammers" Badge on Far Left (Matches Image 1 exactly) */}
      <div className="relative w-full z-20">
        {/* Solid Red Line */}
        <div className="w-full h-[4.5px] bg-[#E50914]" />

        {/* 'Spammers' Badge at the Far Left of the line */}
        <div className="absolute top-0 left-0 bg-[#E50914] text-white text-[12px] sm:text-[13px] font-bold px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-br-md shadow-xs tracking-wide">
          Spammers
        </div>
      </div>

      {/* 2. Puppet Theater Stage with World Map & All Hanging Strings */}
      <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden bg-white">
        {/* Background World Map Image from User Link */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-85 z-0 px-2 pt-2">
          <img
            src="/map.png"
            alt="World Map"
            className="w-[102%] max-w-xl object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://iili.io/ncPNGbn.md.png';
            }}
          />
        </div>

        {/* Intermediate Hanging Strings descending from the red bar (Matches Image 1) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Loose String 1: under Spammers badge area */}
          <div className="absolute left-[7%] top-0 w-[2px] h-[55px] sm:h-[65px] bg-black" />
          
          {/* Loose String 2: between Puppet 1 and 2 */}
          <div className="absolute left-[26%] top-0 w-[2px] h-[100px] sm:h-[120px] bg-black" />

          {/* Loose String 3: between Puppet 2 and 3 */}
          <div className="absolute left-[45%] top-0 w-[2px] h-[95px] sm:h-[115px] bg-black" />

          {/* Loose String 4: between Puppet 3 and 4 */}
          <div className="absolute left-[63%] top-0 w-[2px] h-[100px] sm:h-[120px] bg-black" />

          {/* Loose String 5: between Puppet 4 and 5 */}
          <div className="absolute left-[80%] top-0 w-[2px] h-[90px] sm:h-[110px] bg-black" />

          {/* Loose String 6: far right edge */}
          <div className="absolute left-[95%] top-0 w-[2px] h-[65px] sm:h-[75px] bg-black" />
        </div>

        {/* The 5 Main Puppets Hanging Directly from the Red Line */}
        <div className="relative z-10 w-full h-full max-w-xl mx-auto">
          {/* Puppet 1: Content Creators (Low) */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('Content Creators')}
            className="absolute left-[16.5%] -translate-x-1/2 top-0 flex flex-col items-center cursor-pointer group"
          >
            {/* String directly touching red line */}
            <div className="w-[2px] h-[65px] sm:h-[75px] bg-black" />
            {/* Puppet Image */}
            <div className="w-13 h-16 sm:w-16 sm:h-20 transition-transform duration-200 group-hover:scale-105">
              <img
                src="/puppet.png"
                alt="Content Creators"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://iili.io/ncPkAxe.md.png';
                }}
              />
            </div>
            {/* Badge */}
            <div className="mt-0.5 bg-black text-white px-2 py-0.5 rounded-md text-[9px] sm:text-[10.5px] font-bold leading-tight text-center shadow-xs">
              <span className="block whitespace-nowrap">Content</span>
              <span className="block whitespace-nowrap">Creators</span>
            </div>
          </div>

          {/* Puppet 2: Entrepreneur (High) */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('Entrepreneur')}
            className="absolute left-[36%] -translate-x-1/2 top-0 flex flex-col items-center cursor-pointer group"
          >
            {/* Shorter String */}
            <div className="w-[2px] h-[25px] sm:h-[30px] bg-black" />
            {/* Puppet Image */}
            <div className="w-13 h-16 sm:w-16 sm:h-20 transition-transform duration-200 group-hover:scale-105">
              <img
                src="/puppet.png"
                alt="Entrepreneur"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://iili.io/ncPkAxe.md.png';
                }}
              />
            </div>
            {/* Badge */}
            <div className="mt-0.5 bg-black text-white px-2 py-1 rounded-md text-[9px] sm:text-[10.5px] font-bold leading-tight text-center shadow-xs">
              <span className="block whitespace-nowrap">Entrepreneur</span>
            </div>
          </div>

          {/* Puppet 3: Media Owners (Low - Center) */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('Media Owners')}
            className="absolute left-[54%] -translate-x-1/2 top-0 flex flex-col items-center cursor-pointer group"
          >
            {/* Longer String */}
            <div className="w-[2px] h-[72px] sm:h-[82px] bg-black" />
            {/* Puppet Image */}
            <div className="w-13 h-16 sm:w-16 sm:h-20 transition-transform duration-200 group-hover:scale-105">
              <img
                src="/puppet.png"
                alt="Media Owners"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://iili.io/ncPkAxe.md.png';
                }}
              />
            </div>
            {/* Badge */}
            <div className="mt-0.5 bg-black text-white px-2 py-0.5 rounded-md text-[9px] sm:text-[10.5px] font-bold leading-tight text-center shadow-xs">
              <span className="block whitespace-nowrap">Media</span>
              <span className="block whitespace-nowrap">Owners</span>
            </div>
          </div>

          {/* Puppet 4: Website Owners (High) */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('Website Owners')}
            className="absolute left-[71.5%] -translate-x-1/2 top-0 flex flex-col items-center cursor-pointer group"
          >
            {/* Shorter String */}
            <div className="w-[2px] h-[28px] sm:h-[34px] bg-black" />
            {/* Puppet Image */}
            <div className="w-13 h-16 sm:w-16 sm:h-20 transition-transform duration-200 group-hover:scale-105">
              <img
                src="/puppet.png"
                alt="Website Owners"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://iili.io/ncPkAxe.md.png';
                }}
              />
            </div>
            {/* Badge */}
            <div className="mt-0.5 bg-black text-white px-2 py-0.5 rounded-md text-[9px] sm:text-[10.5px] font-bold leading-tight text-center shadow-xs">
              <span className="block whitespace-nowrap">Website</span>
              <span className="block whitespace-nowrap">Owners</span>
            </div>
          </div>

          {/* Puppet 5: Citizens (Low) */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('Citizens')}
            className="absolute left-[88.5%] -translate-x-1/2 top-0 flex flex-col items-center cursor-pointer group"
          >
            {/* Longer String */}
            <div className="w-[2px] h-[70px] sm:h-[80px] bg-black" />
            {/* Puppet Image */}
            <div className="w-13 h-16 sm:w-16 sm:h-20 transition-transform duration-200 group-hover:scale-105">
              <img
                src="/puppet.png"
                alt="Citizens"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://iili.io/ncPkAxe.md.png';
                }}
              />
            </div>
            {/* Badge */}
            <div className="mt-0.5 bg-black text-white px-2 py-1 rounded-md text-[9px] sm:text-[10.5px] font-bold leading-tight text-center shadow-xs">
              <span className="block whitespace-nowrap">Citizens</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Typography & Search Area (Exact replica of Image 1) */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-4 pb-12 text-center space-y-3.5">
        {/* Main Headline (Exact copy from Image 1) */}
        <h1 className="text-[27px] sm:text-[34px] md:text-[38px] font-black text-black tracking-tight leading-tight">
          We spammers never bow down
        </h1>

        {/* Subtitle (Exact copy from Image 1) */}
        <p className="text-[17px] sm:text-[20px] font-medium text-black tracking-tight -mt-1">
          Bring All Attackers Together
        </p>

        {/* Search Box (Exact copy from Image 1) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitSearch();
          }}
          className="pt-2"
        >
          <div className="relative flex items-center bg-white rounded-xl border border-zinc-400 p-1.5 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all shadow-2xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search your name or team"
              className="w-full py-2.5 pl-3 pr-12 text-sm sm:text-base text-black placeholder:text-zinc-500 font-medium focus:outline-none bg-transparent"
            />

            {/* Magnifying Glass Search Button Box on Right (Matches Image 1) */}
            <button
              type="submit"
              aria-label="Search"
              className="w-10 h-10 sm:w-11 sm:h-11 border border-zinc-400 rounded-lg flex items-center justify-center text-black hover:bg-zinc-100 active:scale-95 transition-all shrink-0"
            >
              <svg
                className="w-6 h-6 stroke-current"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <line x1="21" y1="21" x2="15.5" y2="15.5" />
              </svg>
            </button>
          </div>
        </form>

        {/* Bengali Manifesto Description (Exact copy from Image 1) */}
        <div className="pt-3 px-1">
          <p className="text-sm sm:text-base text-black font-medium leading-relaxed font-['Hind_Siliguri',sans-serif]">
            DarkHUB প্ল্যাটফর্ম এর মূল লক্ষ্য হলো অতীত ও বর্তমান এর সকল ইতিহাস খ্যাত স্প্যামার ও টিম এর স্মৃতি ধারণ করে রাখা। নিজের নাম ও টিম এর নাম স্মরণীয় করে রাখো।
          </p>
        </div>
      </div>
    </section>
  );
};
