import React from 'react';

interface AboutViewProps {
  lang: 'bn' | 'en';
  onNavigateSubmit: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ lang, onNavigateSubmit }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      {/* Top Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-200">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>OFFICIAL MANIFESTO & ARCHIVE REGISTRY</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight">
          About DarkHUB
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto font-['Hind_Siliguri',sans-serif]">
          {lang === 'bn'
            ? 'DarkHUB প্ল্যাটফর্ম এর মূল লক্ষ্য হলো অতীত ও বর্তমান এর সকল ইতিহাস খ্যাত স্প্যামার ও টিম এর স্মৃতি ধারণ করে রাখা।'
            : 'DarkHUB is the dedicated historical archive dedicated to logging and preserving the legacy of historic cyber operatives and spammer syndicates.'}
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-black text-lg">
            01
          </div>
          <h3 className="text-xl font-black text-zinc-900">
            {lang === 'bn' ? 'ইতিহাস ও স্মৃতি সংরক্ষণ' : 'Preservation of History'}
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed font-['Hind_Siliguri',sans-serif]">
            {lang === 'bn'
              ? 'সাইবার যুদ্ধ ও স্প্যামিং জগতের বহু গ্রুপ এবং অক্লান্ত ব্যক্তিত্ব সময়ের সাথে হারিয়ে যায়। DarkHUB প্রতিটি ঐতিহাসিক অপারেশন, মাস রিপোর্ট ক্যাম্পেইন ও ডিফেন্সকে ডিজিটাল খোদাই করে রাখে।'
              : 'Many legendary actors in the cyber underground fade into forgotten threads. DarkHUB creates a lasting chronological footprint of their actions and impacts.'}
          </p>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-lg">
            02
          </div>
          <h3 className="text-xl font-black text-zinc-900">
            {lang === 'bn' ? 'মাথা নত না করার দর্শন' : 'We Never Bow Down'}
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed font-['Hind_Siliguri',sans-serif]">
            {lang === 'bn'
              ? 'অনলাইন অন্যায়, অসৎ কপিরাইট স্ট্রাইক, হয়রানি এবং ডিজিটাল আধিপত্যের বিরুদ্ধে প্রতিরোধ গড়ে তোলার ঐতিহ্যই DarkHUB-এর অনুপ্রেরণা।'
              : 'Our philosophy stems from resilience against digital injustice, arbitrary strikes, cyber extortion, and oppressive censorship.'}
          </p>
        </div>
      </div>

      {/* Admin 01 Profile Showcase (Matches "Total Admins : 01" from Image 4) */}
      <div className="bg-white border-2 border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#800000] text-white flex items-center justify-center text-xl font-black shadow-inner">
              01
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-black text-zinc-950">
                  Lead System Administrator [Admin 01]
                </h4>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  VERIFIED CHIEF
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Archivist & Security Guardian · DarkHUB Infrastructure
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-zinc-700">Total Admins Active : 01</span>
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <p className="text-sm text-zinc-700 font-['Hind_Siliguri',sans-serif] leading-relaxed">
            {lang === 'bn'
              ? 'DarkHUB একটি অরাজনৈতিক এবং নিরপেক্ষ ঐতিহাসিক ডাটাবেস। কোনো তথ্য সংশোধন, প্রমাণাদি যুক্ত বা নতুন কোনো টিম আর্টিকেলের জন্য অ্যাডমিন প্যানেলের সাথে যোগাযোগ করতে পারেন।'
              : 'DarkHUB operates as an independent archival library. To propose archive amendments, submit declassified logs, or verify a bio-data record, reach out directly.'}
          </p>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl font-mono text-xs text-zinc-700 space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-400">Official Channel:</span>
              <span className="font-bold text-zinc-900">t.me/DarkHUB_Official</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Contact Gateway:</span>
              <span className="font-bold text-red-600">dmca.bangla@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">PGP Fingerprint:</span>
              <span className="text-zinc-500 truncate max-w-[200px] sm:max-w-none">
                4A89 2C5E 91DF 003B 7F21 DARK-HUB-ROOT-01
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-zinc-900 text-white rounded-2xl p-8 sm:p-10 text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black">
          {lang === 'bn' ? 'নিজের নাম ও টিম এর নাম স্মরণীয় করে রাখো' : 'Make Your Alias & Team Memorable'}
        </h3>
        <p className="text-sm text-zinc-300 max-w-xl mx-auto font-['Hind_Siliguri',sans-serif]">
          {lang === 'bn'
            ? 'আপনি যদি অতীতে বা বর্তমানে কোনো টিম পরিচালনা করে থাকেন বা সাইবার ময়দানে অবদান রেখে থাকেন, তবে আজই নিজের বায়োডাটা জমা দিন।'
            : 'If you or your team have conducted notable cyber defense or reporting campaigns, record your history in our decentralized registry.'}
        </p>
        <button
          onClick={onNavigateSubmit}
          className="px-6 py-3 bg-[#E50914] hover:bg-[#b80710] text-white text-sm font-black rounded-xl transition-all shadow-lg active:scale-95 inline-flex items-center gap-2"
        >
          <span>✍️ {lang === 'bn' ? 'বায়োডাটা ফর্ম খুলুন' : 'Submit Bio-data Form'}</span>
        </button>
      </div>
    </div>
  );
};
